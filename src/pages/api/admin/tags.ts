import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { UserRoleEnum } from "../../../../generated/prisma";
import { authOptions } from "@/lib/auth/auth.config";
import { getAdminTagListApi } from "@/services/admin/admin.api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false, messages: ["Method not allowed"] });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.userId || session.user.role !== UserRoleEnum.ADMIN) {
        return res.status(403).json({ success: false, messages: ["Forbidden"] });
    }

    const tags = await getAdminTagListApi();
    return res.status(200).json({ success: true, data: tags });
}
