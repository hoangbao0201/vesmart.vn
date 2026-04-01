import type { GetServerSideProps, NextPage } from "next";

import { buildUrlSetXml } from "@/lib/sitemap/build-sitemap-xml";
import { getAllProductSitemapRows } from "@/lib/sitemap/queries";
import { sitemapGetServerSideProps } from "@/lib/sitemap/send-sitemap-response";

const SitemapProductsPage: NextPage = () => null;

export default SitemapProductsPage;

export const getServerSideProps: GetServerSideProps = sitemapGetServerSideProps(async () => {
    const rows = await getAllProductSitemapRows();

    return buildUrlSetXml(
        rows.map((r) => ({
            path: r.path,
            lastmod: r.updatedAt,
            changefreq: "weekly" as const,
            priority: 0.8,
        })),
    );
});
