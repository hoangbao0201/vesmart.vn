import prisma from "@/lib/prisma";
import { PageOptionsMapper } from "../mappers/page-options.mapper";
import { PostMapper } from "../post/post.mappers";
import { PostSelectConfig } from "../prisma-select/post-select";
import { ProductSelectConfig } from "../prisma-select/product-select";
import { Order, SelectContext, SelectRole } from "../prisma-select/prisma-select-config";
import { ProductMapper } from "../mappers/product.mappers";
import { MetaTypeEnum } from "../../../generated/prisma";
import {
    IAdminCreateImageBody,
    IAdminGetImageListQuery,
    IAdminGetImageListResponse,
    IAdminGetPostDetailByIdResponse,
    IAdminGetOrderListQuery,
    IAdminGetOrderListResponse,
    IAdminGetPostListQuery,
    IAdminGetPostListResponse,
    IAdminGetProductListQuery,
    IAdminGetProductListResponse,
    IAdminUpsertPostBody,
} from "./admin.type";
import { OrderV2SelectConfig } from "../prisma-select/order-select";

export const getAdminPostListApi = async ({
    query,
}: {
    query: IAdminGetPostListQuery;
}): Promise<IAdminGetPostListResponse | null> => {
    try {
        const { take, page, order = Order.DESC } = query;
        const select = PostSelectConfig(SelectContext.LIST, SelectRole.ADMIN);

        const [data, count] = await prisma.$transaction([
            prisma.postV2.findMany({
                take,
                skip: (page - 1) * take,
                select,
                orderBy: { updatedAt: order },
            }),
            prisma.postV2.count(),
        ]);

        const meta = new PageOptionsMapper({ page, take, itemCount: count });
        return {
            posts: PostMapper.toDtoList(data),
            meta,
        };
    } catch {
        return null;
    }
};

export const getAdminProductListApi = async ({
    query,
}: {
    query: IAdminGetProductListQuery;
}): Promise<IAdminGetProductListResponse | null> => {
    try {
        const { take, page, order = Order.DESC } = query;
        const select = ProductSelectConfig(SelectContext.LIST, SelectRole.ADMIN);

        const [data, count] = await prisma.$transaction([
            prisma.productV2.findMany({
                take,
                skip: (page - 1) * take,
                select,
                orderBy: { createdAt: order },
            }),
            prisma.productV2.count(),
        ]);

        const meta = new PageOptionsMapper({ page, take, itemCount: count });
        return {
            products: ProductMapper.toDtoList(data),
            meta,
        };
    } catch {
        return null;
    }
};

export const getAdminOrderListApi = async ({
    query,
}: {
    query: IAdminGetOrderListQuery;
}): Promise<IAdminGetOrderListResponse | null> => {
    try {
        const { page, take } = query;
        const select = OrderV2SelectConfig(SelectContext.LIST, SelectRole.ADMIN);

        const [orders, count] = await prisma.$transaction([
            prisma.orderV2.findMany({
                skip: (page - 1) * take,
                take,
                select,
                orderBy: { createdAt: Order.DESC },
            }),
            prisma.orderV2.count(),
        ]);

        const meta = new PageOptionsMapper({ page, take, itemCount: count });
        return {
            orders,
            meta,
        };
    } catch {
        return null;
    }
};

export const getAdminPostDetailByIdApi = async ({
    postId,
}: {
    postId: string;
}): Promise<IAdminGetPostDetailByIdResponse | null> => {
    try {
        const select = PostSelectConfig(SelectContext.DETAIL, SelectRole.ADMIN);
        const data = await prisma.postV2.findUnique({
            where: { postId },
            select,
        });

        if (!data) {
            return null;
        }

        const post = PostMapper.toDtoDetail(data);
        return { post };
    } catch {
        return null;
    }
};

export const getAdminTagListApi = async (): Promise<string[]> => {
    try {
        const tags = await prisma.metaV2.findMany({
            where: { type: MetaTypeEnum.TAG },
            select: { name: true },
            orderBy: { updatedAt: "desc" },
        });
        return tags.map((tag) => tag.name);
    } catch {
        return [];
    }
};

export const upsertAdminPostApi = async ({
    body,
    userId,
    postId,
}: {
    body: IAdminUpsertPostBody;
    userId: string;
    postId?: string;
}) => {
    const normalizedTags: string[] = Array.from(
        new Set(
            (body.tags || [])
                .map((tag: string) => tag.trim())
                .filter(Boolean)
                .map((tag: string) => tag.toLowerCase())
        )
    );

    const existingTags = await prisma.metaV2.findMany({
        where: {
            type: MetaTypeEnum.TAG,
            name: { in: normalizedTags },
        },
        select: {
            metaId: true,
            name: true,
        },
    });

    const existingTagNames = new Set(existingTags.map((tag) => tag.name));
    const missingTags = normalizedTags.filter((tag) => !existingTagNames.has(tag));

    if (missingTags.length) {
        await prisma.metaV2.createMany({
            data: missingTags.map((tag) => ({
                name: tag,
                type: MetaTypeEnum.TAG,
            })),
        });
    }

    const allTags = await prisma.metaV2.findMany({
        where: {
            type: MetaTypeEnum.TAG,
            name: { in: normalizedTags },
        },
        select: {
            metaId: true,
        },
    });

    const postDataBase = {
        title: body.title.trim(),
        slug: body.slug.trim(),
        content: body.content,
        description: body.description?.trim() || null,
    };
    const imageConnections = (body.images || [])
        .map((item) => item?.imageId?.trim())
        .filter(Boolean)
        .map((imageId, index) => ({
            image: {
                connect: { imageId },
            },
            index,
        }));

    if (postId) {
        return prisma.postV2.update({
            where: { postId },
            data: {
                ...postDataBase,
                metas: {
                    deleteMany: {},
                    create: allTags.map((tag) => ({
                        meta: {
                            connect: { metaId: tag.metaId },
                        },
                    })),
                },
                images: {
                    deleteMany: {},
                    create: imageConnections,
                },
            },
            select: {
                postId: true,
                slug: true,
            },
        });
    }

    return prisma.postV2.create({
        data: {
            ...postDataBase,
            user: {
                connect: { userId },
            },
            metas: {
                create: allTags.map((tag) => ({
                    meta: {
                        connect: { metaId: tag.metaId },
                    },
                })),
            },
            images: {
                create: imageConnections,
            },
        },
        select: {
            postId: true,
            slug: true,
        },
    });
};

export const getAdminImageListApi = async ({
    query,
}: {
    query: IAdminGetImageListQuery;
}): Promise<IAdminGetImageListResponse | null> => {
    try {
        const { take, page, order = Order.DESC } = query;
        const [images, count] = await prisma.$transaction([
            prisma.imageV2.findMany({
                take,
                skip: (page - 1) * take,
                orderBy: { createdAt: order },
                select: {
                    imageId: true,
                    url: true,
                    width: true,
                    height: true,
                    imageType: true,
                    dominantColor: true,
                    createdAt: true,
                },
            }),
            prisma.imageV2.count(),
        ]);

        return {
            images,
            meta: new PageOptionsMapper({ page, take, itemCount: count }),
        };
    } catch {
        return null;
    }
};

export const createAdminImageApi = async ({
    body,
}: {
    body: IAdminCreateImageBody;
}) => {
    return prisma.imageV2.create({
        data: {
            url: body.url,
            width: body.width ?? null,
            height: body.height ?? null,
            imageType: body.imageType ?? null,
            dominantColor: body.dominantColor ?? null,
            source: body.source ?? "VESMART Storage",
            description: body.description ?? null,
            index: 1,
        },
        select: {
            imageId: true,
            url: true,
            width: true,
            height: true,
            imageType: true,
            dominantColor: true,
            createdAt: true,
        },
    });
};

export const deleteAdminImageApi = async ({
    imageId,
}: {
    imageId: string;
}) => {
    return prisma.imageV2.delete({
        where: { imageId },
        select: { imageId: true },
    });
};
