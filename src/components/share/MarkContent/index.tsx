import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeUnwrapImages from "rehype-unwrap-images";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// import "highlight.js/styles/github-dark.css";
import { markdownComponents } from "./configMarkdown";

interface MarkContentProps {
    children: string;
    className?: string;
}

const MarkContent = ({ children, className = "" }: MarkContentProps) => {
    if (!children) {
        return null;
    }

    return (
        <div className={className || "contents max-w-none text-lg"}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                    rehypeRaw,
                    rehypeSlug,
                    rehypeUnwrapImages,
                    [
                        rehypeAutolinkHeadings,
                        {
                            behavior: "prepend",
                            properties: {
                                className: ["anchor"],
                            },
                        },
                    ],
                    [
                        rehypeHighlight,
                        {
                            detect: true,
                            ignoreMissing: true,
                        },
                    ],
                ]}
                components={markdownComponents}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
};

export default MarkContent;
