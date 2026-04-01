import type { GetServerSideProps, NextPage } from "next";

import { MetaTypeEnum } from "../../../generated/prisma";

import prisma from "@/lib/prisma";
import { buildSitemapIndexXml } from "@/lib/sitemap/build-sitemap-xml";
import { sitemapGetServerSideProps } from "@/lib/sitemap/send-sitemap-response";

const SitemapIndexPage: NextPage = () => null;

export default SitemapIndexPage;

export const getServerSideProps: GetServerSideProps = sitemapGetServerSideProps(async () => {
    const [productLast, postLast, tagLast] = await Promise.all([
        prisma.productV2.findFirst({
            orderBy: { updatedAt: "desc" },
            select: { updatedAt: true },
        }),
        prisma.postV2.findFirst({
            orderBy: { updatedAt: "desc" },
            select: { updatedAt: true },
        }),
        prisma.metaV2.findFirst({
            where: { type: MetaTypeEnum.TAG },
            orderBy: { updatedAt: "desc" },
            select: { updatedAt: true },
        }),
    ]);

    const now = new Date();

    return buildSitemapIndexXml([
        { loc: "/site/sitemap-main", lastmod: now },
        { loc: "/site/sitemap-products", lastmod: productLast?.updatedAt ?? now },
        { loc: "/site/sitemap-posts", lastmod: postLast?.updatedAt ?? now },
        { loc: "/site/sitemap-tags", lastmod: tagLast?.updatedAt ?? now },
    ]);
});
