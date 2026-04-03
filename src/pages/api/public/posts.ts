import type { NextApiRequest, NextApiResponse } from "next";

import { LIST_PAGE_SIZE, type PublicListMeta } from "@/configs/list-infinite.config";
import { getPostListApi } from "@/services/post/post.api";
import { Order } from "@/services/prisma-select/prisma-select-config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        return res.status(405).end();
    }

    const pageRaw = parseInt(String(req.query.page ?? "1"), 10);
    const takeRaw = parseInt(String(req.query.take ?? String(LIST_PAGE_SIZE)), 10);
    const page = Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.min(pageRaw, 500) : 1;
    const take = Number.isFinite(takeRaw) && takeRaw >= 1 ? Math.min(takeRaw, LIST_PAGE_SIZE) : LIST_PAGE_SIZE;

    const data = await getPostListApi({ query: { page, take, order: Order.DESC } });
    if (!data) {
        return res.status(500).json({ error: "failed" });
    }

    const meta: PublicListMeta = {
        page: data.meta.page,
        take: data.meta.take,
        itemCount: data.meta.itemCount,
        pageCount: data.meta.pageCount,
    };

    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({
        posts: JSON.parse(JSON.stringify(data.posts)),
        meta,
    });
}
