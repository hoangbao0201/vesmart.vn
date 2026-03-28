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
import blogService from "@/serverless/blog.service";
import { excerptFromMarkdown } from "@/utils/excerptFromMarkdown";

export interface Params extends ParsedUrlQuery {
    slugBlog: string;
}

interface BlogDetailPageProps {
    blog: BlogTypes;
}

function buildMetaDescription(blog: BlogTypes): string {
    const d = blog.description?.trim() || "";
    if (d.length >= 50) {
        return d.length <= 160 ? d : `${d.slice(0, 157).trimEnd()}…`;
    }
    const ex = excerptFromMarkdown(blog.content || "", 158);
    if (ex) {
        return ex;
    }
    if (d) {
        return d.length <= 160 ? d : `${d.slice(0, 157).trimEnd()}…`;
    }
    const fallback = `${blog.title} — Sửa robot hút bụi Đà Nẵng | VESMART`;
    return fallback.length <= 160 ? fallback : `${fallback.slice(0, 157)}…`;
}

const BlogDetailPage: NextPageWithLayout<BlogDetailPageProps> = ({ blog }) => {
    const metaDescription = buildMetaDescription(blog);
    const articleTags =
        blog.blogHashtags
            ?.map((h) => h.Hashtag?.name)
            .filter((n): n is string => Boolean(n && n.trim())) ?? [];
    const keywordStr = articleTags.join(", ");
    const authorName =
        blog.author?.fullName?.trim() || siteMetadata.author;

    return (
        <>
            <div className="-mx-3">
                <div className="md:px-3">
                    <Breadcrumb
                        path={[
                            {
                                title: "bài viết",
                                url: "/bai-viet/",
                            },
                            {
                                title: blog?.title || "",
                                url: "/bai-viet/" + blog?.slug,
                            },
                        ]}
                    />
                </div>
                <div className="lg:flex text-black">
                    <div className="lg:w-8/12 md:px-3 mb-5">
                        <div className="bg-white md:px-14 px-4 py-10 md:rounded-md shadow-sm border min-h-screen relative">
                            <article>
                                <BlogSEO
                                    title={blog.title}
                                    author={authorName}
                                    createdAt={blog.createdAt}
                                    updatedAt={blog.updatedAt}
                                    summary={metaDescription}
                                    keywords={keywordStr || undefined}
                                    articleTags={articleTags}
                                    url={blog.slug}
                                    images={
                                        blog.thumbnail ? [blog.thumbnail] : []
                                    }
                                    canonicalUrl={`${siteMetadata.siteUrl}/bai-viet/${blog.slug}`}
                                />

                                <header className="">
                                    <h1
                                        title={blog.title}
                                        className="font-bold md:text-4xl text-3xl mb-7 leading-tight uppercase"
                                    >
                                        {blog.title}
                                    </h1>
                                    <ul className="flex flex-wrap mb-4 -mx-2">
                                        {blog.blogHashtags?.map(
                                            (hashTag, index) => (
                                                <li className="" key={hashTag.id}>
                                                    <Link
                                                        href="/bai-viet"
                                                        className={`px-2 py-[2px] text-lg border border-transparent rounded-sm dev-tag-blog-${index}`}
                                                    >
                                                        <span
                                                            style={{
                                                                color: `var(--tag-color-${index})`,
                                                            }}
                                                            className="mr-[1px]"
                                                        >
                                                            #
                                                        </span>
                                                        {hashTag.Hashtag.name}
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    {blog.description ? (
                                        <p className="mb-3 prose">
                                            {blog.description}
                                        </p>
                                    ) : null}
                                </header>
                                <MarkContent>{blog.content}</MarkContent>
                            </article>
                        </div>
                    </div>
                    <div className="lg:w-4/12 md:px-3 mb-5 min-h-full top-0 bottom-0">
                        <div className="rounded-md bg-blue-600 md:rounded-lg border sticky top-[60px] overflow-hidden">
                            <div className="relative flex flex-col min-h-[200px] bg-white mt-8 px-4 py-4">
                                <div className="flex items-end -mt-8 mb-5">
                                    <Image
                                        width={80}
                                        height={80}
                                        alt="VESMART Đà Nẵng"
                                        src={"/static/images/avatar-vesmart.png"}
                                        className="w-12 h-12 rounded-md border mr-3"
                                    />
                                    <p className="font-semibold text-lg">
                                        VESMART Đà Nẵng
                                    </p>
                                </div>
                                <p>
                                    Liên hệ ngay để được tư vấn và sửa chữa
                                    robot hút bụi nhanh chóng, hiệu quả
                                </p>
                                <Link
                                    target="_blank"
                                    href={"https://zalo.me/0971183153"}
                                    className="bg-blue-600 rounded-md w-full py-2 text-center text-white hover:bg-blue-700 transition-all block mt-auto"
                                >
                                    Liên hệ ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogDetailPage;

export const getStaticProps: GetStaticProps<
    BlogDetailPageProps,
    Params
> = async (context) => {
    const slugBlog = context.params?.slugBlog;
    if (!slugBlog || typeof slugBlog !== "string") {
        return { notFound: true };
    }

    const blogRes = await blogService.findOne(slugBlog);

    if (!blogRes?.success || !blogRes.blog) {
        return { notFound: true };
    }

    return {
        props: {
            blog: JSON.parse(JSON.stringify(blogRes.blog)),
        },
        revalidate: 60 * 60,
    };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    try {
        const res = await blogService.fullSeo();
        if (!res.success || !res.blogs?.length) {
            return { paths: [], fallback: "blocking" };
        }
        return {
            paths: res.blogs.map((b) => ({
                params: { slugBlog: b.slug },
            })),
            fallback: "blocking",
        };
    } catch {
        return { paths: [], fallback: "blocking" };
    }
};

BlogDetailPage.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
