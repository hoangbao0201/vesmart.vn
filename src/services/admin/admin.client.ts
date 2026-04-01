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
