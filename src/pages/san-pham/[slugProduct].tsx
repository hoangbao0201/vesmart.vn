import { GetStaticPaths, GetStaticProps } from "next";

import { NextSeo } from 'next-seo';
import { ParsedUrlQuery } from "querystring";

import { ProductTypes } from "@/types";
import siteMetadata from "@/siteMetadata";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/components/layouts/MainLayout";
import productService from "@/serverless/product.service";
import ProductDetailPageTemplate from "@/components/modules/product";


interface obVariantProps {
    skuId?: string;
    skuP?: string;
    price?: number;
    stock?: number;
    variants: { "1": string; "2": string } | {};
}

export interface Params extends ParsedUrlQuery {
    slugProduct: string;
}

interface ProductDetailProps {
    product: ProductTypes;
}

const ProductDetail: NextPageWithLayout<ProductDetailProps> = ({ product }) => {
    
    return (
        <>
            <NextSeo
                title={`${product?.title} - VESMART`}
                description={`${product?.description}`}
                
                canonical={`${siteMetadata?.siteUrl}/san-pham/${product?.slug}`}
            />

            <ProductDetailPageTemplate product={product}/>
                
        </>
    );
};

export default ProductDetail;

export const getStaticProps: GetStaticProps = async (context) => {
    const { slugProduct } = context.params as Params;

    const productsRes = await productService.findOne(slugProduct);

    if (!productsRes?.success) {
        return {
            props: {
                products: null,
            },
        };
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
