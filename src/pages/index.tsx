import { ReactNode } from "react";
import { GetStaticProps } from "next";

import MainLayout from "@/components/layouts/MainLayout";
import { PageSEO } from "@/components/share/SEO";
import siteMetadata from "@/siteMetadata";
import ListProduct from "@/components/pages/PageHome/ListProduct";
import productService from "@/serverless/product.service";
import { ProductTypes } from "@/types";
import { NextPageWithLayout } from "./_app";


interface HomePageProps {
    products: ProductTypes[]
}

const HomePage : NextPageWithLayout<HomePageProps> = ({ products }) => {

    // console.log(products);

    return (
        <>  
            <PageSEO
                title="Home Page - VESMART"
                description={siteMetadata.description}
            />
            <div className="-mx-3">
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
        revalidate: 60 * 5,
    };
};

HomePage.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
