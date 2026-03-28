import { GetServerSideProps, GetServerSidePropsContext } from "next";

import siteMetadata from "@/siteMetadata";
import blogService from "@/serverless/blog.service";
import productService from "@/serverless/product.service";

interface BlogSiteProps {
    id: string;
    slug: string;
    title: string;
    thumbnail: string | null;
    createdAt: Date;
    updatedAt: Date;
}
interface ProductSideProps {
    id: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

function toW3CDate(d: Date | string): string {
    try {
        return new Date(d).toISOString();
    } catch {
        return new Date().toISOString();
    }
}

function escapeXml(s: string): string {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function absImageLoc(base: string, thumbnail: string): string {
    const t = thumbnail.trim();
    if (!t) return "";
    if (t.startsWith("http://") || t.startsWith("https://")) {
        return t;
    }
    const path = t.startsWith("/") ? t : `/${t}`;
    return `${base}${path}`;
}

function urlEntry(
    loc: string,
    lastmod: string,
    changefreq: string,
    priority: string,
    image?: { loc: string; title: string }
) {
    const imageBlock =
        image && image.loc
            ? `
                <image:image>
                    <image:loc>${escapeXml(image.loc)}</image:loc>
                    <image:title>${escapeXml(image.title.slice(0, 100))}</image:title>
                </image:image>`
            : "";

    return `
            <url>
                <loc>${escapeXml(loc)}</loc>
                <lastmod>${lastmod}</lastmod>
                <changefreq>${changefreq}</changefreq>
                <priority>${priority}</priority>${imageBlock}
            </url>`;
}

function generateSiteMap(blogs?: BlogSiteProps[], products?: ProductSideProps[]) {
    const base = siteMetadata.siteUrl.replace(/\/$/, "");
    const now = new Date().toISOString();

    const staticUrls = [
        { path: "/", changefreq: "daily", priority: "1.0" },
        { path: "/bai-viet", changefreq: "daily", priority: "0.85" },
        { path: "/gio-hang", changefreq: "monthly", priority: "0.4" },
    ];

    let body = "";
    for (const u of staticUrls) {
        body += urlEntry(`${base}${u.path}`, now, u.changefreq, u.priority);
    }

    if (blogs?.length) {
        for (const blog of blogs) {
            const thumb = blog.thumbnail
                ? absImageLoc(base, blog.thumbnail)
                : "";
            body += urlEntry(
                `${base}/bai-viet/${blog.slug}`,
                toW3CDate(blog.updatedAt),
                "weekly",
                "0.7",
                thumb
                    ? { loc: thumb, title: blog.title || blog.slug }
                    : undefined
            );
        }
    }

    if (products?.length) {
        for (const product of products) {
            body += urlEntry(
                `${base}/san-pham/${product.slug}-${product.id}`,
                toW3CDate(product.updatedAt),
                "weekly",
                "0.75"
            );
        }
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({
    res,
}: GetServerSidePropsContext) => {
    const blogsDataRes = await blogService.fullSeo();
    const productsDataRes = await productService.fullSeo();

    const blogs = blogsDataRes.success
        ? JSON.parse(JSON.stringify(blogsDataRes.blogs))
        : [];
    const products = productsDataRes.success
        ? JSON.parse(JSON.stringify(productsDataRes.products))
        : [];

    const sitemap = generateSiteMap(blogs, products);

    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=600"
    );
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default function SiteMap() {
    return null;
}
