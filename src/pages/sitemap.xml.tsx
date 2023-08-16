import { GetServerSideProps, GetServerSidePropsContext } from "next";

import siteMetadata from "@/siteMetadata";
import blogService from "@/services/blog.service";

interface BlogSiteProps {
    id: string
    slug: string
    createdAt: Date
    updatedAt: Date
}
function generateSiteMap(blogs?: BlogSiteProps[]) {

    return (
        `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">

            <url>
                <loc>${siteMetadata.siteUrl}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>hourly</changefreq>
                <priority>1</priority>
            </url>
            
            ${blogs && blogs.map((blog) => {
                return (
                    `
                        <url>
                            <loc>${siteMetadata.siteUrl}/bai-viet/${blog.slug}</loc>
                            <lastmod>${blog.updatedAt}</lastmod>
                            <changefreq>daily</changefreq>
                            <priority>0.5</priority>
                        </url>
                    `
                );
            }).join("")} 
               
        </urlset>`
    );
}

export const getServerSideProps : GetServerSideProps = async ({ res } : GetServerSidePropsContext) => {
    const dataRes = await blogService.fullSeo();

    let sitemap;
    if(!dataRes.success) {
        sitemap = generateSiteMap();
    } else {
        sitemap = generateSiteMap(JSON.parse(JSON.stringify(dataRes.blogs)));
    }

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default function SiteMap() {
    return null
}