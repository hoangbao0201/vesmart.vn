import { MetaTypeEnum } from "../../../generated/prisma";

import prisma from "@/lib/prisma";
import { productDetailPath } from "@/lib/seo";
import { tagNameToSlug } from "@/utils/tagSlug";

export type SitemapRow = { path: string; updatedAt: Date };

export async function getAllProductSitemapRows(): Promise<SitemapRow[]> {
    const rows = await prisma.productV2.findMany({
        select: {
            productId: true,
            slug: true,
            updatedAt: true,
        },
        orderBy: { updatedAt: "desc" },
    });

    return rows.map((r) => ({
        path: productDetailPath({
            productId: r.productId,
            slug: r.slug ?? "",
        }),
        updatedAt: r.updatedAt,
    }));
}

export async function getAllPostSitemapRows(): Promise<SitemapRow[]> {
    const rows = await prisma.postV2.findMany({
        select: {
            slug: true,
            updatedAt: true,
        },
        orderBy: { updatedAt: "desc" },
    });

    return rows.map((r) => ({
        path: `/bai-viet/${r.slug}`,
        updatedAt: r.updatedAt,
    }));
}

export async function getAllTagSitemapRows(): Promise<SitemapRow[]> {
    const rows = await prisma.metaV2.findMany({
        where: { type: MetaTypeEnum.TAG },
        select: {
            name: true,
            updatedAt: true,
        },
        orderBy: { updatedAt: "desc" },
    });

    return rows.map((r) => ({
        path: `/the-loai/${tagNameToSlug(r.name)}`,
        updatedAt: r.updatedAt,
    }));
}

// Google: tối đa ~50.000 URL / file sitemap — nếu vượt, tách thêm sitemap-products-2, ...
