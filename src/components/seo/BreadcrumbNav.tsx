import Link from "next/link";

import type { BreadcrumbItem } from "@/lib/seo";

interface BreadcrumbNavProps {
    items: BreadcrumbItem[];
    className?: string;
}

export default function BreadcrumbNav({ items, className = "" }: BreadcrumbNavProps) {
    if (items.length === 0) return null;

    return (
        <nav aria-label="Đường dẫn" className={`text-sm text-gray-600 ${className}`.trim()}>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={`${item.name}-${index}`} className="flex items-center gap-2">
                            {index > 0 ? <span aria-hidden className="text-gray-400">/</span> : null}
                            {item.path && !isLast ? (
                                <Link
                                    href={item.path}
                                    className="text-blue-800 hover:text-blue-600 hover:underline"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <span className={isLast ? "font-medium text-gray-900" : undefined}>{item.name}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
