
import prisma from "@/lib/prisma";
import { PageOptionsMapper } from "../mappers/page-options.mapper";
import { SelectContext, SelectRole } from "../prisma-select/prisma-select-config";
import { ICreateOrderBody, ICreateOrderResponse, IGetOrderListQuery, IGetOrderListResponse } from "./order.type";
import { OrderV2SelectConfig } from "../prisma-select/order-select";

export const createOrderApi = async ({ body }: { body: ICreateOrderBody }): Promise<ICreateOrderResponse | null> => {
    try {
        const result = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!result.ok) {
            return null;
        }

        return result.json();
    } catch {
        return null;
    }
}

export const getOrderListApi = async ({ query }: { query: IGetOrderListQuery }): Promise<IGetOrderListResponse | null> => {
    try {
        const { page, take } = query;

        const select = OrderV2SelectConfig(SelectContext.LIST, SelectRole.ADMIN);
        const [orders, count] = await prisma.$transaction([
            prisma.orderV2.findMany({
                skip: (page - 1) * take,
                take: take,
                select: select,
            }),
            prisma.orderV2.count({}),
        ]);
        if (!orders) {
            return null;
        }

        const meta = new PageOptionsMapper({ page, take, itemCount: count });
        return {
            orders,
            meta,
        };
    } catch {
        return null;
    }
}