import { ReactNode } from "react";

import { ParsedUrlQuery } from "querystring";

import { GetStaticPaths, GetStaticProps } from "next";

import { BlogTypes } from "@/types";
import siteMetadata from "@/siteMetadata";
import { NextPageWithLayout } from "../_app";
import { BlogSEO } from "@/components/share/SEO";
import blogService from "@/services/blog.service";
import MainLayout from "@/components/layouts/MainLayout";
import MarkContent from "@/components/share/MarkContent";


export interface Params extends ParsedUrlQuery {
    slug: string;
}

interface BlogDetailPageProps {
    blog: BlogTypes
}
const BlogDetailPage : NextPageWithLayout<BlogDetailPageProps> = ({ blog }) => {

    // console.log(blog);

    return (
        <>
            <div className="lg:flex -mx-3">
                <div className="lg:w-8/12 md:px-3 mb-5">
                    <div className="bg-white md:px-14 px-4 py-10 md:rounded-lg border min-h-screen">
                        {
                            blog && (
                                <>
                                    <BlogSEO
                                        title={`${blog.title}`}
                                        author={blog.author.fullName || siteMetadata.author}
                                        createdAt={blog.createdAt}
                                        updatedAt={blog.updatedAt}
                                        summary={blog.description}
                                        url={blog.slug}
                                        canonicalUrl={`${siteMetadata?.siteUrl}/bai-viet/${blog.slug}`}
                                    />

                                    <h1 title={blog?.title} className="font-extrabold text-4xl mb-4">{blog?.title}</h1>
                                    <p>{blog?.description}</p>
                                        
                                    <MarkContent>
                                        {blog?.content}
                                    </MarkContent>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="lg:w-4/12 md:px-3 mb-5">
                    <div className="bg-white px-4 py-10 md:rounded-lg border">
                        {/* <TocMarkContent>
                            {blog?.content}
                        </TocMarkContent> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogDetailPage;

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as Params;

    const blogRes = await blogService.findOne(slug);

    if (!blogRes?.success) {
        return {
            props: {
                blogs: null,
            },
        };
    }

    return {
        props: {
            blog: JSON.parse(JSON.stringify(blogRes.blog)),
        },
        revalidate: 60*60
    };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    return { paths: [], fallback: true };
};


BlogDetailPage.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
