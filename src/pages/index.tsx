import { ReactNode } from "react";
import { GetStaticProps } from "next";

import { NextPageWithLayout } from "./_app";
import MainLayout from "@/components/layouts/MainLayout";
import HomeTemplate from "@/components/modules/HomeTemplate";
import PageSeoHead from "@/components/seo/PageSeoHead";
import { SITE_CONFIG } from "@/configs/site.config";
import { absoluteUrl, buildPageTitle } from "@/lib/seo";
import { IGetProductList } from "@/services/product/product.type";
import { getProductListApi } from "@/services/product/product.api";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";


interface HomePageProps {
    meta: PageOptionsMapper;
    products: IGetProductList[];
}

const HOME_TITLE = buildPageTitle(`${SITE_CONFIG.name} - Sửa chữa robot hút bụi, smart home tại Đà Nẵng`);
const HOME_DESCRIPTION =
    `${SITE_CONFIG.description}. Dịch vụ sửa chữa nhanh, bảo hành rõ ràng, tư vấn miễn phí. Xem sản phẩm và liên hệ Zalo ${SITE_CONFIG.phone}.`;

const homeJsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        description: SITE_CONFIG.description,
        inLanguage: "vi-VN",
        publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
    },
    {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        image: absoluteUrl("/static/images/banners/banner-1.jpg"),
        url: SITE_CONFIG.url,
        telephone: `+84${SITE_CONFIG.phone.replace(/^0/, "")}`,
        email: SITE_CONFIG.email,
        address: {
            "@type": "PostalAddress",
            streetAddress: "634/24 Trưng Nữ Vương, phường Hòa Thuận Tây",
            addressLocality: "Đà Nẵng",
            addressCountry: "VN",
        },
        priceRange: "$$",
    },
];

const HomePage: NextPageWithLayout<HomePageProps> = ({ meta, products }) => {
    return (
        <>
            <PageSeoHead
                title={HOME_TITLE}
                description={HOME_DESCRIPTION}
                canonicalUrl="/"
                ogImage="/static/images/banners/banner-1.jpg"
                ogImageDimensions={{ width: 1200, height: 630 }}
                ogImageAlt={`${SITE_CONFIG.name} — sửa chữa robot hút bụi, smart home Đà Nẵng`}
                ogType="website"
                jsonLd={homeJsonLd}
            />
            <HomeTemplate meta={meta} products={products} />
        </>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
    const productListRes = await getProductListApi({
        query: { page: 1, take: 24 },
    });
    if (!productListRes) {
        const emptyMeta = new PageOptionsMapper({ page: 1, take: 24, itemCount: 0 });
        return {
            props: {
                meta: JSON.parse(JSON.stringify(emptyMeta)),
                products: [],
            },
            revalidate: 60 * 5,
        };
    }
    const { products, meta } = productListRes;

    return {
        props: {
            meta: JSON.parse(JSON.stringify(meta)),
            products: JSON.parse(JSON.stringify(products)),
        },
        revalidate: 60 * 60,
    };
};

HomePage.getLayout = (page: ReactNode) => {
    return <MainLayout isNavbar={true}>{page}</MainLayout>;
};
