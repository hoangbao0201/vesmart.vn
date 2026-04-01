import prisma from "@/lib/prisma";
import { ICreateOrderBody, ICreateOrderResponse } from "./order.type";
import { OrderStatusEnum, PaymentStatusEnum } from "../../../generated/prisma";


export const createOrderService = async ({ body }: { body: ICreateOrderBody }): Promise<ICreateOrderResponse | null> => {
    try {
        const { info, items, userId, paymentMethod } = body;

        // VALIDATE INPUT
        if (!items || items.length === 0) {
            throw new Error("Cart is empty");
        }

        if (!info?.name || !info?.phone || !info?.address) {
            throw new Error("Missing shipping information");
        }

        // GET VARIANTS FROM DB
        const variants = await prisma.productVariantV2.findMany({
            where: {
                productVariantId: {
                    in: items.map((item) => item.variantId),
                },
            },
            select: {
                productVariantId: true,
                price: true,
                quantity: true,
                discountPercent: true,
                product: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        // MAP FOR LOOKUP IN O(1)
        const variantMap = new Map(
            variants.map((v) => [
                v.productVariantId,
                {
                    price: v.price,
                    stock: v.quantity,
                    discount: v.discountPercent ?? 0,
                    productName: v.product.name,
                },
            ])
        );

        // VALIDATE + CALCULATE SUBTOTAL
        let subtotal = 0;

        const calcSubtotal = (price: number, quantity: number, discount = 0) => {
            return price * quantity * (1 - discount / 100);
        };

        const orderItemsData = items.map((item) => {
            const variant = variantMap.get(item.variantId);

            if (!variant) {
                throw new Error(`Variant ${item.variantId} not found`);
            }

            if (item.quantity <= 0) {
                throw new Error("Invalid quantity");
            }

            if (item.quantity > variant.stock) {
                throw new Error(`Not enough stock for ${variant.productName}`);
            }

            const itemSubtotal = calcSubtotal(
                variant.price,
                item.quantity,
                variant.discount
            );

            subtotal += itemSubtotal;

            return {
                productVariantId: item.variantId,
                productName: variant.productName,
                quantity: item.quantity,
                unitPrice: variant.price,
                discountPercent: variant.discount,
                subtotal: itemSubtotal,
                variantAttributes: JSON.stringify(item.selectedOptions ?? []),
            };
        });

        // CAN BE EXPANDED LATER
        const shippingFee = 0;
        const discount = 0;
        const total = subtotal + shippingFee - discount;

        // TRANSACTION TO ENSURE DATA INTEGRITY
        const result = await prisma.$transaction(async (tx) => {
            // 1. CREATE ORDER
            const order = await tx.orderV2.create({
                data: {
                    ...(userId && {
                        user: { connect: { userId } },
                    }),

                    shippingName: info.name,
                    shippingPhone: info.phone,
                    shippingAddress: info.address,

                    subtotal,
                    shippingFee,
                    discount,
                    total,

                    paymentMethod,
                    status: OrderStatusEnum.PENDING,
                    paymentStatus: PaymentStatusEnum.PENDING,

                    items: {
                        create: orderItemsData.map((item) => ({
                            productVariant: {
                                connect: {
                                    productVariantId: item.productVariantId,
                                },
                            },
                            productName: item.productName,
                            quantity: item.quantity,
                            unitPrice: item.unitPrice,
                            discountPercent: item.discountPercent,
                            subtotal: item.subtotal,
                            variantAttributes: item.variantAttributes,
                        })),
                    },
                },
                select: {
                    orderId: true,
                },
            });

            // 2. SUBTRACT STOCK
            for (const item of orderItemsData) {
                await tx.productVariantV2.update({
                    where: {
                        productVariantId: item.productVariantId,
                    },
                    data: {
                        quantity: {
                            decrement: item.quantity,
                        },
                    },
                });
            }

            return order;
        });

        if (!result) {
            return null;
        }

        return { success: true, orderId: result.orderId };
    } catch (error) { return null; }
}