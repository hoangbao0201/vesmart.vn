"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { IGetPostDetail } from "@/services/post/post.type";
import { createAdminPostClientApi, updateAdminPostClientApi } from "@/services/admin/admin.client";
import MarkContent from "@/components/share/MarkContent";
import classNames from "@/utils/classNames";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
    ssr: false,
});

interface AdminPostDetailFormTemplateProps {
    postId?: string;
    initialPost?: IGetPostDetail | null;
    tagOptions: string[];
}

const slugify = (value: string) => {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

const AdminPostDetailFormTemplate = ({
    postId,
    initialPost,
    tagOptions,
}: AdminPostDetailFormTemplateProps) => {
    const initialTagValues = ((initialPost?.tags || []) as Array<string | { name?: string }>)
        .map((tag) => (typeof tag === "string" ? tag : tag?.name || ""))
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean);

    const router = useRouter();
    const isEditMode = Boolean(postId);

    const [title, setTitle] = useState(initialPost?.title || "");
    const [slug, setSlug] = useState(initialPost?.slug || "");
    const [description, setDescription] = useState(initialPost?.description || "");
    const [content, setContent] = useState(initialPost?.content || "");
    const [selectedTags, setSelectedTags] = useState<string[]>(
        Array.from(new Set(initialTagValues))
    );
    const [newTagInput, setNewTagInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [slugTouched, setSlugTouched] = useState(Boolean(initialPost?.slug));

    const availableTags = useMemo(() => {
        return Array.from(
            new Set(
                tagOptions
                    .map((tag) => tag.trim().toLowerCase())
                    .filter(Boolean)
            )
        );
    }, [tagOptions]);

    const handleToggleTag = (tagName: string) => {
        setSelectedTags((prev) => {
            if (prev.includes(tagName)) {
                return prev.filter((tag) => tag !== tagName);
            }
            return [...prev, tagName];
        });
    };

    const handleAddTag = () => {
        const normalizedTag = newTagInput.trim().toLowerCase();
        if (!normalizedTag) {
            return;
        }
        setSelectedTags((prev) => (prev.includes(normalizedTag) ? prev : [...prev, normalizedTag]));
        setNewTagInput("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }

        const payload = {
            title: title.trim(),
            slug: slug.trim(),
            description: description.trim() || null,
            content: content.trim(),
            tags: selectedTags,
        };

        if (!payload.title || !payload.slug || !payload.content) {
            toast.error("Vui lòng nhập đầy đủ tiêu đề, slug và nội dung.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = isEditMode && postId
                ? await updateAdminPostClientApi({ postId, body: payload })
                : await createAdminPostClientApi({ body: payload });

            if (!response?.success) {
                toast.error(response?.messages?.[0] || "Không thể lưu bài viết.");
                return;
            }

            toast.success(isEditMode ? "Cập nhật bài viết thành công" : "Tạo bài viết thành công");
            await router.push("/admin/bai-viet");
        } catch {
            toast.error("Có lỗi xảy ra khi lưu bài viết.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h1 className="text-xl font-semibold">
                    {isEditMode ? "Chỉnh sửa bài viết" : "Tạo bài viết"}
                </h1>
                <Link
                    href="/admin/bai-viet"
                    className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
                >
                    Quay lại danh sách
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Tiêu đề</label>
                        <input
                            value={title}
                            onChange={(e) => {
                                const nextTitle = e.target.value;
                                setTitle(nextTitle);
                                if (!slugTouched) {
                                    setSlug(slugify(nextTitle));
                                }
                            }}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="Nhập tiêu đề bài viết"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Slug</label>
                        <input
                            value={slug}
                            onChange={(e) => {
                                setSlugTouched(true);
                                setSlug(slugify(e.target.value));
                            }}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="vi-du-slug-bai-viet"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium">Mô tả ngắn</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-24"
                        placeholder="Nhập mô tả ngắn"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium">Nội dung (Markdown)</label>
                    <div className="border border-gray-300 overflow-hidden">
                        <MdEditor
                            value={content}
                            style={{ height: "420px" }}
                            renderHTML={(text: string) => <MarkContent>{text}</MarkContent>}
                            onChange={({ text }: { text: string }) => setContent(text)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">Thể loại</label>

                    <div className="flex gap-2 mb-2">
                        <input
                            value={newTagInput}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddTag();
                                }
                            }}
                            onChange={(e) => setNewTagInput(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            placeholder="Thêm tag mới (ví dụ: khuyen-mai)"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddTag();
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="px-3 py-2 cursor-pointer rounded-md bg-gray-100 hover:bg-gray-200"
                        >
                            Thêm
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3 px-2 bg-gray-200 rounded-md h-32 overflow-y-auto">
                        {availableTags.map((tag) => {
                            if(!tag.includes(newTagInput)) {
                                return null;
                            }
                            const isSelected = selectedTags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => handleToggleTag(tag)}
                                    className={classNames('px-2 h-7 leading-7 cursor-pointer rounded-full text-sm border',
                                        isSelected
                                            ? "bg-sky-100 border-sky-300 text-sky-700"
                                            : "bg-gray-50 hover:bg-gray-100 border-gray-300 text-gray-700",
                                    )}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>

                    {selectedTags.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {selectedTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-sm border border-sky-200"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleToggleTag(tag)}
                                        className="text-sky-700 hover:text-sky-900"
                                    >
                                        x
                                    </button>
                                </span>
                            ))}
                        </div>
                    ) : null}
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 cursor-pointer rounded-md bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-60"
                    >
                        {isSubmitting ? "Đang lưu..." : isEditMode ? "Cập nhật bài viết" : "Tạo bài viết"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminPostDetailFormTemplate;
