import { PageOptionsMapper } from "../mappers/page-options.mapper";
import { IPageOptions } from "../prisma-select/prisma-select-config";


// ============================================
// POST DETAIL TYPE
// ============================================

export interface IGetPostDetailParam { slug: string; }
export type IGetPostDetail = {
    postId: string;
    slug: string;
    title: string;
    content: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: {
        userId: string;
        name: string;
        avatar: {
            image: {
                url: string;
                width: number;
                height: number;
                dominantColor: string | null;
            } | null;
        } | null;
    };
    images: {
        image: {
            url: string;
            width: number;
            height: number;
            dominantColor: string | null;
        } | null;
    }[];
    tags: {
        name: string;
    }[];
    products: {
        product: {
            name: string;
            images: {
                image: {
                    url: string;
                    width: number;
                    height: number;
                    dominantColor: string | null;
                } | null;
            }[];
        };
    }[];
}
export type IGetPostDetailResponse = {
    post: IGetPostDetail;
}

// ============================================
// POST LIST TYPE
// ============================================

export type IGetPostListQuery = IPageOptions;
export type IGetPostList = {
    postId: string;
    slug: string;
    title: string;
    content: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: {
        userId: string;
        name: string;
        avatar: {
            image: {
                url: string;
                width: number;
                height: number;
                dominantColor: string | null;
            } | null;
        } | null;
    };
    images: {
        image: {
            url: string;
            width: number;
            height: number;
            dominantColor: string | null;
        } | null;
    }[];
    tags: {
        metaId: string;
        name: string;
    }[];
}
export type IGetPostListResponse = {
    posts: IGetPostList[];
    meta: PageOptionsMapper;
}

/** Danh sách bài theo thẻ (slug URL trong /the-loai/[slugTag]). */
export type IGetPostListByTagQuery = IGetPostListQuery & {
    slugTag: string;
};

export type IGetPostListByTagResponse = {
    posts: IGetPostList[];
    meta: PageOptionsMapper;
    /** Tên thẻ đúng trong DB (hiển thị UI) */
    tagName: string;
};

// ============================================
// ADMIN POST API TYPE
// ============================================

export interface IApiResponseMeta {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
}

export interface IApiResponse<T> {
    success: boolean;
    data: T;
    messages: string[];
    meta?: IApiResponseMeta;
}

export interface IGetPostDetailByIdParam {
    postId: string;
}

export interface IUpsertPostBody {
    title: string;
    slug: string;
    content: string;
    description?: string | null;
    userId?: string;
}