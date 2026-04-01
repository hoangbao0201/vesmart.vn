import React, { isValidElement } from "react";
import Link from "next/link";
import type { Components } from "react-markdown";

import { cloudinaryDeliveryUrl, cloudinarySrcSet } from "@/utils/cloudinarySrc";

function reactNodeToPlainText(node: React.ReactNode): string {
    if (node == null || typeof node === "boolean") return "";
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(reactNodeToPlainText).join("");
    if (isValidElement(node)) {
        const props = node.props as { children?: React.ReactNode };
        return reactNodeToPlainText(props?.children);
    }
    return "";
}

function classNameHasAnchor(className: unknown): boolean {
    if (typeof className === "string") return className.split(/\s+/).includes("anchor");
    if (Array.isArray(className)) return className.some((c) => typeof c === "string" && c.includes("anchor"));
    return false;
}

const MARKDOWN_LINK_CLASS =
    "text-blue-900 font-semibold underline-offset-2 hover:text-blue-950 hover:underline";

const CLOUDINARY_IMG_WIDTHS = [480, 800, 1200];

export const markdownComponents: Components = {
  h1: ({ children, id, ...props }) => (
    <h1
      id={id}
      className="md:text-3xl text-2xl font-bold mt-8 mb-4 text-blue-900"
    >
      {children}
    </h1>
  ),
  h2: ({ children, id, ...props }) => (
    <h2 id={id} className="md:text-2xl text-xl font-bold mt-8 mb-4 text-blue-900" >
      {children}
    </h2>
  ),
  h3: ({ children, id, ...props }) => (
    <h3 id={id} className="md:text-xl text-lg font-bold mt-6 mb-3 text-blue-900" >
      {children}
    </h3>
  ),
  h4: ({ children, id, ...props }) => (
    <h4 id={id} className="md:text-lg text-base font-bold mt-6 mb-3 text-blue-900" >
      {children}
    </h4>
  ),
  h5: ({ children, id, ...props }) => (
    <h5 id={id} className="md:text-base text-sm font-bold mt-4 mb-2 text-blue-900" >
      {children}
    </h5>
  ),
  h6: ({ children, id, ...props }) => (
    <h6 id={id} className="md:text-sm text-xs font-bold mt-4 mb-2 text-blue-900" >
      {children}
    </h6>
  ),
  p: ({ children, ...props }) => (
    <p className="leading-relaxed mb-4" >
      {children}
    </p>
  ),
  img: ({ src, alt }) => {
    const raw = src || "";
    const optimized = cloudinaryDeliveryUrl(raw as string, { maxWidth: 800 }) || raw;
    const srcSet = cloudinarySrcSet(raw as string, CLOUDINARY_IMG_WIDTHS);
    const sizes = "(max-width: 768px) 100vw, 42rem";

    if (alt) {
      return (
        <figure className="rounded-md text-center my-6">
          <img
            src={optimized}
            srcSet={srcSet}
            sizes={srcSet ? sizes : undefined}
            alt={alt}
            className="mx-auto mb-1 max-w-full h-auto"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="text-sm text-gray-600 mt-2">{alt}</figcaption>
        </figure>
      );
    }

    return (
      <img
        src={optimized}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt || ""}
        className="mx-auto mb-1 max-w-full h-auto my-6 block"
        loading="lazy"
        decoding="async"
      />
    );
  },
  a: ({ href, children, className, ...props }) => {
    const visible = reactNodeToPlainText(children).trim();
    const isAnchorHeading = classNameHasAnchor(className);
    const fragmentLabel =
      href?.startsWith("#") && href.length > 1
        ? `Đi tới mục: ${decodeURIComponent(href.slice(1)).replace(/-/g, " ")}`
        : undefined;
    const ariaLabel =
      visible && visible !== "#"
        ? undefined
        : isAnchorHeading || href?.startsWith("#")
          ? fragmentLabel ?? "Đi tới mục trong trang"
          : href
            ? `Mở liên kết: ${href}`
            : "Liên kết";

    const mergedClass = [MARKDOWN_LINK_CLASS, className].filter(Boolean).join(" ");

    const isExternal = href?.startsWith("http") || href?.startsWith("//");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={mergedClass}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || "#"}
        className={mergedClass}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  },
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2" >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-2" >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => {
    const checked = (props as any).checked;
    if (checked !== null && checked !== undefined) {
      return (
        <li className="mb-2 leading-relaxed list-none flex items-start" >
          <input
            type="checkbox"
            checked={checked}
            readOnly
            disabled
            className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 cursor-not-allowed"
          />
          <span className="flex-1">{children}</span>
        </li>
      );
    }
    return (
      <li className="mb-2 leading-relaxed" >
        {children}
      </li>
    );
  },
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6" >
      {children}
    </blockquote>
  ),
  pre: ({ children, ...props }) => (
    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-6" >
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded text-gray-800 font-mono" >
          {children}
        </code>
      );
    }
    return (
      <code className={className} >
        {children}
      </code>
    );
  },
  hr: (props) => <hr className="border-gray-300 my-8" />,
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50" >
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => <tbody >{children}</tbody>,
  tr: ({ children, ...props }) => <tr >{children}</tr>,
  th: ({ children, ...props }) => (
    <th className="border border-gray-300 px-4 py-2 text-left font-semibold" >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-gray-300 px-4 py-2" >
      {children}
    </td>
  ),
  strong: ({ children, ...props }) => (
    <strong className="text-gray-900 font-semibold" >
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="text-gray-600 italic" >
      {children}
    </em>
  ),
  del: ({ children, ...props }) => (
    <del className="line-through text-gray-500" >
      {children}
    </del>
  ),
};

