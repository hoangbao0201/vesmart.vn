import { type ReactNode } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";

import MainLayout from "@/components/layouts/MainLayout";
import PostListTemplate from "@/components/modules/PostListTemplate";
import PageSeoHead from "@/components/seo/PageSeoHead";
import { LIST_PAGE_SIZE } from "@/configs/list-infinite.config";
import { SITE_CONFIG } from "@/configs/site.config";
import { absoluteUrl, breadcrumbJsonLd, buildPageTitle } from "@/lib/seo";
import { pageMetaToPlain } from "@/lib/page-meta-to-plain";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";
import { getPostListByTagSlugApi } from "@/services/post/post.api";
import { IGetPostList } from "@/services/post/post.type";
import { Order } from "@/services/prisma-select/prisma-select-config";

import { NextPageWithLayout } from "../_app";

interface TagArchivePageProps {
    meta: PageOptionsMapper;
    posts: IGetPostList[];
    tagName: string;
    slugTag: string;
    canonicalPath: string;
    pageTitle: string;
    pageDescription: string;
}

const PUBLIC_POSTS_BY_TAG_API = "/api/public/posts-by-tag";

const TagArchivePage: NextPageWithLayout<TagArchivePageProps> = ({
    posts,
    meta,
    tagName,
    slugTag,
    canonicalPath,
    pageTitle,
    pageDescription,
}) => {
    const listJsonLd =
        posts.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  itemListElement: posts.slice(0, 24).map((post, i) => ({
                      "@type": "ListItem",
                      position: i + 1,
                      url: absoluteUrl(`/bai-viet/${post.slug}`),
                      name: post.title,
                  })),
              }
            : null;

    const crumbs = breadcrumbJsonLd([
        { name: "Trang chủ", path: "/" },
        { name: "Bài viết", path: "/bai-viet" },
        { name: tagName },
    ]);

    return (
        <>
            <PageSeoHead
                title={pageTitle}
                description={pageDescription}
                canonicalUrl={canonicalPath}
                ogImage="/static/images/banners/banner-1.jpg"
                ogImageDimensions={{ width: 1200, height: 630 }}
                ogImageAlt={`Thể loại ${tagName} — ${SITE_CONFIG.name}`}
                ogType="website"
                jsonLd={listJsonLd ? [crumbs, listJsonLd] : crumbs}
            />
            <PostListTemplate
                posts={posts}
                meta={meta}
                tagArchive={{ tagName }}
                infinite={{
                    apiPath: PUBLIC_POSTS_BY_TAG_API,
                    metaPlain: pageMetaToPlain(meta),
                    extraQuery: { slugTag },
                }}
            />
        </>
    );
};

export default TagArchivePage;

interface Params extends ParsedUrlQuery {
    slugTag: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
    paths: [],
    fallback: "blocking",
});

export const getStaticProps: GetStaticProps<TagArchivePageProps, Params> = async ({ params }) => {
    const slugTag = typeof params?.slugTag === "string" ? params.slugTag : "";
    if (!slugTag) {
        return { notFound: true };
    }

    const canonicalPath = `/the-loai/${slugTag}`;

    const listRes = await getPostListByTagSlugApi({
        query: { slugTag, page: 1, take: LIST_PAGE_SIZE, order: Order.DESC },
    });

    if (!listRes) {
        return { notFound: true };
    }

    const { posts, meta, tagName } = listRes;

    const pageTitle = buildPageTitle(`Thể loại: ${tagName}`);
    const pageDescription = `Đọc ${meta.itemCount} bài viết gắn thẻ “${tagName}” — ${SITE_CONFIG.description}`;

    return {
        props: JSON.parse(
            JSON.stringify({
                meta,
                posts,
                tagName,
                slugTag,
                canonicalPath,
                pageTitle,
                pageDescription,
            }),
        ),
        revalidate: 300,
    };
};

TagArchivePage.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
