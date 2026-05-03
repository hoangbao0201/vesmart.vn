import { PageOptionsMapper } from "../mappers/page-options.mapper";
import { IGetOrderList } from "../order/order.type";
import { IGetPostList } from "../post/post.type";
import { IPageOptions } from "../prisma-select/prisma-select-config";
import { IGetProductList } from "../product/product.type";
import { IGetPostDetail } from "../post/post.type";

export type IAdminGetPostListQuery = IPageOptions;
export type IAdminGetProductListQuery = IPageOptions;
export type IAdminGetOrderListQuery = IPageOptions;

export interface IAdminGetPostListResponse {
    posts: IGetPostList[];
    meta: PageOptionsMapper;
}

export interface IAdminGetProductListResponse {
    products: IGetProductList[];
    meta: PageOptionsMapper;
}

export interface IAdminGetOrderListResponse {
    orders: IGetOrderList[];
    meta: PageOptionsMapper;
}

export interface IAdminGetPostDetailByIdResponse {
    post: IGetPostDetail;
}

export interface IAdminUpsertPostBody {
    title: string;
    slug: string;
    content: string;
    description?: string | null;
    tags: string[];
    images?: {
        imageId: string;
    }[];
}

export type IAdminGetImageListQuery = IPageOptions;

export interface IAdminImageItem {
    imageId: string;
    url: string;
    width: number | null;
    height: number | null;
    imageType: string | null;
    dominantColor: string | null;
    createdAt: Date;
}

export interface IAdminGetImageListResponse {
    images: IAdminImageItem[];
    meta: PageOptionsMapper;
}

export interface IAdminCreateImageBody {
    url: string;
    width?: number | null;
    height?: number | null;
    imageType?: string | null;
    dominantColor?: string | null;
    source?: string | null;
    description?: string | null;
}
