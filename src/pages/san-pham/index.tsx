import { GetServerSideProps } from "next";

import MainLayout from "@/components/layouts/MainLayout";
import ProductListTemplate from "@/components/modules/ProductListTemplate";
import PageSeoHead from "@/components/seo/PageSeoHead";
import { SITE_CONFIG } from "@/configs/site.config";
import { breadcrumbJsonLd, buildPageTitle, paginationPrevNextPaths } from "@/lib/seo";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";
import { getProductListApi } from "@/services/product/product.api";
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

export const getServerSideProps: GetServerSideProps<ProductListPageProps> = async (ctx) => {
    const { query, resolvedUrl } = ctx;
    const page = query.page ? Number(query.page) : 1;
    const take = query.take ? Number(query.take) : 20;

    const canonicalPath = resolvedUrl.split("#")[0] || "/san-pham";

    const productListRes = await getProductListApi({
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