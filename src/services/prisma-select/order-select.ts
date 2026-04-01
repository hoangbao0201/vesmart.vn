

// ============================================================================
// LIST CONTEXT
// ============================================================================

import { Prisma } from "../../../generated/prisma";
import { SelectContext, SelectRole } from "./prisma-select-config";

const listGuest = {
} as const satisfies Prisma.OrderV2Select;

const listCreator = {
    ...listGuest,
} as const satisfies Prisma.OrderV2Select;

const listAdmin = {
    ...listCreator,

    orderId: true,
    status: true,
    paymentStatus: true,
    paymentMethod: true,
    subtotal: true,
    shippingFee: true,
    discount: true,
    total: true,
    createdAt: true,
    updatedAt: true,
    user: {
        select: {
            name: true,
            userId: true,
        },
    },
    items: {
        select: {
            orderItemId: true,
            productName: true,
            variantAttributes: true,
            unitPrice: true,
            discountPercent: true,
            quantity: true,
            subtotal: true,
            productVariant: {
                select: {
                    productVariantId: true,
                    product: {
                        select: {
                            productId: true,
                            name: true,
                            images: {
                                select: {
                                    image: {
                                        select: {
                                            url: true,
                                            width: true,
                                            height: true,
                                            dominantColor: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    shippingName: true,
    shippingNote: true,
    shippingPhone: true,
    shippingEmail: true,
    shippingAddress: true,
} as const satisfies Prisma.OrderV2Select;

// ============================================================================
// DETAIL CONTEXT
// ============================================================================

const detailGuest = {

} as const satisfies Prisma.OrderV2Select;

const detailCreator = {
    ...detailGuest,
} as const satisfies Prisma.OrderV2Select;

const detailAdmin = {
    ...detailCreator,
} as const satisfies Prisma.OrderV2Select;

// ============================================================================
// EXPORT CONFIGURATION
// ============================================================================

const selectMap = {
    [SelectContext.LIST]: {
        [SelectRole.GUEST]: listGuest,
        [SelectRole.ADMIN]: listAdmin,
    },
    [SelectContext.DETAIL]: {
        [SelectRole.GUEST]: detailGuest,
        [SelectRole.ADMIN]: detailAdmin,
    },
} as const;

export type OrderV2SelectConfigType = typeof selectMap;

export function OrderV2SelectConfig<
    C extends keyof typeof selectMap,
    R extends keyof typeof selectMap[C]
>(context: C, role: R) {
    return selectMap[context][role];
}