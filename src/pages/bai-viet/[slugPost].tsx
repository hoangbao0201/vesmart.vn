import { ReactNode } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import MainLayout from "@/components/layouts/MainLayout";
import PostDetailTemplate from "@/components/modules/PostDetailTemplate";
import PageSeoHead from "@/components/seo/PageSeoHead";
import { SITE_CONFIG } from "@/configs/site.config";
import { absoluteUrl, breadcrumbJsonLd, buildPageTitle, toPlainText } from "@/lib/seo";
import { getPostDetailApi } from "@/services/post/post.api";
import { IGetPostDetail } from "@/services/post/post.type";
import { ParsedUrlQuery } from "querystring";

import { NextPageWithLayout } from "../_app";

interface PostDetailPageProps {
    post: IGetPostDetail;
}

const PostDetailPage: NextPageWithLayout<PostDetailPageProps> = ({ post }) => {
    const path = `/bai-viet/${post.slug}`;
    const title = buildPageTitle(post.title);
    const description =
        toPlainText(post.description, 165) || toPlainText(post.content, 165) || `${post.title} - ${SITE_CONFIG.name}`;

    const heroImg = post.images?.[0]?.image;
    const hero = heroImg?.url;
    const ogImage = hero ?? "/static/images/banners/banner-1.jpg";
    const ogDims =
        heroImg?.width && heroImg?.height
            ? { width: heroImg.width, height: heroImg.height }
            : { width: 1200, height: 630 };

    const published = post.createdAt ? new Date(post.createdAt).toISOString() : undefined;
    const modified = post.updatedAt ? new Date(post.updatedAt).toISOString() : published;

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description,
        image: hero ? [absoluteUrl(hero)] : [absoluteUrl(ogImage)],
        datePublished: published,
        dateModified: modified,
        author: {
            "@type": "Person",
            name: post.user?.name || SITE_CONFIG.name,
        },
        publisher: {
            "@type": "Organization",
            name: SITE_CONFIG.name,
            logo: {
                "@type": "ImageObject",
                url: absoluteUrl(SITE_CONFIG.logo),
            },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    };

    const crumbs = breadcrumbJsonLd([
        { name: "Trang chủ", path: "/" },
        { name: "Bài viết", path: "/bai-viet" },
        { name: post.title },
    ]);

    return (
        <>
            <PageSeoHead
                title={title}
                description={description}
                canonicalUrl={path}
                ogImage={ogImage}
                ogImageDimensions={ogDims}
                ogImageAlt={post.title}
                ogType="article"
                article={
                    published
                        ? {
                              publishedTime: published,
                              modifiedTime: modified,
                              authorName: post.user?.name,
                          }
                        : undefined
                }
                jsonLd={[crumbs, articleJsonLd]}
            />
            <PostDetailTemplate post={post} />
        </>
    );
};

export default PostDetailPage;

interface Params extends ParsedUrlQuery {
    slugPost: string;
}
export const getStaticProps: GetStaticProps<any, Params> = async ({ params }) => {
    const { slugPost } = params!;

    const postDetailRes = await getPostDetailApi({
        param: { slug: slugPost }
    });
    if (!postDetailRes) {
        return { notFound: true };
    }
    const { post } = postDetailRes;

    return {
        props: {
            post: JSON.parse(JSON.stringify(post))
        },
        revalidate: 60 * 60
    }
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

PostDetailPage.getLayout = (page: ReactNode) => {
    return <MainLayout isNavbar={true}>{page}</MainLayout>;
};
