import blogService from "@/serverless/blog.service";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { isAdminEmail } from "@/lib/adminAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT" && req.method !== "PATCH") {
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email || !isAdminEmail(session.user.email)) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { id, title, slug, thumbnail, description, blogHashtags, content, status } = req.body;
    if (!id || typeof id !== "string") {
        return res.status(400).json({ success: false, message: "Missing blog id" });
    }

    const result = await blogService.updateBlog(id, {
        title,
        slug,
        thumbnail: thumbnail ?? null,
        description: description ?? null,
        blogHashtags: Array.isArray(blogHashtags) ? blogHashtags : [],
        content,
        status: status ?? null,
    });

    const statusCode = result.success ? 200 : 400;
    return res.status(statusCode).json(result);
}
