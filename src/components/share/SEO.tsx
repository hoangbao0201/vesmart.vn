import Head from "next/head";
import { useRouter } from "next/router";
import siteMetadata from "@/siteMetadata";
import { ImageTypes } from "@/types";

export type BreadcrumbItem = { name: string; href: string };

function absUrl(pathOrUrl: string): string {
    if (!pathOrUrl) return siteMetadata.siteUrl;
    if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
        return pathOrUrl;
    }
    const base = siteMetadata.siteUrl.replace(/\/$/, "");
    const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
    return `${base}${path}`;
}

function formatPageTitle(title: string): string {
    if (/\|\s*VESMART/i.test(title) || /VESMART\s*[|—-]/i.test(title)) {
        return title;
    }
    return siteMetadata.titleTemplate.replace("%s", title);
}

function breadcrumbJsonLd(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: absUrl(item.href),
        })),
    };
}

function localBusinessJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Công Ty cổ Phần Vesmart",
        image: absUrl("/favicon.ico"),
        "@id": absUrl("/#localbusiness"),
        url: siteMetadata.siteUrl,
        telephone: siteMetadata.phone,
        address: {
            "@type": "PostalAddress",
            streetAddress: siteMetadata.address,
            addressLocality: "Đà Nẵng",
            postalCode: "550000",
            addressCountry: "VN",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: siteMetadata.latitude,
            longitude: siteMetadata.longitude,
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
            ],
            opens: "07:00",
            closes: "18:00",
        },
        sameAs: siteMetadata.sameAs?.length
            ? siteMetadata.sameAs
            : [siteMetadata.urlFanpageFacebook],
    };
}

function organizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": absUrl("/#organization"),
        url: siteMetadata.siteUrl,
        name: "Công Ty cổ Phần Vesmart",
        logo: absUrl(siteMetadata.siteLogo),
        sameAs: siteMetadata.sameAs?.length
            ? siteMetadata.sameAs
            : [siteMetadata.urlFanpageFacebook],
    };
}

type OgImage =
    | string
    | {
          "@type": string;
          url: string;
      }[];

interface BaseSEOProps {
    title: string;
    description: string;
    keywords: string;
    ogType: string;
    ogImage: OgImage;
    twImage: string;
    canonicalUrl: string;
    ogUrl: string;
    isHiddenFromSearch?: boolean;
    extraJsonLd?: Record<string, unknown>[];
}

const BaseSEO = ({
    title,
    description,
    keywords,
    ogType,
    ogImage,
    twImage,
    canonicalUrl,
    ogUrl,
    isHiddenFromSearch,
    extraJsonLd = [],
}: BaseSEOProps) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <link rel="manifest" href="/manifest.json" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="canonical" href={canonicalUrl} />
            <meta charSet="utf-8" />
            <meta name="copyright" content={siteMetadata.author} />
            <meta name="application-name" content="Vesmart" />
            <meta property="og:site_name" content={siteMetadata.title} />
            <meta property="og:locale" content={siteMetadata.locale} />
            <meta
                name="robots"
                content={
                    isHiddenFromSearch ? "noindex, follow" : "index, follow"
                }
            />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:type" content={ogType} />
            <meta property="og:description" content={description} />
            <meta property="og:title" content={title} />
            {Array.isArray(ogImage) ? (
                ogImage.map(({ url }) => (
                    <meta property="og:image" content={url} key={url} />
                ))
            ) : (
                <meta property="og:image" content={ogImage} key={ogImage} />
            )}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={siteMetadata.twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={twImage} />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-title" content="Vesmart" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="msapplication-navbutton-color" content="#ffffff" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="black-translucent"
            />
            <meta name="msapplication-starturl" content="/" />
            {extraJsonLd.map((obj, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(obj, null, 2),
                    }}
                />
            ))}
        </Head>
    );
};

interface PageSEOProps {
    title: string;
    description: string;
    imageUrl?: string;
    isHiddenFromSearch?: boolean;
    /** URL đầy đủ hoặc đường dẫn tuyệt đối trên site */
    canonicalUrl?: string;
    keywords?: string;
    breadcrumbs?: BreadcrumbItem[];
    /** Trang chủ: bật LocalBusiness + Organization */
    isHome?: boolean;
}

export const PageSEO = ({
    title,
    description,
    isHiddenFromSearch,
    imageUrl,
    canonicalUrl,
    keywords,
    breadcrumbs,
    isHome = false,
}: PageSEOProps) => {
    const router = useRouter();
    const fullTitle = formatPageTitle(title);
    const base = siteMetadata.siteUrl.replace(/\/$/, "");
    const path = router.asPath || "/";
    const defaultCanonical = `${base}${path.startsWith("/") ? path : `/${path}`}`;
    const resolvedCanonical = canonicalUrl
        ? absUrl(canonicalUrl)
        : defaultCanonical;
    const ogUrl = resolvedCanonical;

    const defaultOg = absUrl(siteMetadata.socialBanner);
    const ogImageResolved = imageUrl ? absUrl(imageUrl) : defaultOg;
    const twImageUrl = ogImageResolved;

    const extraJsonLd: Record<string, unknown>[] = [];
    if (isHome) {
        extraJsonLd.push(localBusinessJsonLd(), organizationJsonLd());
    }
    if (breadcrumbs?.length) {
        extraJsonLd.push(breadcrumbJsonLd(breadcrumbs));
    }

    return (
        <BaseSEO
            title={fullTitle}
            description={description}
            keywords={keywords ?? siteMetadata.defaultKeywords}
            ogType="website"
            ogImage={ogImageResolved}
            twImage={twImageUrl}
            canonicalUrl={resolvedCanonical}
            ogUrl={ogUrl}
            isHiddenFromSearch={isHiddenFromSearch}
            extraJsonLd={extraJsonLd}
        />
    );
};

interface BlogSeoProps {
    title: string;
    author: string;
    url: string;
    images?: string[];

    /** Meta description + mô tả Article JSON-LD (nên 120–160 ký tự, có nội dung thật) */
    summary: string;
    /** Từ khóa bổ sung, ví dụ từ hashtag bài viết */
    keywords?: string;
    /** Thẻ article:tag (Open Graph) */
    articleTags?: string[];
    canonicalUrl?: string;
    isHiddenFromSearch?: boolean;

    createdAt: Date;
    updatedAt: Date;
}

export const BlogSEO = ({
    title,
    author,
    url,
    summary,
    keywords,
    articleTags = [],
    createdAt,
    updatedAt,
    images = [],
    canonicalUrl,
    isHiddenFromSearch,
}: BlogSeoProps) => {
    const publishedAt = new Date(createdAt).toISOString();
    const modifiedAt = new Date(updatedAt || createdAt).toISOString();
    const imagesArr =
        images.length === 0
            ? [siteMetadata.socialBanner]
            : typeof images === "string"
              ? [images]
              : images;

    const featuredImages = imagesArr.map((img) => ({
        "@type": "ImageObject",
        url: absUrl(img),
    }));

    const canonical = canonicalUrl
        ? absUrl(canonicalUrl)
        : absUrl(`/bai-viet/${url}`);

    const authorList = {
        "@type": "Person",
        name: author || "Vesmart",
        url: siteMetadata.siteUrl,
    };

    const metaDescription =
        summary?.trim() && summary.trim().length > 0
            ? summary.trim()
            : siteMetadata.description;

    const metaKeywords = keywords?.trim()
        ? `${keywords.trim()}, ${siteMetadata.defaultKeywords}`
        : siteMetadata.defaultKeywords;

    const articleSchema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${canonical}#article`,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonical,
        },
        url: canonical,
        inLanguage: siteMetadata.language || "vi-VN",
        headline: title,
        image: featuredImages.map((i) => i.url),
        datePublished: publishedAt,
        dateModified: modifiedAt,
        author: authorList,
        publisher: {
            "@type": "Organization",
            name: siteMetadata.author,
            url: siteMetadata.siteUrl,
            logo: {
                "@type": "ImageObject",
                url: absUrl(siteMetadata.siteLogo),
            },
        },
        description: metaDescription,
    };

    if (articleTags.length > 0) {
        articleSchema.keywords = articleTags.slice(0, 15).join(", ");
    }

    const crumbs: BreadcrumbItem[] = [
        { name: "Trang chủ", href: "/" },
        { name: "Bài viết", href: "/bai-viet" },
        { name: title, href: `/bai-viet/${url}` },
    ];

    const twImageUrl = featuredImages[0].url;
    const fullTitle = formatPageTitle(title);

    return (
        <>
            <BaseSEO
                title={fullTitle}
                description={metaDescription}
                keywords={metaKeywords}
                ogType="article"
                ogImage={featuredImages}
                twImage={twImageUrl}
                canonicalUrl={canonical}
                ogUrl={canonical}
                isHiddenFromSearch={isHiddenFromSearch}
                extraJsonLd={[articleSchema, breadcrumbJsonLd(crumbs)]}
            />
            <Head>
                <meta property="article:author" content={author || siteMetadata.author} />
                <meta property="article:section" content="Bài viết" />
                {articleTags.slice(0, 12).map((tag, i) => (
                    <meta
                        property="article:tag"
                        content={tag}
                        key={`${tag}-${i}`}
                    />
                ))}
                {createdAt && (
                    <meta
                        property="article:published_time"
                        content={publishedAt}
                    />
                )}
                {updatedAt && (
                    <meta
                        property="article:modified_time"
                        content={modifiedAt}
                    />
                )}
            </Head>
        </>
    );
};

interface ProductSeoProps {
    title: string;
    summary: string;
    images?: ImageTypes[];
    canonicalUrl?: string;
    isHiddenFromSearch?: boolean;
    createdAt: Date;
    updatedAt: Date;
    brand?: string;
    productUrlPath: string;
}

export const ProductSEO = ({
    title,
    summary,
    createdAt,
    updatedAt,
    images = [],
    canonicalUrl,
    isHiddenFromSearch,
    brand,
    productUrlPath,
}: ProductSeoProps) => {
    const imagesArr =
        images.length === 0
            ? [{ url: absUrl(siteMetadata.socialBanner) }]
            : images.map((img) => ({
                  url: img.url.startsWith("http")
                      ? img.url
                      : absUrl(img.url),
              }));

    const featuredImages = imagesArr.map((img) => ({
        "@type": "ImageObject",
        url: img.url,
    }));

    const canonical = canonicalUrl
        ? absUrl(canonicalUrl)
        : absUrl(productUrlPath);

    const productSchema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: title,
        description: summary,
        image: featuredImages.map((i) => i.url),
        url: canonical,
    };
    if (brand) {
        productSchema.brand = {
            "@type": "Brand",
            name: brand,
        };
    }

    const crumbs: BreadcrumbItem[] = [
        { name: "Trang chủ", href: "/" },
        { name: "Sản phẩm", href: "/" },
        { name: title, href: productUrlPath },
    ];

    const twImageUrl = featuredImages[0].url;
    const fullTitle = formatPageTitle(title);

    return (
        <>
            <BaseSEO
                title={fullTitle}
                description={summary}
                keywords={siteMetadata.defaultKeywords}
                ogType="website"
                ogImage={featuredImages}
                twImage={twImageUrl}
                canonicalUrl={canonical}
                ogUrl={canonical}
                isHiddenFromSearch={isHiddenFromSearch}
                extraJsonLd={[productSchema, breadcrumbJsonLd(crumbs)]}
            />
        </>
    );
};
