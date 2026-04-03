"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

import ProductCard from "@/components/share/ProductCard";
import type { PublicListMeta } from "@/configs/list-infinite.config";
import type { IGetProductList } from "@/services/product/product.type";

type Props = {
    initialProducts: IGetProductList[];
    initialMeta: PublicListMeta;
    apiPath: string;
};

export default function ProductListInfinite({ initialProducts, initialMeta, apiPath }: Props) {
    const [items, setItems] = useState(initialProducts);
    const [page, setPage] = useState(initialMeta.page);
    const [hasMore, setHasMore] = useState(initialMeta.page < initialMeta.pageCount);
    const [loading, setLoading] = useState(false);
    const loadingLock = useRef(false);

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
            const res = await fetch(`${apiPath}?${qs.toString()}`);
            if (!res.ok) return;
            const data: { products: IGetProductList[]; meta: PublicListMeta } = await res.json();
            setItems((prev) => [...prev, ...data.products]);
            setPage(data.meta.page);
            setHasMore(data.meta.page < data.meta.pageCount);
        } finally {
            loadingLock.current = false;
            setLoading(false);
        }
    }, [apiPath, hasMore, initialMeta.take, page]);

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
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-6 gap-x-1 gap-y-4">
                {items.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
            {hasMore ? (
                <div ref={sentinelRef} className="h-12 w-full flex items-center justify-center py-4" aria-hidden>
                    {loading ? <span className="text-gray-500 text-sm">Đang tải thêm…</span> : null}
                </div>
            ) : items.length > 0 ? (
                <p className="text-center text-gray-500 text-sm py-6">
                    Đã hiển thị toàn bộ {initialMeta.itemCount} sản phẩm.
                </p>
            ) : null}
        </>
    );
}
