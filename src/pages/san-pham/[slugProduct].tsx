import { ReactNode } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import MainLayout from "@/components/layouts/MainLayout";
import ProductDetailTemplate from "@/components/modules/ProductDetailTemplate";
import PageSeoHead from "@/components/seo/PageSeoHead";
import { SITE_CONFIG } from "@/configs/site.config";
import { absoluteUrl, breadcrumbJsonLd, buildPageTitle, productDetailPath, toPlainText } from "@/lib/seo";
import { buildOfferShippingAndReturnPolicy } from "@/lib/seo/product-offer-jsonld";
import { getProductDetailApi } from "@/services/product/product.api";
import { IGetProductDetail, IProductReviewSnippet } from "@/services/product/product.type";
import { ParsedUrlQuery } from "querystring";

import { NextPageWithLayout } from "../_app";

interface ProductDetailPageProps {
    product: IGetProductDetail;
    reviewSnippet: IProductReviewSnippet | null;
}

const ProductDetailPage: NextPageWithLayout<ProductDetailPageProps> = ({ product, reviewSnippet }) => {
    const path = productDetailPath(product);
    const title = buildPageTitle(product.name);
    const description =
        toPlainText(product.generalInfo, 165) ||
        toPlainText(product.promotionContent, 165) ||
        `${product.name} - ${SITE_CONFIG.description}`;

    const firstImg = product.images.find((i) => i.image?.url)?.image;
    const imageUrls = product.images
        .map((i) => i.image?.url)
        .filter((u): u is string => Boolean(u));
    const primaryImage = imageUrls[0] ?? SITE_CONFIG.logo;
    const ogDims =
        firstImg?.width && firstImg?.height
            ? { width: firstImg.width, height: firstImg.height }
            : { width: 1200, height: 1200 };

    const firstVariant = product.variants[0];
    const availability =
        firstVariant && firstVariant.quantity > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock";

    const offerMerchant = firstVariant ? buildOfferShippingAndReturnPolicy(SITE_CONFIG) : null;

    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: toPlainText(product.generalInfo, 5000) || description,
        image: imageUrls.length ? imageUrls.map((u) => absoluteUrl(u)) : [absoluteUrl(primaryImage)],
        sku: product.productId,
        brand: { "@type": "Brand", name: SITE_CONFIG.name },
        ...(reviewSnippet
            ? {
                  aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: String(reviewSnippet.aggregateRating.ratingValue),
                      reviewCount: String(reviewSnippet.aggregateRating.reviewCount),
                      bestRating: String(reviewSnippet.aggregateRating.bestRating),
                      worstRating: String(reviewSnippet.aggregateRating.worstRating),
                  },
                  review: reviewSnippet.reviews.map((r) => ({
                      "@type": "Review",
                      author: { "@type": "Person", name: r.authorName },
                      reviewRating: {
                          "@type": "Rating",
                          ratingValue: String(r.rating),
                          bestRating: "5",
                          worstRating: "1",
                      },
                      reviewBody: r.reviewBody,
                      datePublished: r.datePublished,
                  })),
              }
            : {}),
        offers: firstVariant
            ? {
                  "@type": "Offer",
                  url: absoluteUrl(path),
                  priceCurrency: SITE_CONFIG.currency,
                  price: String(firstVariant.price),
                  availability,
                  itemCondition: "https://schema.org/NewCondition",
                  seller: { "@type": "Organization", name: SITE_CONFIG.name },
                  ...offerMerchant,
              }
            : undefined,
    };

    const crumbs = breadcrumbJsonLd([
        { name: "Trang chủ", path: "/" },
        { name: "Sản phẩm", path: "/san-pham" },
        { name: product.name },
    ]);

    return (
        <>
            <PageSeoHead
                title={title}
                description={description}
                canonicalUrl={path}
                ogImage={primaryImage}
                ogImageDimensions={ogDims}
                ogImageAlt={product.name}
                ogType="product"
                jsonLd={[crumbs, productJsonLd]}
            />
            <ProductDetailTemplate product={product} />
        </>
    );
};

export default ProductDetailPage;

interface Params extends ParsedUrlQuery {
    slugProduct: string;
}
export const getStaticProps: GetStaticProps<any, Params> = async ({ params }) => {
    const { slugProduct } = params!;

    const parts = slugProduct.split("-");
    const productId = parts.pop() as string;

    const productDetailRes = await getProductDetailApi({
        param: { productId },
    });
    if (!productDetailRes) {
        return { notFound: true };
    }
    const { product, reviewSnippet } = productDetailRes;

    return {
        props: JSON.parse(JSON.stringify({ product, reviewSnippet })),
        revalidate: 60 * 60,
    };
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

ProductDetailPage.getLayout = (page: ReactNode) => {
    return <MainLayout isNavbar={true}>{page}</MainLayout>;
};
