import Link from "next/link";
import Image from "next/image";

import { PaginationNav } from "@/components/share/PaginationNav";
import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
import type { PublicListMeta } from "@/configs/list-infinite.config";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";
import { IGetPostList } from "@/services/post/post.type";
import convertDate from "@/utils/convertDate";

import PostListInfinite from "./PostListInfinite";

interface PostListTemplateProps {
    posts: IGetPostList[];
    meta: PageOptionsMapper;
    tagArchive?: {
        tagName: string;
    };
    infinite?: { apiPath: string; metaPlain: PublicListMeta; extraQuery?: Record<string, string> };
}

const PostListTemplate = ({ posts, meta, tagArchive, infinite }: PostListTemplateProps) => {
    const pageLabel = tagArchive
        ? tagArchive.tagName
        : meta.page > 1
          ? `Bài viết - Trang ${meta.page}`
          : "Bài viết";

    const breadcrumbItems = tagArchive
        ? [
              { name: "Trang chủ", path: "/" },
              { name: "Bài viết", path: "/bai-viet" },
              { name: tagArchive.tagName },
          ]
        : [
              { name: "Trang chủ", path: "/" },
              { name: pageLabel },
          ];

    return (
        <div className="py-4 container mx-auto max-w-7xl min-h-screen">
            <BreadcrumbNav className="mb-4 px-3" items={breadcrumbItems} />
            <header className="px-3 mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-950">{pageLabel}</h1>
                <p className="mt-2 text-gray-600 text-sm md:text-base">
                    {tagArchive
                        ? `Bài viết gắn thẻ "${tagArchive.tagName}" — ${meta.itemCount} bài.`
                        : `Tin tức, hướng dẫn và cập nhật - ${meta.itemCount} bài viết.`}
                </p>
            </header>
            <h2 className="sr-only">{tagArchive ? "Danh sách bài theo thể loại" : "Danh sách bài viết"}</h2>
            {infinite ? (
                <PostListInfinite
                    initialPosts={posts}
                    initialMeta={infinite.metaPlain}
                    apiPath={infinite.apiPath}
                    extraQuery={infinite.extraQuery}
                />
            ) : (
                <>
                    <div className="px-3 mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post) => {
                            return (
                                <div
                                    key={post.postId}
                                    className="block group overflow-hidden bg-white border border-transparent hover:border-blue-600 hover:translate-y-[-5px] translate-y-0 hover:shadow-lg transition-all duration-300 relative"
                                >
                                    <Link href={`/bai-viet/${post?.slug}`} className="px-3 py-4 flex flex-col h-full">
                                        <p className="mb-3 text-sm text-right text-gray-500">{convertDate(post.createdAt)}</p>

                                        <div className="mb-3 bg-gray-300 aspect-video rounded-md overflow-hidden">
                                            {post.images?.[0]?.image?.url && (
                                                <Image
                                                    unoptimized
                                                    alt={`Ảnh đại diện bài viết: ${post.title}`}
                                                    src={post.images?.[0]?.image?.url}
                                                    width={post.images?.[0]?.image?.width || 0}
                                                    height={post.images?.[0]?.image?.height || 0}
                                                    loading="lazy"
                                                    className="w-full h-auto aspect-video border border-gray-100 shadow-xs object-cover"
                                                />
                                            )}
                                        </div>
                                        <h3 className="mb-3 line-clamp-2 capitalize font-medium text-lg">{post.title}</h3>

                                        <div className="w-full py-2 mt-auto block text-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-all">
                                            Đọc ngay
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    <PaginationNav
                        currentPage={meta.page}
                        countPage={meta.pageCount}
                    />
                </>
            )}
        </div>
    )
}

export default PostListTemplate;