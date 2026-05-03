import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { UserRoleEnum } from "../../../../../generated/prisma";
import { authOptions } from "@/lib/auth/auth.config";
import { deleteAdminImageApi } from "@/services/admin/admin.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ success: false, messages: ["Method not allowed"] });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.userId || session.user.role !== UserRoleEnum.ADMIN) {
        return res.status(403).json({ success: false, messages: ["Forbidden"] });
    }

    const imageId = req.query.imageId;
    if (typeof imageId !== "string" || !imageId.trim()) {
        return res.status(400).json({ success: false, messages: ["imageId không hợp lệ"] });
    }

    try {
        const image = await deleteAdminImageApi({ imageId });
        return res.status(200).json({
            success: true,
            data: image,
            messages: ["Xóa ảnh thành công"],
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Có lỗi xảy ra khi xóa ảnh";
        return res.status(500).json({
            success: false,
            messages: [message],
        });
    }
}
