import Head from "next/head";
import MainLayout from "@/components/layouts/MainLayout";
import { NextPageWithLayout } from "../_app";
import { GetServerSideProps } from "next";
import blogService from "@/serverless/blog.service";
import { BlogTypes } from "@/types";
import Link from "next/link";
import convertDate from "@/utils/convertDate";
import { PageSEO } from "@/components/share/SEO";
import siteMetadata from "@/siteMetadata";

const PAGE_SIZE = 12;

interface BlogIndexProps {
    blogs: BlogTypes[];
    page: number;
    totalPages: number;
    total: number;
}

function buildPageHref(p: number): string {
    if (p <= 1) return "/bai-viet";
    return `/bai-viet?page=${p}`;
}

function pageNumbersToShow(current: number, total: number): (number | "ellipsis")[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }
    const set = new Set<number>();
    set.add(1);
    set.add(total);
    for (let d = 0; d <= 2; d++) {
        if (current - d >= 1) set.add(current - d);
        if (current + d <= total) set.add(current + d);
    }
    const sorted = Array.from(set).sort((a, b) => a - b);
    const out: (number | "ellipsis")[] = [];
    for (let i = 0; i < sorted.length; i++) {
        if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
            out.push("ellipsis");
        }
        out.push(sorted[i]);
    }
    return out;
}

const BlogIndex: NextPageWithLayout<BlogIndexProps> = ({
    blogs,
    page,
    totalPages,
    total,
}) => {
    const baseDesc =
        "Danh sách bài viết sửa chữa robot hút bụi của VESMART, uy tín chất lượng";
    const title =
        page > 1
            ? `Bài viết – Trang ${page} | VESMART`
            : "Bài viết | VESMART";
    const description =
        page > 1 ? `${baseDesc} (trang ${page} / ${totalPages}).` : baseDesc;

    const prevUrl =
        page > 2
            ? `${siteMetadata.siteUrl}${buildPageHref(page - 1)}`
            : page === 2
              ? `${siteMetadata.siteUrl}/bai-viet`
              : null;
    const nextUrl =
        page < totalPages
            ? `${siteMetadata.siteUrl}${buildPageHref(page + 1)}`
            : null;

    return (
        <div className="py-4">
            <PageSEO
                title={title}
                description={description}
                canonicalUrl={`${siteMetadata.siteUrl}${buildPageHref(page)}`}
                breadcrumbs={[
                    { name: "Trang chủ", href: "/" },
                    {
                        name: page > 1 ? `Bài viết (trang ${page})` : "Bài viết",
                        href: buildPageHref(page),
                    },
                ]}
            />
            <Head>
                {prevUrl && <link rel="prev" href={prevUrl} key="prev" />}
                {nextUrl && <link rel="next" href={nextUrl} key="next" />}
            </Head>

            <p className="text-sm text-gray-600 mb-4">
                {total} bài viết
                {totalPages > 1 && (
                    <>
                        {" "}
                        · Trang {page} / {totalPages}
                    </>
                )}
            </p>

            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="bg-white text-black py-3 rounded-md shadow-sm min-h-[180px]"
                        >
                            <div className="px-3 flex flex-col h-full">
                                <p>{convertDate(blog.createdAt)}</p>
                                <h2 className="mb-3 font-medium text-lg line-clamp-2">
                                    {blog.title}
                                </h2>
                                <Link
                                    href={`/bai-viet/${blog?.slug}`}
                                    className="w-full py-2 mt-auto block text-center rounded-lg bg-gray-100 hover:bg-slate-200 transition-all"
                                >
                                    Đọc ngay
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 py-12">
                        Chưa có bài viết.
                    </p>
                )}
            </div>

            {totalPages > 1 && (
                <nav
                    className="mt-8 flex flex-wrap items-center justify-center gap-2"
                    aria-label="Phân trang"
                >
                    {page > 1 && (
                        <Link
                            href={buildPageHref(page - 1)}
                            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm font-medium"
                        >
                            Trang trước
                        </Link>
                    )}
                    {pageNumbersToShow(page, totalPages).map((item, idx) =>
                        item === "ellipsis" ? (
                            <span key={`e-${idx}`} className="px-2">
                                …
                            </span>
                        ) : (
                            <Link
                                key={item}
                                href={buildPageHref(item)}
                                className={`min-w-[2.5rem] text-center px-3 py-2 rounded-lg text-sm font-medium ${
                                    item === page
                                        ? "bg-blue-600 text-white"
                                        : "border bg-white hover:bg-gray-50"
                                }`}
                            >
                                {item}
                            </Link>
                        )
                    )}
                    {page < totalPages && (
                        <Link
                            href={buildPageHref(page + 1)}
                            className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm font-medium"
                        >
                            Trang sau
                        </Link>
                    )}
                </nav>
            )}
        </div>
    );
};

export default BlogIndex;

export const getServerSideProps: GetServerSideProps<BlogIndexProps> = async (
    ctx
) => {
    const raw = ctx.query.page;
    const parsed =
        typeof raw === "string"
            ? parseInt(raw, 10)
            : Array.isArray(raw)
              ? parseInt(raw[0], 10)
              : 1;
    const page = Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;

    const blogRes = await blogService.findAll({
        page,
        limit: PAGE_SIZE,
    });

    if (!blogRes?.success) {
        return {
            props: {
                blogs: [],
                page: 1,
                totalPages: 1,
                total: 0,
            },
        };
    }

    const totalPages = blogRes.totalPages ?? 1;
    if (page > totalPages && totalPages >= 1) {
        return { notFound: true };
    }

    return {
        props: {
            blogs: JSON.parse(JSON.stringify(blogRes.blogs)),
            page: blogRes.page ?? page,
            totalPages,
            total: blogRes.total ?? 0,
        },
    };
};

BlogIndex.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};
