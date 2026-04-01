import Head from "next/head";

import { SITE_CONFIG } from "@/configs/site.config";
import { absoluteUrl } from "@/lib/seo";

export type OgType = "website" | "article" | "product";

export interface ArticleMetaTimes {
    publishedTime: string;
    modifiedTime?: string;
    /** Tên tác giả (og article:author) */
    authorName?: string;
}

export interface PageSeoHeadProps {
    title: string;
    description: string;
    canonicalUrl: string;
    ogImage?: string | null;
    ogType?: OgType;
    noindex?: boolean;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[] | null;
    /** Facebook / LinkedIn: kích thước ảnh OG khi biết (ảnh bài viết, banner). */
    ogImageDimensions?: { width: number; height: number } | null;
    ogImageAlt?: string | null;
    /** og:type=article — thời điểm xuất bản / sửa */
    article?: ArticleMetaTimes | null;
    /** Phân trang danh sách (đường dẫn tương đối, ví dụ /bai-viet?page=2) */
    pagination?: { prevPath?: string; nextPath?: string } | null;
    /** Thêm link hreflang=vi + x-default (site một ngôn ngữ). Tắt cho 404/500. */
    includeHreflang?: boolean;
}

function JsonLdScript({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
    const payload = Array.isArray(data)
        ? data.length === 1
            ? data[0]
            : { "@context": "https://schema.org", "@graph": data }
        : data;
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
        />
    );
}

export default function PageSeoHead({
    title,
    description,
    canonicalUrl,
    ogImage,
    ogType = "website",
    noindex = false,
    jsonLd,
    ogImageDimensions,
    ogImageAlt,
    article,
    pagination,
    includeHreflang = true,
}: PageSeoHeadProps) {
    const absoluteCanonical = absoluteUrl(canonicalUrl);
    const image = ogImage ? absoluteUrl(ogImage) : absoluteUrl(SITE_CONFIG.logo);
    const twitterCard = ogImage ? "summary_large_image" : "summary";
    const imageAlt = ogImageAlt ?? title;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={absoluteCanonical} />

            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content={SITE_CONFIG.name} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={absoluteCanonical} />
            <meta property="og:image" content={image} />
            <meta property="og:image:alt" content={imageAlt} />
            {ogImageDimensions ? (
                <>
                    <meta property="og:image:width" content={String(ogImageDimensions.width)} />
                    <meta property="og:image:height" content={String(ogImageDimensions.height)} />
                </>
            ) : null}
            <meta property="og:locale" content="vi_VN" />

            {ogType === "article" && article ? (
                <>
                    <meta property="article:published_time" content={article.publishedTime} />
                    {article.modifiedTime ? (
                        <meta property="article:modified_time" content={article.modifiedTime} />
                    ) : null}
                    {article.authorName ? (
                        <meta property="article:author" content={article.authorName} />
                    ) : null}
                </>
            ) : null}

            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {includeHreflang ? (
                <>
                    <link rel="alternate" hrefLang="vi" href={absoluteCanonical} />
                    <link rel="alternate" hrefLang="x-default" href={absoluteCanonical} />
                </>
            ) : null}

            {pagination?.prevPath ? (
                <link rel="prev" href={absoluteUrl(pagination.prevPath)} />
            ) : null}
            {pagination?.nextPath ? (
                <link rel="next" href={absoluteUrl(pagination.nextPath)} />
            ) : null}

            {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}

            {jsonLd ? <JsonLdScript data={jsonLd} /> : null}
        </Head>
    );
}
