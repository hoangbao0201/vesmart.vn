import Link from "next/link";
import { PaginationNav } from "@/components/share/PaginationNav";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";
import { IGetPostList } from "@/services/post/post.type";
import convertDate from "@/utils/convertDate";

interface AdminPostListTemplateProps {
    posts: IGetPostList[];
    meta: PageOptionsMapper;
}

const AdminPostListTemplate = ({ posts, meta }: AdminPostListTemplateProps) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h1 className="text-xl font-semibold">Danh sách bài viết</h1>
                <Link
                    href="/admin/bai-viet/tao-moi"
                    className="px-3 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700 text-sm"
                >
                    Tạo bài viết
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-left">
                            <th className="px-3 py-2 border-b border-gray-200">Tiêu đề</th>
                            <th className="px-3 py-2 border-b border-gray-200">Slug</th>
                            <th className="px-3 py-2 border-b border-gray-200">Ngày cập nhật</th>
                            <th className="px-3 py-2 border-b border-gray-200">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.postId} className="hover:bg-gray-50">
                                <td className="px-3 py-2 border-b border-gray-100">{post.title}</td>
                                <td className="px-3 py-2 border-b border-gray-100">{post.slug}</td>
                                <td className="px-3 py-2 border-b border-gray-100">{convertDate(post.updatedAt)}</td>
                                <td className="px-3 py-2 border-b border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/bai-viet/${post.slug}`}
                                            className="px-2 py-1 text-sm rounded-md bg-sky-100 text-sky-700 hover:bg-sky-200"
                                        >
                                            Xem
                                        </Link>
                                        <Link
                                            href={`/admin/bai-viet/${post.postId}`}
                                            className="px-2 py-1 text-sm rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200"
                                        >
                                            Sửa
                                        </Link>
                                        <button
                                            type="button"
                                            className="px-2 py-1 text-sm rounded-md bg-rose-100 text-rose-700 hover:bg-rose-200"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <PaginationNav currentPage={meta.page} countPage={meta.pageCount} />
            </div>
        </div>
    );
};

export default AdminPostListTemplate;
