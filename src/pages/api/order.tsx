import prismaService from "@/lib/prismaService";
import orderService from "@/serverless/order.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { name, phone, adress, code = "", description = "", productsOrder } = req.body;

        if(!name || !phone || !adress || !productsOrder) {
            return res.status(400).json({
                success: false,
                message: "Data not found",
                body: req.body
            })
        }

        // @ts-ignore
        const order = await orderService.createOrder({
            name: name,
            phone: phone,
            adress: adress,
            code: code,
            description: description,
            productsOrder: productsOrder
        });

        return res.status(200).json({
            success: true,
            order: order,
        })
    }
    if(req.method === "GET") {
        const orderRes = await orderService.findAll("")
        return res.status(200).json(orderRes)
    }
    else {
        res.status(500).json({ success: false, error: 'failed to load data' })
    }
}
