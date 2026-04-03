import { unstable_cache } from "next/cache";

import prisma from "@/lib/prisma";
import { PageOptionsMapper } from "../mappers/page-options.mapper";
import { Order, SelectContext, SelectRole } from "../prisma-select/prisma-select-config";
import { ProductSelectConfig } from "../prisma-select/product-select";
import {
    IGetProductDetailParam,
    IGetProductDetailResponse,
    IGetProductListQuery,
    IGetProductListResponse,
    IProductReviewSnippet,
} from "./product.type";
import { ProductMapper } from "../mappers/product.mappers";


export const getProductDetailApi = async ({ param }: { param: IGetProductDetailParam }): Promise<IGetProductDetailResponse | null> => {
    try {
        const { productId } = param;
        const select = ProductSelectConfig(SelectContext.DETAIL, SelectRole.GUEST);

        const [data, reviewAgg, reviewRows, reviewCount] = await Promise.all([
            prisma.productV2.findUnique({
                where: { productId },
                select,
            }),
            prisma.commentV2.aggregate({
                where: { productId, rating: { not: null } },
                _avg: { rating: true },
            }),
            prisma.commentV2.findMany({
                where: { productId, rating: { not: null } },
                orderBy: { createdAt: "desc" },
                take: 5,
                select: {
                    rating: true,
                    content: true,
                    createdAt: true,
                    user: { select: { name: true } },
                },
            }),
            prisma.commentV2.count({
                where: { productId, rating: { not: null } },
            }),
        ]);

        if (!data) {
            return null;
        }
        const dataMap = ProductMapper.toDtoDetail(data);

        let reviewSnippet: IProductReviewSnippet | null = null;
        if (reviewCount > 0 && reviewAgg._avg.rating != null) {
            const ratingValue = Math.round(reviewAgg._avg.rating * 10) / 10;
            reviewSnippet = {
                aggregateRating: {
                    ratingValue,
                    reviewCount,
                    bestRating: 5,
                    worstRating: 1,
                },
                reviews: reviewRows.map((r) => ({
                    authorName: r.user?.name?.trim() || "Khách hàng",
                    rating: r.rating!,
                    reviewBody: (r.content || "").slice(0, 2000),
                    datePublished: r.createdAt.toISOString(),
                })),
            };
        }

        return { product: dataMap, reviewSnippet };
    } catch (error) {
        return null;
    }
};

export const getProductListApi = async ({ query }: { query: IGetProductListQuery }): Promise<IGetProductListResponse | null> => {
    try {
        const { take, page, order } = query;
        
        const select = ProductSelectConfig(SelectContext.LIST, SelectRole.GUEST);
        const [data, count] = await prisma.$transaction([
            prisma.productV2.findMany({
                take: take,
                skip: (page - 1) * take,
                select: select,
                orderBy: {
                    createdAt: order,
                },
            }),
            prisma.productV2.count(),
        ]);
        if (!data) {
            return null;
        }
        const meta = new PageOptionsMapper({ page, take, itemCount: count });
        return {
            products: ProductMapper.toDtoList(data),
            meta,
        };
    } catch (error) { return null; }
}

/** Chỉ dùng cho /san-pham trang 1: giảm tải DB, tái validate mỗi 120s. */
export const getProductListApiPageFirstCached = unstable_cache(
    async (take: number, order: Order) => getProductListApi({ query: { page: 1, take, order } }),
    ["product-list-guest-page-1"],
    { revalidate: 120, tags: ["products-list"] },
);