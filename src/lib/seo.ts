import { SITE_CONFIG } from "@/configs/site.config";

/** Ưu tiên NEXT_PUBLIC_SITE_URL (staging/prod) cho canonical, sitemap, JSON-LD. */
export function getPublicSiteUrl(): string {
    return (process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url).replace(/\/$/, "");
}

export function absoluteUrl(pathOrUrl: string): string {
    const base = getPublicSiteUrl();
    if (!pathOrUrl) return base;
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
    return `${base}${path}`;
}

export function productDetailPath(product: { slug: string; productId: string }): string {
    const slugPart = product.slug ? `${product.slug}-` : "";
    return `/san-pham/${slugPart}${product.productId}`;
}

/** Plain text for meta / JSON-LD from HTML or markdown-ish content */
export function toPlainText(raw: string | null | undefined, maxLen = 160): string {
    if (!raw) return "";
    const text = raw
        .replace(/<[^>]*>/g, " ")
        .replace(/[#*_`[\]]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    if (text.length <= maxLen) return text;
    return `${text.slice(0, maxLen - 1).trim()}…`;
}

export function buildPageTitle(pageTitle: string): string {
    const t = pageTitle.trim();
    if (!t) return SITE_CONFIG.name;
    if (t.toLowerCase().includes(SITE_CONFIG.name.toLowerCase())) return t;
    return `${t} | ${SITE_CONFIG.name}`;
}

export type BreadcrumbItem = { name: string; path?: string };

/** rel=prev/next cho trang danh sách có phân trang (đường dẫn bắt đầu bằng /). */
export function paginationPrevNextPaths(
    basePath: string,
    page: number,
    pageCount: number,
    take: number,
): { prevPath?: string; nextPath?: string } {
    if (pageCount <= 1) {
        return {};
    }
    const withQuery = (p: number) => {
        const params = new URLSearchParams();
        if (p > 1) {
            params.set("page", String(p));
        }
        if (take !== 20) {
            params.set("take", String(take));
        }
        const s = params.toString();
        return s ? `${basePath}?${s}` : basePath;
    };
    return {
        prevPath: page > 1 ? withQuery(page - 1) : undefined,
        nextPath: page < pageCount ? withQuery(page + 1) : undefined,
    };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): Record<string, unknown> {
    const list = items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    }));
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: list,
    };
}
