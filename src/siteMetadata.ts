const envSite =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL
        ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
        : "";

const siteMetadata = {
    name: "Vesmart",
    title: "Vesmart",
    defaultTitle: "VESMART - Điện tử & robot hút bụi Đà Nẵng",
    titleTemplate: "%s | VESMART",
    author: "Vesmart",
    headerTitle: "Vesmart",
    urlFanpageFacebook: "https://www.facebook.com/vesmart.vn",
    latitude: "16.06253629796978",
    longitude: "108.21405804198795",
    phone: "0971183153",
    address:
        "105 Nguyễn Hoàng – Hải Châu – Đà Nẵng hoặc 135 Nguyễn Hoàng – Hải Châu – Đà Nẵng",
    description:
        "Chuyên trang điện tử hàng đầu Việt Nam, cung cấp các sản phẩm điện tử chất lượng, thông tin cập nhật nhanh chóng về ngành công nghiệp, dịch vụ tư vấn và hỗ trợ chuyên sâu. Nơi chia sẻ và đăng tải bài viết, đánh giá về các sản phẩm mới nhất trên thị trường.",
    defaultKeywords:
        "vesmart, robot hút bụi, sửa chữa robot hút bụi, Đà Nẵng, điện tử, phụ kiện robot, dịch vụ sửa chữa",
    language: "vi-VN",
    theme: "light",
    /** Dùng NEXT_PUBLIC_SITE_URL trên staging; production: https://vesmart.vn */
    siteUrl: envSite || "https://vesmart.vn",
    siteRepo: "https://github.com/hoangbao0201/VESMART.VN",
    siteLogo: "/static/images/logo-vesmart.png",
    image: "/static/images/avatar.png",
    socialBanner: "/static/images/thumbnail.png",
    github: "https://github.com/hoangbao0201",
    twitter: "https://twitter.com/bytomray",
    /** Dùng cho Organization / sameAs */
    sameAs: [
        "https://www.facebook.com/vesmart.vn",
        "https://github.com/hoangbao0201",
    ] as string[],
    locale: "vi_VN",
    analytics: {
        plausibleDataDomain: "",
        simpleAnalytics: false,
        umamiWebsiteId: "",
        googleAnalyticsId: "",
    },
    newsletter: {
        provider: "buttondown",
    },
    comment: {
        provider: "giscus",
        giscusConfig: {
            repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
            repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
            category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
            categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
            mapping: "pathname",
            reactions: "1",
            metadata: "0",
            theme: "light",
            darkTheme: "transparent_dark",
            themeURL: "",
            position: "top",
        },
        utterancesConfig: {
            repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
            issueTerm: "",
            label: "",
            theme: "",
            darkTheme: "",
        },
        disqusConfig: {
            shortname: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
        },
    },
};

export default siteMetadata;
