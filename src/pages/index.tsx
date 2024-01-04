import { ReactNode } from "react";
import { GetStaticProps } from "next";

import { ProductTypes } from "@/types";
import { NextPageWithLayout } from "./_app";
import siteMetadata from "@/siteMetadata";
import { PageSEO } from "@/components/share/SEO";
import SlideHome from "@/components/share/SlideHome";
import MainLayout from "@/components/layouts/MainLayout";
import productService from "@/serverless/product.service";
import ListProduct from "@/components/PageComponent/PageHome/ListProduct";
import ListTopic from "@/components/PageComponent/PageHome/ListTopic";
import NavSearch from "@/components/PageComponent/PageHome/NavSearch";


interface HomePageProps {
    products: ProductTypes[]
}

const HomePage : NextPageWithLayout<HomePageProps> = ({ products }) => {

    return (
        <>  
            <PageSEO
                title="Trang chủ - VESMART"
                description={siteMetadata.description}
            />
            <NavSearch />
            <ListTopic />
            {/* <SlideHome /> */}
            <div className="py-4">
                <div className="text-blue-600 shadow-sm bg-white font-semibold text-center text-xl mb-3 px-3 py-4 border-b-4 border-blue-600">Sản phẩm gần đây</div>
                <div className="-mx-3">
                    <ListProduct
                        products={products}
                    />
                </div>
            </div>
        </>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async (context) => {
    // const { query } = context.params as Params;

    const productsRes = await productService.findAll({
        page: 1,
        limit: 24,
    });

    if (!productsRes?.success) {
        return {
            props: {
                products: null,
            },
        };
    }

    return {
        props: {
            products: JSON.parse(JSON.stringify(productsRes.products)),
        },
        revalidate: 60*60,
    };
};

HomePage.getLayout = (page: ReactNode) => {
    return <MainLayout isNavbar={true}>{page}</MainLayout>;
};
