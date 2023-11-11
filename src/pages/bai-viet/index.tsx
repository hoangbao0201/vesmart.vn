import MainLayout from "@/components/layouts/MainLayout";
import { NextPageWithLayout } from "../_app";
import { GetStaticProps } from "next";
import blogService from "@/serverless/blog.service";
import { BlogTypes } from "@/types";
import Link from "next/link";
import convertDate from "@/utils/convertDate";
import { PageSEO } from "@/components/share/SEO";

interface BlogIndexProps {
    blogs: BlogTypes[]
}
const BlogIndex : NextPageWithLayout<BlogIndexProps> = ({ blogs }) => {

    return (
        <div className="py-4">
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
                {
                    blogs.length > 0 && (
                        <>
                            <PageSEO
                                title="Bài viết | VESMART"    
                                description="Danh sách bài viết sửa chữa robot hút bụi của VESMART, uy tín chất lượng"
                            />
                            {
                                blogs.map((blog) => {
                                    return (
                                        <div key={blog.id} className="bg-white text-black py-3 rounded-md shadow-sm min-h-[180px]">
                                            <div className="px-3 flex flex-col h-full">
                                                <p>{convertDate(blog.createdAt)}</p>
                                                <h2 className="mb-3 font-medium text-lg line-clamp-2">{blog.title}</h2>
                                                <Link href={`/bai-viet/${blog?.slug}`} className="w-full py-2 mt-auto block text-center rounded-lg bg-gray-100 hover:bg-slate-200 transition-all">Đọc ngay</Link>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default BlogIndex;

export const getStaticProps: GetStaticProps = async (context) => {
    // const { query } = context.params as Params;

    const blogRes = await blogService.findAll({
        page: 1,
        limit: 20,
    });

    if (!blogRes?.success) {
        return {
            props: {
                blogs: null,
            },
        };
    }

    return {
        props: {
            blogs: JSON.parse(JSON.stringify(blogRes.blogs)),
        },
        revalidate: 60*60,
    };
};

BlogIndex.getLayout = (page) => {
    return (
        <MainLayout>{page}</MainLayout>
    )
}