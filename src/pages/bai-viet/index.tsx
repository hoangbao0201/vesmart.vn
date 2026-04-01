import { GetServerSideProps, Redirect } from "next";

import { SITE_CONFIG } from "@/configs/site.config";
import PageSeoHead from "@/components/seo/PageSeoHead";
import { getPostListApi, getPostListApiPageFirstCached } from "@/services/post/post.api";
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

const FIRST_PAGE_CACHE_CONTROL =
    "public, s-maxage=300, stale-while-revalidate=86400";
const PAGINATED_CACHE_CONTROL = "private, no-store, must-revalidate";

function firstQueryValue(v: string | string[] | undefined): string | undefined {
    if (v === undefined) return undefined;
    return Array.isArray(v) ? v[0] : v;
}

function parseListQuery(query: { page?: string | string[]; take?: string | string[] }): {
    page: number;
    take: number;
    redirect?: Redirect;
} {
    const pageRaw = firstQueryValue(query.page);
    const takeRaw = firstQueryValue(query.take);

    const takeParsed = takeRaw !== undefined ? Number(takeRaw) : 20;
    const take = Number.isFinite(takeParsed) && takeParsed >= 1 && takeParsed <= 100 ? Math.floor(takeParsed) : 20;

    const pageParsed = pageRaw !== undefined ? Number(pageRaw) : 1;
    const page = Number.isFinite(pageParsed) && pageParsed >= 1 ? Math.floor(pageParsed) : 1;

    if (pageRaw !== undefined && page === 1) {
        const dest = take !== 20 ? `/bai-viet?take=${take}` : "/bai-viet";
        return { page: 1, take, redirect: { destination: dest, permanent: true } };
    }

    return { page, take };
}

export const getServerSideProps: GetServerSideProps<PostListPageProps> = async (ctx) => {
    const { query, resolvedUrl, res } = ctx;

    const parsed = parseListQuery(query);
    if (parsed.redirect) {
        return { redirect: parsed.redirect };
    }

    const { page, take } = parsed;
    const isFirstPage = page === 1;

    if (isFirstPage) {
        res.setHeader("Cache-Control", FIRST_PAGE_CACHE_CONTROL);
    } else {
        res.setHeader("Cache-Control", PAGINATED_CACHE_CONTROL);
    }

    const canonicalPath = resolvedUrl.split("#")[0] || "/bai-viet";

    const postListRes = isFirstPage
        ? await getPostListApiPageFirstCached(take, Order.DESC)
        : await getPostListApi({
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