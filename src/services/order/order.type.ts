
import { CartItem } from "@/store/cart";
import { PageOptionsMapper } from "../mappers/page-options.mapper";
import { PaymentMethodEnum } from "../../../generated/prisma";
import { IPageOptions } from "../prisma-select/prisma-select-config";

// ============================================
// CREATE ORDER TYPE
// ============================================

export type ICreateOrderParam = Record<string, never>;
export interface ICreateOrderBody {
    userId?: string;
    items?: CartItem[];
    info: {
        name: string;
        phone: string;
        address: string;
    }
    paymentMethod?: PaymentMethodEnum;
}
export type ICreateOrderResponse = {
    success: boolean;
    orderId: string;
    messages?: string[];
}

// ============================================
// GET ORDERS TYPE
// ============================================

export interface IGetOrderListQuery extends IPageOptions {}
export type IGetOrderList = {
    orderId: string;
    status: string;
    paymentStatus: string;
    paymentMethod: PaymentMethodEnum | null;
    subtotal: number;
    shippingFee: number;
    discount: number | null;
    total: number;
    // createdAt: Date;
    // updatedAt: Date;
    user: {
        userId: string;
        name: string;
    } | null;
    items: Array<{
        orderItemId: string;
        productName: string;
        variantAttributes: string | null;
        unitPrice: number;
        discountPercent: number | null;
        quantity: number;
        subtotal: number;
        productVariant: {
            productVariantId: string;
            product: {
                productId: string;
                name: string;
                images: Array<{
                    image: {
                        url: string;
                        width: number | null;
                        height: number | null;
                        dominantColor: string | null;
                    };
                }>;
            };
        };
    }>;
    shippingName: string;
    shippingNote: string | null;
    shippingPhone: string;
    shippingEmail: string | null;
    shippingAddress: string;
};
export interface IGetOrderListResponse {
    orders: IGetOrderList[];
    meta: PageOptionsMapper;
}
