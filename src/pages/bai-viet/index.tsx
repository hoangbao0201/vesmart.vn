import { GetServerSideProps } from "next";

import { SITE_CONFIG } from "@/configs/site.config";
import PageSeoHead from "@/components/seo/PageSeoHead";
import { getPostListApi } from "@/services/post/post.api";
import { IGetPostList } from "@/services/post/post.type";
import MainLayout from "@/components/layouts/MainLayout";
import PostListTemplate from "@/components/modules/PostListTemplate";
import { Order } from "@/services/prisma-select/prisma-select-config";
import { absoluteUrl, breadcrumbJsonLd, buildPageTitle, paginationPrevNextPaths } from "@/lib/seo";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";

interface PostListPageProps {
    meta: PageOptionsMapper;
    posts: IGetPostList[];
    canonicalPath: string;
    pageTitle: string;
    pageDescription: string;
}

const PostListPage = ({ posts, meta, canonicalPath, pageTitle, pageDescription }: PostListPageProps) => {
    const pagination = paginationPrevNextPaths("/bai-viet", meta.page, meta.pageCount, meta.take);

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
        { name: meta.page > 1 ? `Bài viết (trang ${meta.page})` : "Bài viết" },
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
                pagination={pagination}
                jsonLd={listJsonLd ? [crumbs, listJsonLd] : crumbs}
            />
            <PostListTemplate posts={posts} meta={meta} />
        </>
    );
};

export default PostListPage;

export const getServerSideProps: GetServerSideProps<PostListPageProps> = async (ctx) => {
    const { query, resolvedUrl } = ctx;
    const page = query.page ? Number(query.page) : 1;
    const take = query.take ? Number(query.take) : 20;

    const canonicalPath = resolvedUrl.split("#")[0] || "/bai-viet";

    const postListRes = await getPostListApi({
        query: { page, take, order: Order.DESC },
    });
    if (!postListRes) {
        const emptyMeta = new PageOptionsMapper({ page, take, itemCount: 0 });
        const pageTitle = buildPageTitle("Bài viết");
        return {
            props: {
                meta: JSON.parse(JSON.stringify(emptyMeta)),
                posts: [],
                canonicalPath,
                pageTitle,
                pageDescription: `Tin tức, mẹo sử dụng và cập nhật từ ${SITE_CONFIG.name}. ${SITE_CONFIG.description}`,
            },
        };
    }
    const { posts, meta } = postListRes;

    const pageTitle = buildPageTitle(meta.page > 1 ? `Bài viết - Trang ${meta.page}` : "Bài viết");
    const pageDescription = `Đọc ${meta.itemCount} bài viết về robot hút bụi, smart home và dịch vụ sửa chữa tại ${SITE_CONFIG.name}.`;

    return {
        props: {
            meta: JSON.parse(JSON.stringify(meta)),
            posts: JSON.parse(JSON.stringify(posts)),
            canonicalPath,
            pageTitle,
            pageDescription,
        },
    };
};

PostListPage.getLayout = (page: React.ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};