import { Dispatch, SetStateAction } from "react";
import ModalDialog from "@/components/share/ModalDialog";

interface ConfirmModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    onConfirm: () => void;
}

export default function ConfirmModal({
    isOpen,
    setIsOpen,
    title = "Xác nhận",
    message,
    confirmText = "Xóa",
    cancelText = "Hủy",
    isLoading = false,
    onConfirm,
}: ConfirmModalProps) {
    return (
        <ModalDialog isOpen={isOpen} setIsOpen={setIsOpen} title={title} size="small">
            <div className="space-y-4">
                <p className="text-sm text-gray-700">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        disabled={isLoading}
                        className="px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm disabled:opacity-60 cursor-pointer"
                        onClick={onConfirm}
                    >
                        {isLoading ? "Đang xử lý..." : confirmText}
                    </button>
                </div>
            </div>
        </ModalDialog>
    );
}
