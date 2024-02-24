import React, { ReactNode } from "react";
import Link from "next/link";
import Image from 'next/image';

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const config = {
    img: ({ node, ...props }: any) => {
      return (
        <div className="rounded-md text-center">
            <Image unoptimized src={props.src} alt={props.alt} width={500} height={500} className="mx-auto mb-1"/>
            <div>{props.alt}</div>
        </div>
      );
    },
    a: ({ node, href, onClick, children, ...props}: any) => {
        return <Link className="text-blue-600" href={href} {...props}>{children}</Link>
    }
};

interface MarkContentProps {
    children?: any
}

const MarkContent = ({ children } : MarkContentProps) => {

    return (
        <>
            <div className="prose contents">
                <ReactMarkdown components={config} remarkPlugins={[remarkGfm]}>
                    {children}
                </ReactMarkdown>
            </div>
        </>
    )
}

export default MarkContent;
