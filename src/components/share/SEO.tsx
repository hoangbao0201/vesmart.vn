import Head from "next/head";

import { useRouter } from "next/router";
import siteMetadata from "@/siteMetadata";

interface CommonSEOProps {
    title: string;
    description: string;
    ogType: string;
    ogImage:
        | string
        | {
              "@type": string;
              url: string;
          }[];
    twImage: string;
    canonicalUrl?: string;
    isHiddenFromSearch?: boolean;
}

const CommonSEO = ({
    title,
    description,
    ogType,
    ogImage,
    twImage,
    canonicalUrl,
    isHiddenFromSearch,
}: CommonSEOProps) => {
    const router = useRouter();
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="manifest" href="/manifest.json" />
            <meta charSet="utf-8" />
            <meta name="application-name" content="vesmart"></meta>
            <meta property="og:site_name" content={siteMetadata.title} />
            {Array.isArray(ogImage) ? (
                ogImage.map(({ url }) => (
                    <meta property="og:image" content={url} key={url} />
                ))
            ) : (
                <meta property="og:image" content={ogImage} key={ogImage} />
            )}
            <meta
                name="robots"
                content={
                    isHiddenFromSearch ? "noindex, follow" : "follow, index"
                }
            />  
            <meta
                property="og:url"
                content={`${siteMetadata.siteUrl}${router.asPath}`}
            />
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
            <link
                rel="canonical"
                href={
                    canonicalUrl
                        ? canonicalUrl
                        : `${siteMetadata.siteUrl}${router.asPath}`
                }
            />

            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="Vesmart" />
            <meta name="apple-mobile-web-app-title" content="Vesmart" />
            <meta name="theme-color" content="#ffff" />
            <meta name="msapplication-navbutton-color" content="#ffff" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="black-translucent"
            />
            <meta name="msapplication-starturl" content="/" />

        </Head>
    );
};

interface PageSEOProps {
    title: string;
    description: string;
    imageUrl?: string;
    isHiddenFromSearch?: boolean;
}

export const PageSEO = ({
    title,
    description,
    isHiddenFromSearch,
    imageUrl,
}: PageSEOProps) => {
    const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
    const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
    return (
        <CommonSEO
            title={title}
            description={description}
            ogType="website"
            ogImage={imageUrl ? imageUrl : ogImageUrl}
            twImage={imageUrl ? imageUrl : twImageUrl}
            isHiddenFromSearch={isHiddenFromSearch}
        />
    );
};

// export const TagSEO = ({ title, description }: PageSEOProps) => {
//   const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
//   const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
//   const router = useRouter()
//   return (
//     <>
//       <CommonSEO
//         title={title}
//         description={description}
//         ogType="website"
//         ogImage={ogImageUrl}
//         twImage={twImageUrl}
//       />
//       <Head>
//         <link
//           rel="alternate"
//           type="application/rss+xml"
//           title={`${description} - RSS feed`}
//           href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
//         />
//       </Head>
//     </>
//   )
// }

interface BlogSeoProps {
    title: string;
    author: string;
    url: string;
    images?: string[];

    summary: string;
    canonicalUrl?: string;
    isHiddenFromSearch?: boolean;

    createdAt: Date;
    updatedAt: Date;
}

export const BlogSEO = ({
    title,
    author,
    summary,
    createdAt,
    updatedAt,
    url,
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

    const featuredImages = imagesArr.map((img) => {
        return {
            "@type": "ImageObject",
            url: `${siteMetadata.siteUrl}${img}`,
        };
    });

    let authorList = {
        "@type": "Person",
        name: author,
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        headline: title,
        image: featuredImages,
        datePublished: publishedAt,
        dateModified: modifiedAt,
        author: authorList,
        publisher: {
            "@type": "Organization",
            name: siteMetadata.author,
            logo: {
                "@type": "ImageObject",
                url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
            },
        },
        description: summary,
    };

    const twImageUrl = featuredImages[0].url;

    return (
        <>
            <CommonSEO
                title={title}
                description={summary}
                ogType="article"
                ogImage={featuredImages}
                twImage={twImageUrl}
                canonicalUrl={canonicalUrl}
                isHiddenFromSearch={isHiddenFromSearch}
            />
            <Head>
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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData, null, 2),
                    }}
                />
            </Head>
        </>
    );
};
