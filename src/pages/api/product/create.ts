import prismaService from "@/lib/prismaService";
import orderService from "@/serverless/order.service";
import productService from "@/serverless/product.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { slug, title, brand, description, images, variants, skus, productInformationItems } = req.body;

        // if(!slug || !title || !brand || !description || !images || !variants || !skus || !productInformationItems) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Data not found",
        //         body: req.body
        //     })
        // }

        // @ts-ignore
        const productRes = await productService.createProduct({
            slug, title, brand, description, images, variants, skus, productInformationItems
        })

        return res.status(200).json(productRes);
        // return res.status(200).json({
        //     slug: slug,
        //     title: title,
        //     brand: brand,
        //     description: description,
        //     images: images,
        //     variants: variants,
        //     skus: skus,
        //     productInformationItems: productInformationItems,
        // });
    }
    else {
        res.status(500).json({ success: false, error: 'failed to load data' })
    }
}
