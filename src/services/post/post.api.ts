import {
    IApiResponse,
    IGetPostDetail,
    IGetPostDetailByIdParam,
    IGetPostDetailParam,
    IGetPostDetailResponse,
    IGetPostList,
    IGetPostListByTagQuery,
    IGetPostListByTagResponse,
    IGetPostListQuery,
    IGetPostListResponse,
    IUpsertPostBody,
} from "./post.type";
import { PageOptionsMapper } from "../mappers/page-options.mapper";
import { unstable_cache } from "next/cache";

import { PostSelectConfig } from "../prisma-select/post-select";
import { Order, SelectContext, SelectRole } from "../prisma-select/prisma-select-config";
import { PostMapper } from "./post.mappers";
import prisma from "@/lib/prisma";
import { MetaTypeEnum } from "../../../generated/prisma";
import { tagNameToSlug } from "@/utils/tagSlug";


export const getPostDetailApi = async ({ param }: { param: IGetPostDetailParam }): Promise<IGetPostDetailResponse | null> => {
    try {
        const { slug } = param;
        const select = PostSelectConfig(SelectContext.DETAIL, SelectRole.GUEST);
        const data = await prisma.postV2.findUnique({
            where: { slug },
            select: select,
        });

        if (!data) {
            return null;
        }
        const dataMap = PostMapper.toDtoDetail(data);
        return { post: dataMap };
    } catch { return null; }
}

export const getPostListApi = async ({ query }: { query: IGetPostListQuery }): Promise<IGetPostListResponse | null> => {
    try {
        const { take, page, order } = query;
        
        const select = PostSelectConfig(SelectContext.LIST, SelectRole.GUEST);
        const [data, count] = await prisma.$transaction([
            prisma.postV2.findMany({
                take: take,
                skip: (page - 1) * take,
                select: select,
                orderBy: {
                    updatedAt: order,
                },
            }),
            prisma.postV2.count(),
        ]);
        if (!data) {
            return null;
        }
        const meta = new PageOptionsMapper({ page, take, itemCount: count });
        return {
            posts: PostMapper.toDtoList(data),
            meta,
        };
    } catch { return null; }
}

/** Chỉ dùng cho /bai-viet trang 1: giảm tải DB, tái validate mỗi 120s. Trang page≥2 gọi getPostListApi trực tiếp. */
export const getPostListApiPageFirstCached = unstable_cache(
    async (take: number, order: Order) => getPostListApi({ query: { page: 1, take, order } }),
    ["post-list-guest-page-1"],
    { revalidate: 120, tags: ["posts-list"] },
);

export const getPostListByTagSlugApi = async ({
    query,
}: {
    query: IGetPostListByTagQuery;
}): Promise<IGetPostListByTagResponse | null> => {
    try {
        const { slugTag, take, page, order } = query;
        const slugNorm = tagNameToSlug(slugTag.trim());
        if (!slugNorm) {
            return null;
        }

        const tagMetas = await prisma.metaV2.findMany({
            where: { type: MetaTypeEnum.TAG },
            select: { metaId: true, name: true },
        });

        const matched = tagMetas.find((m) => tagNameToSlug(m.name) === slugNorm);
        if (!matched) {
            return null;
        }

        const where = {
            metas: { some: { metaId: matched.metaId } },
        };

        const select = PostSelectConfig(SelectContext.LIST, SelectRole.GUEST);
        const [data, count] = await prisma.$transaction([
            prisma.postV2.findMany({
                where,
                take,
                skip: (page - 1) * take,
                select,
                orderBy: {
                    updatedAt: order,
                },
            }),
            prisma.postV2.count({ where }),
        ]);

        if (!data) {
            return null;
        }

        const meta = new PageOptionsMapper({ page, take, itemCount: count });
        return {
            posts: PostMapper.toDtoList(data),
            meta,
            tagName: matched.name,
        };
    } catch {
        return null;
    }
};
