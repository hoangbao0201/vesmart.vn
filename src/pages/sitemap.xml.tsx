import { GetServerSideProps, GetServerSidePropsContext } from "next";

import siteMetadata from "@/siteMetadata";
import blogService from "@/serverless/blog.service";
import productService from "@/serverless/product.service";

interface BlogSiteProps {
    id: string
    slug: string
    createdAt: Date
    updatedAt: Date
}
interface ProductSideProps {
    id: string
    slug: string
    createdAt: Date
    updatedAt: Date
}
function generateSiteMap(blogs?: BlogSiteProps[], products?: ProductSideProps[]) {

    return (
        `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">

            <url>
                <loc>${siteMetadata.siteUrl}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>hourly</changefreq>
                <priority>1</priority>
            </url>
            <url>
                <loc>${siteMetadata.siteUrl}/bai-viet</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>hourly</changefreq>
                <priority>0.5</priority>
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

            ${products && products.map((product) => {
                return (
                    `
                        <url>
                            <loc>${siteMetadata?.siteUrl}/san-pham/${product?.slug}-${product?.id}</loc>
                            <lastmod>${product?.updatedAt}</lastmod>
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
    const blogsDataRes = await blogService.fullSeo();
    const productsDataRes = await productService.fullSeo();

    let sitemap;
    sitemap = generateSiteMap( JSON.parse(JSON.stringify(blogsDataRes.blogs)), JSON.parse(JSON.stringify(productsDataRes.products)) );

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