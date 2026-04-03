"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

import type { PublicListMeta } from "@/configs/list-infinite.config";
import type { IGetPostList } from "@/services/post/post.type";
import convertDate from "@/utils/convertDate";

type Props = {
    initialPosts: IGetPostList[];
    initialMeta: PublicListMeta;
    apiPath: string;
    /** Tham số query cố định mỗi lần tải thêm (vd: slug thể loại). */
    extraQuery?: Record<string, string>;
};

export default function PostListInfinite({ initialPosts, initialMeta, apiPath, extraQuery }: Props) {
    const [items, setItems] = useState(initialPosts);
    const [page, setPage] = useState(initialMeta.page);
    const [hasMore, setHasMore] = useState(initialMeta.page < initialMeta.pageCount);
    const [loading, setLoading] = useState(false);
    const loadingLock = useRef(false);
    const extraQueryRef = useRef(extraQuery);
    extraQueryRef.current = extraQuery;
    const extraQueryKey = JSON.stringify(extraQuery ?? {});

    const loadMore = useCallback(async () => {
        if (loadingLock.current || !hasMore) return;
        loadingLock.current = true;
        setLoading(true);
        try {
            const nextPage = page + 1;
            const qs = new URLSearchParams({
                page: String(nextPage),
                take: String(initialMeta.take),
            });
            const q = extraQueryRef.current;
            if (q) {
                for (const [k, v] of Object.entries(q)) {
                    qs.set(k, v);
                }
            }
            const res = await fetch(`${apiPath}?${qs.toString()}`);
            if (!res.ok) return;
            const data: { posts: IGetPostList[]; meta: PublicListMeta } = await res.json();
            setItems((prev) => [...prev, ...data.posts]);
            setPage(data.meta.page);
            setHasMore(data.meta.page < data.meta.pageCount);
        } finally {
            loadingLock.current = false;
            setLoading(false);
        }
    }, [apiPath, extraQueryKey, hasMore, initialMeta.take, page]);

    const { ref: sentinelRef, isIntersecting } = useIntersectionObserver({
        rootMargin: "280px 0px",
        threshold: 0,
    });

    useEffect(() => {
        if (!isIntersecting || !hasMore || loading) return;
        void loadMore();
    }, [isIntersecting, hasMore, loadMore, loading]);

    return (
        <>
            <div className="px-3 mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((post) => (
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
                                        src={post.images[0].image.url}
                                        width={post.images[0].image.width || 0}
                                        height={post.images[0].image.height || 0}
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
                ))}
            </div>
            {hasMore ? (
                <div ref={sentinelRef} className="h-12 w-full flex items-center justify-center py-4" aria-hidden>
                    {loading ? <span className="text-gray-500 text-sm">Đang tải thêm…</span> : null}
                </div>
            ) : items.length > 0 ? (
                <p className="text-center text-gray-500 text-sm py-6">
                    Đã hiển thị toàn bộ {initialMeta.itemCount} bài viết.
                </p>
            ) : null}
        </>
    );
}
