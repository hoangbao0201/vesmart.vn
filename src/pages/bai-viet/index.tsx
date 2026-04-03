import { type ReactNode } from "react";
import { GetStaticProps } from "next";

import { SITE_CONFIG } from "@/configs/site.config";
import PageSeoHead from "@/components/seo/PageSeoHead";
import { getPostListApi } from "@/services/post/post.api";
import { IGetPostList } from "@/services/post/post.type";
import MainLayout from "@/components/layouts/MainLayout";
import PostListTemplate from "@/components/modules/PostListTemplate";
import { Order } from "@/services/prisma-select/prisma-select-config";
import { LIST_PAGE_SIZE } from "@/configs/list-infinite.config";
import { absoluteUrl, breadcrumbJsonLd, buildPageTitle } from "@/lib/seo";
import { pageMetaToPlain } from "@/lib/page-meta-to-plain";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";

interface PostListPageProps {
    meta: PageOptionsMapper;
    posts: IGetPostList[];
    canonicalPath: string;
    pageTitle: string;
    pageDescription: string;
}

const PUBLIC_POSTS_API = "/api/public/posts";

const PostListPage = ({ posts, meta, canonicalPath, pageTitle, pageDescription }: PostListPageProps) => {
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
        { name: "Bài viết" },
    ]);

    return (
        <>
            <PageSeoHead
                title={pageTitle}
                description={pageDescription}
                canonicalUrl={canonicalPath}
                ogImage="/static/images/banners/banner-1.jpg"
                ogImageDimensions={{ width: 1200, height: 630 }}
                ogImageAlt={`${SITE_CONFIG.name} — tin tức và bài viết`}
                ogType="website"
                jsonLd={listJsonLd ? [crumbs, listJsonLd] : crumbs}
            />
            <PostListTemplate
                posts={posts}
                meta={meta}
                infinite={{ apiPath: PUBLIC_POSTS_API, metaPlain: pageMetaToPlain(meta) }}
            />
        </>
    );
};

export default PostListPage;

export const getStaticProps: GetStaticProps<PostListPageProps> = async () => {
    const canonicalPath = "/bai-viet";

    const postListRes = await getPostListApi({
        query: { page: 1, take: LIST_PAGE_SIZE, order: Order.DESC },
    });
    if (!postListRes) {
        const emptyMeta = new PageOptionsMapper({ page: 1, take: LIST_PAGE_SIZE, itemCount: 0 });
        const pageTitle = buildPageTitle("Bài viết");
        return {
            props: {
                meta: JSON.parse(JSON.stringify(emptyMeta)),
                posts: [],
                canonicalPath,
                pageTitle,
                pageDescription: `Tin tức, mẹo sử dụng và cập nhật từ ${SITE_CONFIG.name}. ${SITE_CONFIG.description}`,
            },
            revalidate: 300,
        };
    }
    const { posts, meta } = postListRes;

    const pageTitle = buildPageTitle("Bài viết");
    const pageDescription = `Đọc ${meta.itemCount} bài viết về robot hút bụi, smart home và dịch vụ sửa chữa tại ${SITE_CONFIG.name}.`;

    return {
        props: {
            meta: JSON.parse(JSON.stringify(meta)),
            posts: JSON.parse(JSON.stringify(posts)),
            canonicalPath,
            pageTitle,
            pageDescription,
        },
        revalidate: 300,
    };
};

PostListPage.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
