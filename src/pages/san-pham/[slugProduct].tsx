import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import { ProductTypes } from "@/types";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/layouts/MainLayout";
import productService from "@/serverless/product.service";
import ProductDetailPageTemplate from "@/components/modules/product";
import { ProductSEO } from "@/components/share/SEO";

export interface Params extends ParsedUrlQuery {
    slugProduct: string;
}

interface ProductDetailProps {
    product: ProductTypes;
}

const ProductDetail: NextPageWithLayout<ProductDetailProps> = ({ product }) => {
    const router = useRouter();
    if (router.isFallback || !product?.id) {
        return (
            <div className="p-8 text-center text-gray-600">Đang tải sản phẩm…</div>
        );
    }

    const path = `/san-pham/${product.slug}-${product.id}`;

    return (
        <>
            <ProductSEO
                title={product?.title}
                summary={product?.description ?? ""}
                createdAt={product?.createdAt}
                updatedAt={product?.updatedAt}
                images={product?.images}
                brand={product?.brand}
                productUrlPath={path}
            />

            <ProductDetailPageTemplate product={product} />
        </>
    );
};

export default ProductDetail;

export const getStaticProps: GetStaticProps = async (context) => {
    const { slugProduct } = context.params as Params;

    const productsRes = await productService.findOne(slugProduct);

    if (!productsRes?.success || !productsRes.product) {
        return { notFound: true };
    }

    return {
        props: {
            product: JSON.parse(JSON.stringify(productsRes?.product)),
        },
        revalidate: 60 * 5,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: true };
};

ProductDetail.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};
