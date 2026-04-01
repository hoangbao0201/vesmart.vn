import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { buildPageTitle } from "@/lib/seo";
import { NextPageWithLayout } from "./_app";
import { SITE_CONFIG } from "@/configs/site.config";
import PageSeoHead from "@/components/seo/PageSeoHead";
import MainLayout from "@/components/layouts/MainLayout";

const CartTemplate = dynamic(() => import("@/components/modules/CartTemplate"), { ssr: false });

const CART_TITLE = buildPageTitle("Giỏ hàng");
const CART_DESCRIPTION = `Xem và thanh toán sản phẩm tại ${SITE_CONFIG.name}. Điền thông tin giao hàng và đặt hàng nhanh chóng.`;

const cartJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: CART_TITLE,
    description: CART_DESCRIPTION,
    url: `${SITE_CONFIG.url}/gio-hang`,
    isPartOf: { "@type": "WebSite", name: SITE_CONFIG.name, url: SITE_CONFIG.url },
};

const CartPage: NextPageWithLayout = () => {
    return (
        <>
            <PageSeoHead
                title={CART_TITLE}
                description={CART_DESCRIPTION}
                canonicalUrl="/gio-hang"
                ogImage="/static/images/banners/banner-1.jpg"
                ogImageAlt={`Giỏ hàng — ${SITE_CONFIG.name}`}
                ogType="website"
                jsonLd={cartJsonLd}
                noindex
                includeHreflang={false}
            />
            <div className="min-h-screen">
                <CartTemplate />
            </div>
        </>
    );
};

export default CartPage;

CartPage.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};