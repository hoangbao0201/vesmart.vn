import { ReactNode } from "react";
import { GetStaticProps } from "next";

import blogService from "@/services/blog.service";
import MainLayout from "@/components/layouts/MainLayout";

const HomePage = ({ blogs }: any) => {
    return <div className="">Home Page</div>;
};

export default HomePage;

export const getStaticProps: GetStaticProps = async (context) => {
    // const { query } = context.params as Params;

    const blogsRes = await blogService.findAll({
        page: 1,
        limit: 10,
    });

    if (!blogsRes?.success) {
        return {
            props: {
                blogs: null,
            },
        };
    }

    return {
        props: {
            blogs: JSON.parse(JSON.stringify(blogsRes.blogs)),
        },
        revalidate: 60 * 5,
    };
};

HomePage.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
