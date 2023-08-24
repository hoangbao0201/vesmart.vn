import Link from "next/link";
import { ReactNode } from "react";

import { ParsedUrlQuery } from "querystring";

import { GetStaticPaths, GetStaticProps } from "next";

import { BlogTypes } from "@/types";
import siteMetadata from "@/siteMetadata";
import { NextPageWithLayout } from "../_app";
import { BlogSEO } from "@/components/share/SEO";
import MainLayout from "@/components/layouts/MainLayout";
import MarkContent from "@/components/share/MarkContent";
import Breadcrumb from "@/components/share/Breadcrumb";
import BlogLoad from "@/components/share/skeleton/BlogLoad";
import blogService from "@/serverless/blog.service";


export interface Params extends ParsedUrlQuery {
    slugBlog: string;
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
                    <div className="bg-white md:px-14 px-4 py-10 md:rounded-lg border min-h-screen relative">
                        {
                            blog ? (
                                <>
                                    <Breadcrumb
                                        path={[
                                            {
                                                title: blog?.title || "",
                                                url: "/bai-viet/" + blog?.slug
                                            }
                                        ]}
                                    />
                                    <article>
    
                                        <BlogSEO
                                            title={`${blog.title}`}
                                            // blog.author.fullName || 
                                            author={siteMetadata.author}
                                            createdAt={blog.createdAt}
                                            updatedAt={blog.updatedAt}
                                            summary={blog.description}
                                            url={blog.slug}
                                            canonicalUrl={`${siteMetadata?.siteUrl}/bai-viet/${blog.slug}`}
                                        />
                            
                                        <header>
                                            <h1 title={blog?.title} className="font-extrabold text-4xl mb-4">
                                                {blog?.title}
                                            </h1>
                                            <ul className="my-6 flex flex-wrap">
                                                {
                                                    blog?.blogHashtags && blog?.blogHashtags.map((hashTag, index) => {
                                                        return (
                                                            <li className="" key={hashTag.id}>
                                                                <Link href={`/`} className={`px-2 py-[2px] border border-transparent rounded-sm dev-tag-blog-${index}`}>
                                                                    #{hashTag.Hashtag.name}
                                                                </Link>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <p className="prose mb-7">{blog?.description}</p>
                                        </header>
                                        <MarkContent>
                                            {blog?.content}
                                        </MarkContent>
    
                                    </article>
                                </>
                            ) : (
                                <BlogLoad />
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
    const { slugBlog } = context.params as Params;

    const blogRes = await blogService.findOne(slugBlog);

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
