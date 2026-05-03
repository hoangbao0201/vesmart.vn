"use client";

import { ChangeEvent, UIEvent, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
    deleteAdminImageClientApi,
    getAdminImageListClientApi,
    uploadAdminImageClientApi,
} from "@/services/admin/admin.client";
import ConfirmModal from "@/components/share/ConfirmModal";

interface BoxStorageImage {
    imageId: string;
    url: string;
    width: number | null;
    height: number | null;
    imageType: string | null;
    dominantColor: string | null;
    createdAt: string;
}

interface BoxStorageProps {
    onAddImage: (image: BoxStorageImage) => void;
    selectedImageIds?: string[];
}

const TAKE_DEFAULT = 24;

export default function BoxStorage({ onAddImage, selectedImageIds = [] }: BoxStorageProps) {
    const [items, setItems] = useState<BoxStorageImage[]>([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<BoxStorageImage | null>(null);
    const [imageToDelete, setImageToDelete] = useState<BoxStorageImage | null>(null);
    const lockRef = useRef(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const hasMore = page < pageCount;

    const loadImages = useCallback(async (nextPage: number, append: boolean) => {
        if (lockRef.current) return;
        lockRef.current = true;
        setLoading(true);
        try {
            const response = await getAdminImageListClientApi({ page: nextPage, take: TAKE_DEFAULT });
            if (!response?.success || !response.data) {
                toast.error(response?.messages?.[0] || "Không thể tải danh sách ảnh.");
                return;
            }
            setItems((prev) => (append ? [...prev, ...response.data] : response.data));
            setPage(response.meta?.page || nextPage);
            setPageCount(response.meta?.pageCount || 1);
        } finally {
            lockRef.current = false;
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadImages(1, false);
    }, [loadImages]);

    const handleScrollList = (event: UIEvent<HTMLDivElement>) => {
        if (!hasMore || loading || lockRef.current) return;
        const target = event.currentTarget;
        const distanceToBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
        if (distanceToBottom < 180) {
            void loadImages(page + 1, true);
        }
    };

    const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file) {
            return;
        }

        setUploading(true);
        try {
            const response = await uploadAdminImageClientApi({ file });
            if (!response?.success || !response.data) {
                toast.error(response?.messages?.[0] || "Upload ảnh thất bại.");
                return;
            }
            toast.success("Upload ảnh thành công.");
            setItems((prev) => [response.data as BoxStorageImage, ...prev]);
            setSelectedImage(response.data as BoxStorageImage);
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteImage = async () => {
        if (!imageToDelete) return;
        setDeleting(true);
        try {
            const response = await deleteAdminImageClientApi({ imageId: imageToDelete.imageId });
            if (!response?.success) {
                toast.error(response?.messages?.[0] || "Xóa ảnh thất bại.");
                return;
            }
            setItems((prev) => prev.filter((item) => item.imageId !== imageToDelete.imageId));
            if (selectedImage?.imageId === imageToDelete.imageId) {
                setSelectedImage(null);
            }
            setImageToDelete(null);
            toast.success("Đã xóa ảnh khỏi VESMART Storage.");
        } finally {
            setDeleting(false);
        }
    };

    const handleConfirmAdd = () => {
        if (!selectedImage) {
            toast.error("Vui lòng chọn một ảnh trước khi thêm.");
            return;
        }
        onAddImage(selectedImage);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-gray-600">VESMART Storage</p>
                <div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUpload}
                    />
                    <button
                        type="button"
                        disabled={uploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-2 rounded-md text-sm bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-60 cursor-pointer"
                    >
                        {uploading ? "Đang upload..." : "Upload"}
                    </button>
                </div>
            </div>

            <div className="max-h-[55vh] overflow-y-auto pr-1" onScroll={handleScrollList}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {items.map((image) => (
                        <div
                            key={image.imageId}
                            className={`group border rounded-md overflow-hidden ${selectedImage?.imageId === image.imageId
                                ? "border-sky-500 ring-2 ring-sky-100"
                                : "border-gray-200"
                                }`}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedImage(image)}
                                className="w-full text-left cursor-pointer"
                            >
                                <div className="bg-gray-100 aspect-square">
                                    <img
                                        src={image.url}
                                        alt="Ảnh thư viện"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </button>
                            <div className="px-2 py-2 flex items-center justify-between gap-2">
                                <div className="text-xs text-gray-500 truncate">
                                    {image.imageType || "IMAGE"}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setImageToDelete(image)}
                                    className="text-xs px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 cursor-pointer"
                                >
                                    Xóa
                                </button>
                            </div>
                            {selectedImageIds.includes(image.imageId) ? (
                                <div className="px-2 pb-2 text-[11px] text-emerald-600">Đã chọn cho bài viết</div>
                            ) : null}
                        </div>
                    ))}
                </div>
                {hasMore ? (
                    <div className="h-10 flex items-center justify-center text-sm text-gray-500">
                        {loading ? "Đang tải thêm ảnh..." : "Cuộn để tải thêm"}
                    </div>
                ) : (
                    <p className="text-center text-sm text-gray-400 py-3">
                        Đã tải hết ảnh trong VESMART Storage.
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <p className="text-sm text-gray-500">
                    {selectedImage ? "Đã chọn 1 ảnh." : "Chưa chọn ảnh."}
                </p>
                <button
                    type="button"
                    onClick={handleConfirmAdd}
                    className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm cursor-pointer"
                >
                    Thêm
                </button>
            </div>

            <ConfirmModal
                isOpen={Boolean(imageToDelete)}
                setIsOpen={(isOpen) => {
                    if (!isOpen) setImageToDelete(null);
                }}
                title="Xác nhận xóa ảnh"
                message="Bạn có chắc chắn muốn xóa ảnh này không?"
                confirmText="Xóa ảnh"
                onConfirm={handleDeleteImage}
                isLoading={deleting}
            />
        </div>
    );
}
