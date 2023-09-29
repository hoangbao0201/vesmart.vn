import dynamic from "next/dynamic";
import { ChangeEvent, useRef, useState } from "react";

import axios from "axios";
import ReactMarkdown from "react-markdown";
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";



import { NextPageWithLayout } from "@/pages/_app";
import AdminLayout from "@/components/layouts/AdminLayout";
import { convertTextToSlug } from "@/utils/convertTextToSlug";
import { ShowToastify } from "@/components/Features/ShowToastify";

const CreateBlogPage : NextPageWithLayout = () => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [dataBasicBlog, setDataBasicBlog] = useState({
        title: "",
        description: "",
        thumbnail: "",
        blogHashtags: "",
        content: ""
    })
    const [contentBlog, setContentBlog] = useState<string>("");

    const onChangeContentBlog = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setDataBasicBlog({
            ...dataBasicBlog,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateBlog = async () => {
        const { title, content, blogHashtags } = dataBasicBlog;
        if(!title || !content || !blogHashtags) {
            ShowToastify({
                data: "Chưa điền đủ thông tin",
                type: "error"
            })
            return;
        }

        try {
            const blogRes = await axios.post("/api/blog/create", {
                userId: "64d39a038ecc99b24ffe78f1",
                ...dataBasicBlog,
                content: contentBlog,
                slug: convertTextToSlug(dataBasicBlog.title) || "",
                blogHashtags: dataBasicBlog.blogHashtags.split("||"),
            })

            console.log(blogRes?.data);
        } catch (error) {
            
        }
    }

    const handleEditorChange = ({ html, text } : { html: string, text: string }) => {
        setContentBlog(text);
    };

    return (
        <div>
            <div className="bg-white py-5 px-5 mb-4 rounded-xl border">
                <div>
                    <label className="block mb-2 font-semibold">Tiêu đề</label>
                    <input
                        placeholder=""
                        name="title"
                        value={dataBasicBlog.title}
                        onChange={onChangeContentBlog}
                        className="input-info mb-4"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Đường dẫn</label>
                    <input
                        placeholder=""
                        disabled={true}
                        value={convertTextToSlug(dataBasicBlog.title) || ""}
                        className="input-info mb-4"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Tag</label>
                    <input
                        placeholder=""
                        name="blogHashtags"
                        value={dataBasicBlog.blogHashtags}
                        onChange={onChangeContentBlog}
                        className="input-info mb-4"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Mô tả</label>
                    <textarea
                        placeholder=""
                        name="description"
                        value={dataBasicBlog?.description}
                        onChange={onChangeContentBlog}
                        className="input-info min-h-[200px]"
                    />
                </div>
            </div>
            <div className="bg-white py-5 px-5 mb-4 rounded-xl border">
                <div className="">
                    
                    <Editor
                        value={contentBlog}
                        className="min-h-screen w-full"
                        onChange={handleEditorChange}
                        renderHTML={(text) => {
                            return (
                                <ReactMarkdown
                                    sourcePos={true}
                                    // children={text}
                                    className="prose"
                                >
                                    {text}
                                </ReactMarkdown>
                            )
                        }}
                    />

                </div>
            </div>

            <div className="bg-white py-4 px-5 mb-4 rounded-xl border">
                <div className="flex justify-end">
                    <button onClick={handleCreateBlog} className="bg-blue-600 hover:bg-blue-700 transition-all border px-3 py-2 rounded-md text-white font-semibold">Tạo blog</button>
                </div>
            </div>
        </div>
    )
}
export default CreateBlogPage;

CreateBlogPage.getLayout = (page) => {
    return <AdminLayout tab="/admin/blog/create">{page}</AdminLayout>;
};