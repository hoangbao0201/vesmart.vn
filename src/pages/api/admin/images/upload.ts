import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { UserRoleEnum } from "../../../../../generated/prisma";
import { authOptions } from "@/lib/auth/auth.config";
import { createAdminImageApi } from "@/services/admin/admin.api";

interface UploadBody {
    fileName?: string;
    mimeType?: string;
    fileBase64?: string;
}

interface NaverUploadResponse {
    imageUrl?: string;
    width?: number;
    height?: number;
    imageType?: string;
    dominantColor?: string;
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "20mb",
        },
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, messages: ["Method not allowed"] });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.userId || session.user.role !== UserRoleEnum.ADMIN) {
        return res.status(403).json({ success: false, messages: ["Forbidden"] });
    }

    const body = req.body as UploadBody;
    const fileName = body?.fileName?.trim();
    const mimeType = body?.mimeType?.trim() || "image/jpeg";
    const fileBase64 = body?.fileBase64?.trim();

    if (!fileName || !fileBase64) {
        return res.status(400).json({ success: false, messages: ["Thiếu dữ liệu file upload"] });
    }

    try {
        const buffer = Buffer.from(fileBase64, "base64");
        const formData = new FormData();
        formData.append("image", new Blob([buffer], { type: mimeType }), fileName);
        const naverCookie = process.env.NAVER_UPLOAD_COOKIE?.trim();
        const naverReferer =
            process.env.NAVER_UPLOAD_REFERER?.trim() ||
            "https://shopping.naver.com/window/my/pet-group/profile";
        const naverOrigin = process.env.NAVER_UPLOAD_ORIGIN?.trim() || "https://shopping.naver.com";

        if (!naverCookie) {
            return res.status(500).json({
                success: false,
                messages: ["Thiếu NAVER_UPLOAD_COOKIE trong môi trường server."],
            });
        }

        const uploadResponse = await fetch(
            "https://shopping.naver.com/window/api/image-upload?extractDominantColorYn=Y",
            {
                method: "POST",
                headers: {
                    accept: "application/json, text/plain, */*",
                    "accept-language": "vi,vi-VN;q=0.9,en-US;q=0.8,en;q=0.7",
                    origin: naverOrigin,
                    referer: naverReferer,
                    "user-agent": "Mozilla/5.0",
                    Cookie: naverCookie,
                },
                body: formData,
            }
        );

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            return res.status(502).json({
                success: false,
                messages: [errorText || "Upload ảnh thất bại"],
            });
        }

        const uploadData = (await uploadResponse.json()) as NaverUploadResponse;
        if (!uploadData?.imageUrl) {
            return res.status(502).json({ success: false, messages: ["Không nhận được imageUrl từ server upload"] });
        }

        const image = await createAdminImageApi({
            body: {
                url: uploadData.imageUrl,
                width: uploadData.width ?? null,
                height: uploadData.height ?? null,
                imageType: uploadData.imageType ?? null,
                dominantColor: uploadData.dominantColor ?? null,
                source: "VESMART Storage",
            },
        });

        return res.status(200).json({
            success: true,
            data: image,
            messages: ["Upload ảnh thành công"],
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Có lỗi xảy ra khi upload ảnh";
        return res.status(500).json({ success: false, messages: [message] });
    }
}
