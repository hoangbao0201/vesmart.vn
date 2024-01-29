import { ReactNode } from "react";
import { GetStaticProps } from "next";

import { ProductTypes } from "@/types";
import { NextPageWithLayout } from "./_app";
import PageHome from "@/components/modules/home";
import MainLayout from "@/components/layouts/MainLayout";
import productService from "@/serverless/product.service";


interface HomePageProps {
    products: ProductTypes[]
}

const HomePage : NextPageWithLayout<HomePageProps> = ({ products }) => {

    return (
        <>  
            <PageHome products={products}/>
        </>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async (context) => {
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
