import React, { ReactNode } from "react";
import Link from "next/link";
import Image from 'next/image';

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const config = {
    img: ({ node, ...props }: any) => {
      return <Image src={props.src} alt={props.alt} width={500} height={500} />;
    },
    a: ({ node, href, onClick, children, ...props}: any) => {
        return <Link href={href} {...props}>{children}</Link>
    }
};

interface MarkContentProps {
    children?: any
}

const MarkContent = ({ children } : MarkContentProps) => {

    return (
        <>
            <div className="prose contents prose-lg">
                <ReactMarkdown components={config} remarkPlugins={[remarkGfm]}>
                    {children}
                </ReactMarkdown>
            </div>
        </>
    )
}

export default MarkContent;
