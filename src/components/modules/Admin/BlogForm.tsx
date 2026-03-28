import { ChangeEvent, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { convertTextToSlug } from "@/utils/convertTextToSlug";
import { ShowToastify } from "@/components/share/ShowToastify";
import LoadingDots from "@/components/share/Loading/LoadingDots";

export interface BlogFormInitial {
    title: string;
    description: string;
    thumbnail: string;
    blogHashtags: string;
    content: string;
    slug: string;
}

interface BlogFormProps {
    mode: "create" | "edit";
    blogId?: string;
    initial?: Partial<BlogFormInitial>;
}

const emptyInitial: BlogFormInitial = {
    title: "",
    description: "",
    thumbnail: "",
    blogHashtags: "",
    content: "",
    slug: "",
};

export default function BlogForm({ mode, blogId, initial }: BlogFormProps) {
    const [dataBasicBlog, setDataBasicBlog] = useState<BlogFormInitial>(() => ({
        ...emptyInitial,
        ...initial,
    }));
    const [contentBlog, setContentBlog] = useState<string>(() => initial?.content ?? "");
    const [isLoad, setIsLoad] = useState(false);

    const onChangeContentBlog = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setDataBasicBlog({
            ...dataBasicBlog,
            [e.target.name]: e.target.value,
        });
    };

    const slugPreview =
        mode === "create"
            ? convertTextToSlug(dataBasicBlog.title) || ""
            : dataBasicBlog.slug;

    const handleSubmit = async () => {
        const { title, blogHashtags, thumbnail, description } = dataBasicBlog;
        if (!title || !contentBlog || !blogHashtags?.trim()) {
            ShowToastify({
                data: "Chưa điền đủ thông tin (tiêu đề, tag, nội dung)",
                type: "error",
            });
            return;
        }
        setIsLoad(true);

        const tags = dataBasicBlog.blogHashtags.split("||").map((t) => t.trim()).filter(Boolean);
        const slug = mode === "create" ? convertTextToSlug(title) || "" : dataBasicBlog.slug.trim();

        if (!slug) {
            ShowToastify({ data: "Slug không hợp lệ", type: "error" });
            setIsLoad(false);
            return;
        }

        try {
            if (mode === "create") {
                const blogRes = await axios.post("/api/blog/create", {
                    title,
                    slug,
                    thumbnail: thumbnail || "",
                    description,
                    content: contentBlog,
                    blogHashtags: tags,
                });
                if (blogRes.data.success) {
                    ShowToastify({
                        data: "Tạo bài viết thành công",
                        type: "success",
                    });
                    setDataBasicBlog(emptyInitial);
                    setContentBlog("");
                } else {
                    ShowToastify({
                        data: blogRes.data?.message || "Tạo bài thất bại",
                        type: "error",
                    });
                }
            } else if (blogId) {
                const blogRes = await axios.put("/api/blog/update", {
                    id: blogId,
                    title,
                    slug,
                    thumbnail: thumbnail || "",
                    description,
                    content: contentBlog,
                    blogHashtags: tags,
                });
                if (blogRes.data.success) {
                    ShowToastify({
                        data: "Cập nhật bài viết thành công",
                        type: "success",
                    });
                } else {
                    ShowToastify({
                        data: blogRes.data?.message || "Cập nhật thất bại",
                        type: "error",
                    });
                }
            }
        } catch {
            ShowToastify({ data: "Lỗi mạng hoặc máy chủ", type: "error" });
        } finally {
            setIsLoad(false);
        }
    };

    const handleEditorChange = ({ text }: { html: string; text: string }) => {
        setContentBlog(text);
    };

    return (
        <div>
            <div className="bg-white py-5 px-5 mb-4 rounded-xl border">
                <div>
                    <label className="block mb-2 font-semibold">Tiêu đề</label>
                    <input
                        name="title"
                        value={dataBasicBlog.title}
                        onChange={onChangeContentBlog}
                        className="input-info mb-4"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Đường dẫn (slug)</label>
                    {mode === "create" ? (
                        <input
                            disabled
                            value={slugPreview}
                            className="input-info mb-4 opacity-80"
                        />
                    ) : (
                        <input
                            name="slug"
                            value={dataBasicBlog.slug}
                            onChange={onChangeContentBlog}
                            className="input-info mb-4"
                        />
                    )}
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Ảnh thumbnail (URL)</label>
                    <input
                        name="thumbnail"
                        value={dataBasicBlog.thumbnail}
                        onChange={onChangeContentBlog}
                        placeholder="/static/..."
                        className="input-info mb-4"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Tag (phân cách bằng ||)</label>
                    <input
                        name="blogHashtags"
                        value={dataBasicBlog.blogHashtags}
                        onChange={onChangeContentBlog}
                        className="input-info mb-4"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Mô tả</label>
                    <textarea
                        name="description"
                        value={dataBasicBlog.description}
                        onChange={onChangeContentBlog}
                        className="input-info min-h-[200px]"
                    />
                </div>
            </div>
            <div className="bg-white py-5 px-5 mb-4 rounded-xl border">
                <Editor
                    value={contentBlog}
                    className="min-h-screen w-full"
                    onChange={handleEditorChange}
                    renderHTML={(text) => (
                        <ReactMarkdown sourcePos className="prose">
                            {text}
                        </ReactMarkdown>
                    )}
                />
            </div>
            <div className="bg-white py-4 px-5 mb-4 rounded-xl border">
                <div className="flex justify-end">
                    <button
                        type="button"
                        disabled={isLoad}
                        onClick={handleSubmit}
                        className="disabled:opacity-90 bg-blue-600 enabled:hover:bg-blue-700 transition-all border px-3 py-2 rounded-md text-white font-semibold"
                    >
                        {mode === "create" ? "Tạo blog" : "Cập nhật bài viết"}{" "}
                        {isLoad && <LoadingDots color="#ffff" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
