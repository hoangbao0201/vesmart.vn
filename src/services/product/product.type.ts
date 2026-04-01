// import { IPageOptions } from "../prisma-select";
// import { PageOptionsMapper } from "../mappers/page-options.mapper";

import { PageOptionsMapper } from "../mappers/page-options.mapper";
import { IPageOptions } from "../prisma-select/prisma-select-config";


// ============================================
// PRODUCT DETAIL TYPE
// ============================================

export interface IGetProductDetailParam { productId: string; }
export type IGetProductDetail = {
    productId: string;
    name: string;
    slug: string;
    generalInfo: string | null;
    promotionContent: string | null;
    warrantyContent: string | null;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: {
        userId: string;
        name: string;
        avatar: {
            image: {
                url: string;
                width: number | null;
                height: number | null;
                dominantColor: string | null;
            } | null;
        } | null;
    } | null;
    images: Array<{
        image: {
            url: string;
            width: number | null;
            height: number | null;
            dominantColor: string | null;
        } | null;
    }>;
    metas: Array<{
        meta: {
            metaId: string;
            name: string;
            type: string;
        };
    }>;
    variants: Array<{
        productVariantId: string;
        price: number;
        quantity: number;
        discountPercent: number;
        images: Array<{
            image: {
                url: string;
            } | null;
        }>;
        optionValues: Array<{
            productOptionValue: {
                value: string;
                slug: string;
                productOptionId: string;
            };
        }>;
    }>;
    options: Array<{
        productOptionId: string;
        name: string;
        slug: string;
        values: Array<{
            productOptionValueId: string;
            value: string;
            slug: string;
        }>;
    }>;
}
export type IGetProductDetailResponse = {
    product: IGetProductDetail;
}

// ============================================
// PRODUCT LIST TYPE
// ============================================

export interface IGetProductListQuery extends IPageOptions { }
export type IGetProductList = {
    productId: string;
    name: string;
    slug: string;
    generalInfo: string | null;
    promotionContent: string | null;
    warrantyContent: string | null;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: {
        userId: string;
        name: string;
        avatar: {
            image: {
                url: string;
                width: number | null;
                height: number | null;
                dominantColor: string | null;
            } | null;
        } | null;
    } | null;
    images: Array<{
        image: {
            url: string;
            width: number | null;
            height: number | null;
            dominantColor: string | null;
        } | null;
    }>;
    variants: Array<{
        productVariantId: string;
        price: number;
        quantity: number;
        discountPercent: number;
        images: Array<{
            image: {
                url: string;
            } | null;
        }>;
        optionValues: Array<{
            productOptionValue: {
                value: string;
                slug: string;
                productOptionId: string;
            };
        }>;
    }>;
};
export type IGetProductListResponse = {
    products: IGetProductList[];
    meta: PageOptionsMapper;
}