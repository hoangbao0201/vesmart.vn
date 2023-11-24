import prismaService from "@/lib/prismaService";
import orderService from "@/serverless/order.service";
import productService from "@/serverless/product.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET") {
        // const orderRes = await productService.findAll("")
        // return res.status(200).json(orderRes)
        const { search = "" } = req.query;
        const products = await productService.searchProduct(search as string);

        return res.status(200).json(products)
    }
    else {
        res.status(500).json({ success: false, error: 'failed to load data' })
    }
}
