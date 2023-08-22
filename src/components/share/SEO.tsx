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

    const ldJsonWeb1 = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Công Ty cổ Phần Vesmart",
        image: "https://vesmart.vn/favicon.ico",
        "@id": "https://vesmart.vn/favicon.ico",
        url: siteMetadata.siteUrl,
        address: {
            "@type": "PostalAddress",
            streetAddress: siteMetadata.address,
            addressLocality: "Đà nẵng",
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
        sameAs: siteMetadata.urlFanpageFacebook,
    };
    const ldJsonWeb2 = {
        "@context": "https://schema.org",
        "@type": "Organization",
        url: "https://vesmart.vn",
        name: "Công Ty cổ Phần Vesmart",
        logo: "https://vesmart.vn/favicon.ico",
    };
    const ldJsonBreadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "vesmart.vn",
                item: "https://vesmart.vn/",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: title,
            },
        ],
    };

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="manifest" href="/manifest.json" />
            <link rel="icon" href="/favicon.ico"></link>
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


            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(ldJsonWeb1, null, 2),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(ldJsonWeb2, null, 2),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(ldJsonBreadcrumbList, null, 2),
                }}
            />

            
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

        // Test
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            bestRating: "5",
            ratingCount: "6",
        },
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


// const ldJsonWeb3 = {
//     "@context": "https://schema.org/",
//     "@type": "Person",
//     name: "Vesmart",
//     //   "url": "https://toplist.vn//tac-gia/thịnh-nguyễn-sỹ-79223/",
//     //   "image": "https://toplist.vn/images/avatars/79223.jpg",
//     jobTitle: "Copywriter",
//     worksFor: {
//         "@type": "Organization",
//         name: "Công Ty cổ Phần Vesmart",
//     },
// };
// const ldJsonWeb4 = {
//     "@context": "https://schema.org",
//     "@type": "ItemList",
//     itemListElement: [
//         "Danke Clean Đà Nẵng",
//         "Smart Tech Đà Nẵng",
//         "TSmart Home Đà Nẵng",
//     ],
//     itemListOrder: "https://schema.org/ItemListOrderDescending",
//     name: "Top 3 Địa chỉ sửa chữa các loại robot hút bụi uy tín nhất Đà Nẵng ",
//     numberOfItems: "3",
// };
// const ldJsonWeb5 = {
//     "@context": "https://schema.org/",
//     "@type": "CreativeWorkSeries",
//     name: "Top 3 Địa chỉ sửa chữa các loại robot hút bụi uy tín nhất Đà Nẵng ",
//     aggregateRating: {
//         "@type": "AggregateRating",
//         ratingValue: "4.9",
//         bestRating: "5",
//         ratingCount: "10",
//     },
// };
