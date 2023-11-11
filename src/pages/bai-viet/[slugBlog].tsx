import Link from "next/link";
import Image from "next/image";
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
            <div>
                <div className="lg:flex -mx-3 text-black">
                    <div className="lg:w-8/12 md:px-3 mb-5 pt-5">
                        <div className="bg-white md:px-14 px-4 py-10 md:rounded-md border min-h-screen relative">
                            {
                                blog ? (
                                    <>
                                        <Breadcrumb
                                            path={[
                                                {
                                                    title: "bài viết",
                                                    url: "/bai-viet/"
                                                },
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
                                                images={[blog.thumbnail]}
                                                canonicalUrl={`${siteMetadata?.siteUrl}/bai-viet/${blog.slug}`}
                                            />
                                
                                            <header className="">
                                                <h1 title={blog?.title} className="font-bold md:text-4xl text-3xl mb-7 leading-tight uppercase">
                                                    {blog?.title}
                                                </h1>
                                                <ul className="flex flex-wrap mb-4 -mx-2">
                                                    {
                                                        blog?.blogHashtags && blog?.blogHashtags.map((hashTag, index) => {
                                                            return (
                                                                <li className="" key={hashTag.id}>
                                                                    <Link href={`/`} className={`px-2 py-[2px] text-lg border border-transparent rounded-sm dev-tag-blog-${index}`}>
                                                                        <span style={{ color: `var(--tag-color-${index})` }} className={`mr-[1px]`}>#</span>{hashTag.Hashtag.name}
                                                                    </Link>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                <p className="mb-3 prose">{blog?.description}</p>
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
                    <div className="lg:w-4/12 md:px-3 mb-5 pt-5">
    
                        <div className="rounded-md bg-blue-600 md:rounded-lg border sticky top-[80px]">
    
                            <div className="relative flex flex-col min-h-[200px] bg-white mt-8 px-4 py-4">
                                <div className="flex items-end -mt-8 mb-5">
                                    <Image
                                        width={80}
                                        height={80}
                                        alt="image avatar"
                                        src={'/static/images/avatar-vesmart.png'}
                                        className="w-12 h-12 rounded-md border mr-3"
                                    />
                                    <p className="font-semibold text-lg">VESMART Đà Nẵng</p>
                                </div>
                                <p>Liên hệ ngay để được tư vấn và sửa chữa robot hút bụi nhanh chóng, hiệu quả</p>
                                <Link target="_blank" href={'https://zalo.me/0971183153'} className="bg-blue-600 rounded-md w-full py-2 text-center text-white hover:bg-blue-700 transition-all block mt-auto">Liên hệ ngay</Link>
                            </div>
    
                        </div>
    
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
