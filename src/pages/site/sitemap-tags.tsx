import type { GetServerSideProps, NextPage } from "next";

import { buildUrlSetXml } from "@/lib/sitemap/build-sitemap-xml";
import { getAllTagSitemapRows } from "@/lib/sitemap/queries";
import { sitemapGetServerSideProps } from "@/lib/sitemap/send-sitemap-response";

const SitemapTagsPage: NextPage = () => null;

export default SitemapTagsPage;

export const getServerSideProps: GetServerSideProps = sitemapGetServerSideProps(async () => {
    const rows = await getAllTagSitemapRows();

    return buildUrlSetXml(
        rows.map((r) => ({
            path: r.path,
            lastmod: r.updatedAt,
            changefreq: "weekly" as const,
            priority: 0.65,
        })),
    );
});
