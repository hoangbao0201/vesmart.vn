import { type ReactNode } from "react";
import { GetStaticProps } from "next";

import MainLayout from "@/components/layouts/MainLayout";
import ProductListTemplate from "@/components/modules/ProductListTemplate";
import PageSeoHead from "@/components/seo/PageSeoHead";
import { LIST_PAGE_SIZE } from "@/configs/list-infinite.config";
import { SITE_CONFIG } from "@/configs/site.config";
import { breadcrumbJsonLd, buildPageTitle } from "@/lib/seo";
import { pageMetaToPlain } from "@/lib/page-meta-to-plain";
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

const PUBLIC_PRODUCTS_API = "/api/public/products";

const ProductListPage = ({ products, meta, canonicalPath, pageTitle, pageDescription }: ProductListPageProps) => {
    const listJsonLd =
        products.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  itemListElement: products.slice(0, 24).map((p, i) => ({
                      "@type": "ListItem",
                      position: i + 1,
                      url: `${SITE_CONFIG.url}/san-pham/${p.slug ? `${p.slug}-` : ""}${p.productId}`,
                      name: p.name,
                  })),
              }
            : null;

    const crumbs = breadcrumbJsonLd([
        { name: "Trang chủ", path: "/" },
        { name: "Sản phẩm" },
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
                jsonLd={listJsonLd ? [crumbs, listJsonLd] : crumbs}
            />
            <ProductListTemplate
                products={products}
                meta={meta}
                infinite={{ apiPath: PUBLIC_PRODUCTS_API, metaPlain: pageMetaToPlain(meta) }}
            />
        </>
    );
};

export default ProductListPage;

export const getStaticProps: GetStaticProps<ProductListPageProps> = async () => {
    const canonicalPath = "/san-pham";

    const productListRes = await getProductListApi({
        query: { page: 1, take: LIST_PAGE_SIZE, order: Order.DESC },
    });
    if (!productListRes) {
        const emptyMeta = new PageOptionsMapper({ page: 1, take: LIST_PAGE_SIZE, itemCount: 0 });
        const pageTitle = buildPageTitle("Sản phẩm");
        return {
            props: {
                meta: JSON.parse(JSON.stringify(emptyMeta)),
                products: [],
                canonicalPath,
                pageTitle,
                pageDescription: `Danh sách sản phẩm và phụ kiện tại ${SITE_CONFIG.name}. ${SITE_CONFIG.description}`,
            },
            revalidate: 300,
        };
    }
    const { products, meta } = productListRes;

    const pageTitle = buildPageTitle("Sản phẩm");
    const pageDescription = `Khám phá ${meta.itemCount} sản phẩm tại ${SITE_CONFIG.name}. ${SITE_CONFIG.description} Giao hàng và tư vấn tận tình.`;

    return {
        props: {
            meta: JSON.parse(JSON.stringify(meta)),
            products: JSON.parse(JSON.stringify(products)),
            canonicalPath,
            pageTitle,
            pageDescription,
        },
        revalidate: 300,
    };
};

ProductListPage.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
