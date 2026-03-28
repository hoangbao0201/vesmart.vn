import Link from "next/link";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { NextPageWithLayout } from "@/pages/_app";
import AdminLayout from "@/components/layouts/AdminLayout";
import blogService from "@/serverless/blog.service";
import { authOptions } from "@/lib/authOptions";
import { isAdminEmail } from "@/lib/adminAuth";
import convertDate from "@/utils/convertDate";

interface BlogRow {
    id: string;
    slug: string;
    title: string;
    updatedAt: string;
}

interface AdminBlogAllProps {
    blogs: BlogRow[];
}

const AdminBlogAll: NextPageWithLayout<AdminBlogAllProps> = ({ blogs }) => {
    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">
                        Danh sách bài viết
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Chọn &quot;Sửa&quot; để chỉnh nội dung, slug hoặc tag.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link
                        href="/admin/blog/create"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        Tạo bài mới
                    </Link>
                    <Link
                        href="/bai-viet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Xem trang bài viết
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-4 py-3 font-semibold">Tiêu đề</th>
                        <th className="px-4 py-3 font-semibold hidden md:table-cell">Slug</th>
                        <th className="px-4 py-3 font-semibold">Cập nhật</th>
                        <th className="px-4 py-3 font-semibold min-w-[8rem]">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((b) => (
                        <tr key={b.id} className="border-b last:border-0 hover:bg-gray-50/80">
                            <td className="px-4 py-3 font-medium line-clamp-2">{b.title}</td>
                            <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{b.slug}</td>
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                {convertDate(new Date(b.updatedAt))}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                    <Link
                                        href={`/admin/blog/edit/${b.id}`}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        Sửa
                                    </Link>
                                    <Link
                                        href={`/bai-viet/${b.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:underline text-sm"
                                    >
                                        Xem
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {blogs.length === 0 && (
                <p className="p-6 text-center text-gray-500">Chưa có bài viết.</p>
            )}
            </div>
        </div>
    );
};

export default AdminBlogAll;

export const getServerSideProps: GetServerSideProps<AdminBlogAllProps> = async (ctx) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    if (!session?.user?.email || !isAdminEmail(session.user.email)) {
        return { redirect: { destination: "/", permanent: false } };
    }

    const res = await blogService.findAllAdmin({ page: 1, limit: 200 });
    if (!res.success) {
        return { props: { blogs: [] } };
    }

    return {
        props: {
            blogs: JSON.parse(JSON.stringify(res.blogs)),
        },
    };
};

AdminBlogAll.getLayout = (page) => {
    return <AdminLayout tab="/admin/blog/all">{page}</AdminLayout>;
};
