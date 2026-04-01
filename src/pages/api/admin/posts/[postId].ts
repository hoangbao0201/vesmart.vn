import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { UserRoleEnum } from "../../../../../generated/prisma";
import { authOptions } from "@/lib/auth/auth.config";
import { upsertAdminPostApi } from "@/services/admin/admin.api";
import { IAdminUpsertPostBody } from "@/services/admin/admin.type";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        return res.status(405).json({ success: false, messages: ["Method not allowed"] });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.userId || session.user.role !== UserRoleEnum.ADMIN) {
        return res.status(403).json({ success: false, messages: ["Forbidden"] });
    }

    const postId = req.query.postId;
    if (typeof postId !== "string") {
        return res.status(400).json({ success: false, messages: ["postId không hợp lệ"] });
    }

    const body = req.body as IAdminUpsertPostBody;
    if (!body?.title?.trim() || !body?.slug?.trim() || !body?.content?.trim()) {
        return res.status(400).json({ success: false, messages: ["Thiếu dữ liệu bắt buộc"] });
    }

    try {
        const post = await upsertAdminPostApi({
            body,
            userId: session.user.userId,
            postId,
        });

        return res.status(200).json({
            success: true,
            data: post,
            messages: ["Cập nhật bài viết thành công"],
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Có lỗi xảy ra khi cập nhật bài viết";
        return res.status(500).json({
            success: false,
            messages: [message],
        });
    }
}
