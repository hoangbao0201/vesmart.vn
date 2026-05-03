import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { UserRoleEnum } from "../../../../../generated/prisma";
import { authOptions } from "@/lib/auth/auth.config";
import { getAdminImageListApi } from "@/services/admin/admin.api";
import { Order } from "@/services/prisma-select/prisma-select-config";

const DEFAULT_TAKE = 24;
const MAX_TAKE = 48;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, messages: ["Method not allowed"] });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.userId || session.user.role !== UserRoleEnum.ADMIN) {
        return res.status(403).json({ success: false, messages: ["Forbidden"] });
    }

    const pageRaw = parseInt(String(req.query.page ?? "1"), 10);
    const takeRaw = parseInt(String(req.query.take ?? String(DEFAULT_TAKE)), 10);
    const page = Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.min(pageRaw, 500) : 1;
    const take = Number.isFinite(takeRaw) && takeRaw >= 1 ? Math.min(takeRaw, MAX_TAKE) : DEFAULT_TAKE;

    const data = await getAdminImageListApi({
        query: { page, take, order: Order.DESC },
    });

    if (!data) {
        return res.status(500).json({ success: false, messages: ["Không thể tải danh sách ảnh"] });
    }

    return res.status(200).json({
        success: true,
        data: data.images,
        meta: data.meta,
    });
}
