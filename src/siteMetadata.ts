const siteMetadata = {
    title: "Vesmart",
    author: "Vesmart",
    headerTitle: "Vesmart",
    phone: "0971183153",
    description:
        "Chuyên trang điện tử hàng đầu Việt Nam, cung cấp các sản phẩm điện tử chất lượng, thông tin cập nhật nhanh chóng về ngành công nghiệp, dịch vụ tư vấn và hỗ trợ chuyên sâu. Nơi chia sẻ và đăng tải bài viết, đánh giá về các sản phẩm mới nhất trên thị trường.",
    language: "vi-VN",
    theme: "light",
    siteUrl: "https://vesmart.vn",
    siteRepo: "https://github.com/hoangbao0201/VESMART.VN",
    siteLogo: "/static/images/logo-vesmart.png",
    image: "/static/images/avatar.png",
    socialBanner: "/static/images/thumbnail.png",
    github: "https://github.com/hoangbao0201",
    twitter: "https://twitter.com/bytomray",
    locale: "vi-VN",
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
