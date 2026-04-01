import { ReactNode } from "react";
import type { GetServerSideProps } from "next";

import MainLayout from "@/components/layouts/MainLayout";
import PostListTemplate from "@/components/modules/PostListTemplate";
import PageSeoHead from "@/components/seo/PageSeoHead";
import { SITE_CONFIG } from "@/configs/site.config";
import { absoluteUrl, breadcrumbJsonLd, buildPageTitle, paginationPrevNextPaths } from "@/lib/seo";
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

const TagArchivePage: NextPageWithLayout<TagArchivePageProps> = ({
    posts,
    meta,
    tagName,
    slugTag,
    canonicalPath,
    pageTitle,
    pageDescription,
}) => {
    const pagination = paginationPrevNextPaths(
        `/the-loai/${slugTag}`,
        meta.page,
        meta.pageCount,
        meta.take,
    );
    const listJsonLd =
        posts.length > 0
            ? {
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  itemListElement: posts.slice(0, 24).map((post, i) => ({
                      "@type": "ListItem",
                      position: (meta.page - 1) * meta.take + i + 1,
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
                pagination={pagination}
                jsonLd={listJsonLd ? [crumbs, listJsonLd] : crumbs}
            />
            <PostListTemplate posts={posts} meta={meta} tagArchive={{ tagName }} />
        </>
    );
};

export default TagArchivePage;

export const getServerSideProps: GetServerSideProps<TagArchivePageProps> = async (ctx) => {
    const { query, resolvedUrl, params } = ctx;
    const slugTag = typeof params?.slugTag === "string" ? params.slugTag : "";
    if (!slugTag) {
        return { notFound: true };
    }

    const page = query.page ? Number(query.page) : 1;
    const take = query.take ? Number(query.take) : 20;
    const canonicalPath = resolvedUrl.split("#")[0] || `/the-loai/${slugTag}`;

    const listRes = await getPostListByTagSlugApi({
        query: { slugTag, page, take, order: Order.DESC },
    });

    if (!listRes) {
        return { notFound: true };
    }

    const { posts, meta, tagName } = listRes;

    const pageTitle = buildPageTitle(
        meta.page > 1 ? `Thể loại: ${tagName} — Trang ${meta.page}` : `Thể loại: ${tagName}`,
    );
    const pageDescription = `Đọc ${meta.itemCount} bài viết gắn thẻ “${tagName}” — ${SITE_CONFIG.description}`;

    return {
        props: {
            meta: JSON.parse(JSON.stringify(meta)),
            posts: JSON.parse(JSON.stringify(posts)),
            tagName,
            slugTag,
            canonicalPath,
            pageTitle,
            pageDescription,
        },
    };
};

TagArchivePage.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
