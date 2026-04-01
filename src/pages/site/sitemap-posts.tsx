import type { GetServerSideProps, NextPage } from "next";

import { buildUrlSetXml } from "@/lib/sitemap/build-sitemap-xml";
import { getAllPostSitemapRows } from "@/lib/sitemap/queries";
import { sitemapGetServerSideProps } from "@/lib/sitemap/send-sitemap-response";

const SitemapPostsPage: NextPage = () => null;

export default SitemapPostsPage;

export const getServerSideProps: GetServerSideProps = sitemapGetServerSideProps(async () => {
    const rows = await getAllPostSitemapRows();

    return buildUrlSetXml(
        rows.map((r) => ({
            path: r.path,
            lastmod: r.updatedAt,
            changefreq: "weekly" as const,
            priority: 0.75,
        })),
    );
});
