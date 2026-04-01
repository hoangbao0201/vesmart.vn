import type { NextApiRequest, NextApiResponse } from "next";
import { createOrderService } from "@/services/order/order.service";
import { ICreateOrderBody, ICreateOrderResponse } from "@/services/order/order.type";

type OrderApiError = {
    success: false;
    messages: string[];
};

type OrderApiResponse = ICreateOrderResponse | OrderApiError;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<OrderApiResponse>,
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({
            success: false,
            messages: ["Method Not Allowed"],
        });
    }

    try {
        const body = req.body as ICreateOrderBody;
        const result = await createOrderService({ body });

        if (!result) {
            return res.status(400).json({
                success: false,
                messages: ["Unable to create order"],
            });
        }

        return res.status(200).json(result);
    } catch {
        return res.status(500).json({
            success: false,
            messages: ["Internal server error"],
        });
    }
}
