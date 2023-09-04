import prismaService from "@/lib/prismaService";
import orderService from "@/serverless/order.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { name, phone, adress, code, description, products } = req.body;

        // const order = await prismaService.order.create({
        //     data: {
        //         name: name,
        //         adress: adress,
        //         phone: phone,
        //         code: code,
        //         description: description,
        //         products: {
        //             connect: products.map((productId: string) => {
        //                 return (
        //                     { id: productId }
        //                 )
        //             })
        //         }
        //     }
        // })

        const order = await orderService.delete("64f09882099544502962a5cf");

        return res.status(200).json({
            success: true,
            order: order,
            // data: {
            //     name: name,
            //     adress: adress,
            //     phone: phone,
            //     code: code,
            //     description: description,
            //     products: products.map((productId: string) => {
            //             return (
            //                 { id: productId }
            //             )
            //         })
            // }
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
