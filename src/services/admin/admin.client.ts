import { IAdminUpsertPostBody } from "./admin.type";

interface IUpsertAdminPostResponse {
    success: boolean;
    data?: {
        postId: string;
        slug: string;
    };
    messages?: string[];
}

export const createAdminPostClientApi = async ({
    body,
}: {
    body: IAdminUpsertPostBody;
}): Promise<IUpsertAdminPostResponse | null> => {
    try {
        const response = await fetch("/api/admin/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return response.json();
    } catch {
        return null;
    }
};

export const updateAdminPostClientApi = async ({
    postId,
    body,
}: {
    postId: string;
    body: IAdminUpsertPostBody;
}): Promise<IUpsertAdminPostResponse | null> => {
    try {
        const response = await fetch(`/api/admin/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return response.json();
    } catch {
        return null;
    }
};

interface IAdminImageItemClient {
    imageId: string;
    url: string;
    width: number | null;
    height: number | null;
    imageType: string | null;
    dominantColor: string | null;
    createdAt: string;
}

interface IAdminImageListClientResponse {
    success: boolean;
    data: IAdminImageItemClient[];
    meta?: {
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
    };
    messages?: string[];
}

interface IAdminUploadImageClientResponse {
    success: boolean;
    data?: IAdminImageItemClient;
    messages?: string[];
}

interface IAdminDeleteImageClientResponse {
    success: boolean;
    data?: {
        imageId: string;
    };
    messages?: string[];
}

const toBase64 = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binary = "";
    const chunkSize = 0x8000;

    for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, i + chunkSize);
        binary += String.fromCharCode(...chunk);
    }

    return btoa(binary);
};

const safeJson = async <T>(response: Response): Promise<T | null> => {
    const text = await response.text();
    if (!text) return null;
    try {
        return JSON.parse(text) as T;
    } catch {
        return null;
    }
};

export const getAdminImageListClientApi = async ({
    page,
    take = 24,
}: {
    page: number;
    take?: number;
}): Promise<IAdminImageListClientResponse | null> => {
    try {
        const response = await fetch(`/api/admin/images?page=${page}&take=${take}`);
        return response.json();
    } catch {
        return null;
    }
};

export const uploadAdminImageClientApi = async ({
    file,
}: {
    file: File;
}): Promise<IAdminUploadImageClientResponse | null> => {
    try {
        const fileBase64 = await toBase64(file);

        const response = await fetch("/api/admin/images/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName: file.name,
                mimeType: file.type,
                fileBase64,
            }),
        });
        const data = await safeJson<IAdminUploadImageClientResponse>(response);
        if (data) {
            return data;
        }
        return {
            success: false,
            messages: ["Không thể đọc phản hồi upload từ server."],
        };
    } catch {
        return null;
    }
};

export const deleteAdminImageClientApi = async ({
    imageId,
}: {
    imageId: string;
}): Promise<IAdminDeleteImageClientResponse | null> => {
    try {
        const response = await fetch(`/api/admin/images/${imageId}`, {
            method: "DELETE",
        });
        const data = await safeJson<IAdminDeleteImageClientResponse>(response);
        if (data) {
            return data;
        }
        return {
            success: false,
            messages: ["Không thể đọc phản hồi xóa ảnh từ server."],
        };
    } catch {
        return null;
    }
};
