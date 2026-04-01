import type { GetServerSideProps, NextPage } from "next";

import { buildUrlSetXml } from "@/lib/sitemap/build-sitemap-xml";
import { sitemapGetServerSideProps } from "@/lib/sitemap/send-sitemap-response";

const SitemapMainPage: NextPage = () => null;

export default SitemapMainPage;

export const getServerSideProps: GetServerSideProps = sitemapGetServerSideProps(async () => {
    const now = new Date();

    return buildUrlSetXml([
        { path: "/", lastmod: now, changefreq: "daily", priority: 1 },
        { path: "/san-pham", lastmod: now, changefreq: "daily", priority: 0.9 },
        { path: "/bai-viet", lastmod: now, changefreq: "daily", priority: 0.9 },
    ]);
});
