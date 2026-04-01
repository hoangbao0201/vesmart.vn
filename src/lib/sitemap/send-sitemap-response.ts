import type { GetServerSideProps } from "next";

import { SITEMAP_CACHE_HEADER } from "@/lib/sitemap/build-sitemap-xml";

export function sitemapGetServerSideProps(getXml: () => Promise<string> | string): GetServerSideProps {
    return async ({ res }) => {
        try {
            const xml = await getXml();
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/xml; charset=utf-8");
            res.setHeader("Cache-Control", SITEMAP_CACHE_HEADER);
            res.write(xml);
            res.end();
        } catch {
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.write("Sitemap error");
            res.end();
        }
        return { props: {} };
    };
}
