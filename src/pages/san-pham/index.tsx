import { GetServerSideProps, Redirect } from "next";

import MainLayout from "@/components/layouts/MainLayout";
import ProductListTemplate from "@/components/modules/ProductListTemplate";
import PageSeoHead from "@/components/seo/PageSeoHead";
import { SITE_CONFIG } from "@/configs/site.config";
import { breadcrumbJsonLd, buildPageTitle, paginationPrevNextPaths } from "@/lib/seo";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";
import { getProductListApi, getProductListApiPageFirstCached } from "@/services/product/product.api";
import { IGetProductList } from "@/services/product/product.type";
import { Order } from "@/services/prisma-select/prisma-select-config";

interface ProductListPageProps {
    meta: PageOptionsMapper;
    products: IGetProductList[];
    canonicalPath: string;
    pageTitle: string;
    pageDescription: string;
}

const ProductListPage = ({ products, meta, canonicalPath, pageTitle, pageDescription }: ProductListPageProps) => {
    const pagination = paginationPrevNextPaths("/san-pham", meta.page, meta.pageCount, meta.take);

    const listJsonLd =
        products.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  itemListElement: products.slice(0, 24).map((p, i) => ({
                      "@type": "ListItem",
                      position: (meta.page - 1) * meta.take + i + 1,
                      url: `${SITE_CONFIG.url}/san-pham/${p.slug ? `${p.slug}-` : ""}${p.productId}`,
                      name: p.name,
                  })),
              }
            : null;

    const crumbs = breadcrumbJsonLd([
        { name: "Trang chủ", path: "/" },
        { name: meta.page > 1 ? `Sản phẩm (trang ${meta.page})` : "Sản phẩm" },
    ]);

    return (
        <>
            <PageSeoHead
                title={pageTitle}
                description={pageDescription}
                canonicalUrl={canonicalPath}
                ogImage="/static/images/banners/banner-1.jpg"
                ogImageDimensions={{ width: 1200, height: 630 }}
                ogImageAlt={`${SITE_CONFIG.name} — danh mục sản phẩm`}
                ogType="website"
                pagination={pagination}
                jsonLd={listJsonLd ? [crumbs, listJsonLd] : crumbs}
            />
            <ProductListTemplate products={products} meta={meta} />
        </>
    );
};

export default ProductListPage;

const FIRST_PAGE_CACHE_CONTROL =
    "public, s-maxage=300, stale-while-revalidate=86400";
const PAGINATED_CACHE_CONTROL = "private, no-store, must-revalidate";

function firstQueryValue(v: string | string[] | undefined): string | undefined {
    if (v === undefined) return undefined;
    return Array.isArray(v) ? v[0] : v;
}

function parseListQuery(query: { page?: string | string[]; take?: string | string[] }): {
    page: number;
    take: number;
    redirect?: Redirect;
} {
    const pageRaw = firstQueryValue(query.page);
    const takeRaw = firstQueryValue(query.take);

    const takeParsed = takeRaw !== undefined ? Number(takeRaw) : 20;
    const take = Number.isFinite(takeParsed) && takeParsed >= 1 && takeParsed <= 100 ? Math.floor(takeParsed) : 20;

    const pageParsed = pageRaw !== undefined ? Number(pageRaw) : 1;
    const page = Number.isFinite(pageParsed) && pageParsed >= 1 ? Math.floor(pageParsed) : 1;

    if (pageRaw !== undefined && page === 1) {
        const dest = take !== 20 ? `/san-pham?take=${take}` : "/san-pham";
        return { page: 1, take, redirect: { destination: dest, permanent: true } };
    }

    return { page, take };
}

export const getServerSideProps: GetServerSideProps<ProductListPageProps> = async (ctx) => {
    const { query, resolvedUrl, res } = ctx;
    const parsed = parseListQuery(query);
    if (parsed.redirect) {
        return { redirect: parsed.redirect };
    }

    const { page, take } = parsed;
    const isFirstPage = page === 1;

    if (isFirstPage) {
        res.setHeader("Cache-Control", FIRST_PAGE_CACHE_CONTROL);
    } else {
        res.setHeader("Cache-Control", PAGINATED_CACHE_CONTROL);
    }

    const canonicalPath = resolvedUrl.split("#")[0] || "/san-pham";

    const productListRes = isFirstPage
        ? await getProductListApiPageFirstCached(take, Order.DESC)
        : await getProductListApi({
              query: { page, take, order: Order.DESC },
          });
    if (!productListRes) {
        const emptyMeta = new PageOptionsMapper({ page, take, itemCount: 0 });
        const pageTitle = buildPageTitle("Sản phẩm");
        return {
            props: {
                meta: JSON.parse(JSON.stringify(emptyMeta)),
                products: [],
                canonicalPath,
                pageTitle,
                pageDescription: `Danh sách sản phẩm và phụ kiện tại ${SITE_CONFIG.name}. ${SITE_CONFIG.description}`,
            },
        };
    }
    const { products, meta } = productListRes;

    const pageTitle = buildPageTitle(meta.page > 1 ? `Sản phẩm - Trang ${meta.page}` : "Sản phẩm");
    const pageDescription = `Khám phá ${meta.itemCount} sản phẩm tại ${SITE_CONFIG.name}. ${SITE_CONFIG.description} Giao hàng và tư vấn tận tình.`;

    return {
        props: {
            meta: JSON.parse(JSON.stringify(meta)),
            products: JSON.parse(JSON.stringify(products)),
            canonicalPath,
            pageTitle,
            pageDescription,
        },
    };
};

ProductListPage.getLayout = (page: React.ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};