import prismaService from "@/lib/prismaService";
import blogService from "@/serverless/blog.service";
import orderService from "@/serverless/order.service";
import productService from "@/serverless/product.service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { userId, title, slug, thumbnail, description, blogHashtags, content } = req.body;

        // @ts-ignore
        const productRes = await blogService.createBlog(userId, {
            title, slug, thumbnail: thumbnail.length === 0 ? thumbnail : null, description: description.length === 0 ? description : null, blogHashtags, content
        })

        return res.status(200).json(productRes);
        // return res.status(200).json({
        //     userId: userId,
        //     slug: slug,
        //     title: title,
        //     thumbnail: thumbnail,
        //     description: description,
        //     blogHashtags: blogHashtags,
        //     content: content,
        // });
    }
    else {
        res.status(500).json({ success: false, error: 'failed to load data' })
    }
}
