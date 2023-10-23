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
            <SlideHome />
            <div className="-mx-3 py-4">
                {/* <div className="md:w-4/12 px-3">
                    <div className="bg-white">dashboarch</div>
                </div>
                <div className="md:w-8/12 px-3"> */}
                    <ListProduct
                        products={products}
                    />
                {/* </div> */}
            </div>
        </>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async (context) => {
    // const { query } = context.params as Params;

    const productsRes = await productService.findAll({
        page: 1,
        limit: 10,
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
