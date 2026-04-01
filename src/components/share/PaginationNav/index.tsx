"use client";

import Link from "next/link";
import { useState } from "react";
import IconAnglesLeft from "../../icons/IconAnglesLeft";
import IconAnglesRight from "../../icons/IconAnglesRight";


interface PaginationNavProps {
    countPage: number;
    currentPage: number;
    queryParams?: URLSearchParams;
}

export const PaginationNav = ({
    countPage,
    currentPage,
    queryParams,
}: PaginationNavProps) => {
    const [pageNext, setPageNext] = useState<string>(currentPage.toString());

    const generateHref = (page: number) => {
        const params = new URLSearchParams(queryParams || new URLSearchParams());
        params.set("page", String(page));
        return `?${params.toString()}`;
    };

    return (
        <div className="">
            <div className="flex flex-wrap justify-center select-none mb-2 gap-1 [&>li]:m-[1px]">
                {currentPage >= 2 ? (
                    <Link
                        prefetch={false}
                        href={generateHref(currentPage - 1)}
                        className="w-14 h-14 rounded-md block flex-shrink-0 bg-white hover:bg-gray-100 border border-gray-200 active:bg-white/20"
                    >
                        <IconAnglesLeft className="w-14 h-14 py-5 mx-auto fill-black" />
                    </Link>
                ) : (
                    <div
                        className={`w-14 h-14 rounded-md bg-white border border-gray-200 flex-shrink-0`}
                    >
                        <IconAnglesLeft className="w-14 h-14 py-5 mx-auto fill-black/20" />
                    </div>
                )}  
                {[1, 2, 3].map((number) => {
                    if (number >= 1 && number <= countPage) {
                        return (
                            <Link
                                key={number}
                                prefetch={false}
                                href={generateHref(number)}
                                className={`w-14 h-14 border border-gray-200 rounded-md text-center text-xl leading-14 flex-shrink-0 ${
                                    currentPage === number
                                        ? "text-white bg-sky-600"
                                        : "bg-white hover:bg-gray-100 active:bg-gray-200"
                                }`}
                            >
                                {number}
                            </Link>
                        );
                    }
                })}
                {[
                    currentPage - 2,
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    currentPage + 2,
                ].map((number) => {
                    if (number >= 4 && number <= countPage - 3) {
                        return (
                            <Link
                                key={number}
                                prefetch={false}
                                href={generateHref(number)}
                                className={`w-14 h-14 rounded-md text-center text-xl leading-14 flex-shrink-0 ${
                                    currentPage === number
                                        ? "text-white bg-sky-600"
                                        : "bg-white hover:bg-gray-100 active:bg-gray-200"
                                }`}
                            >
                                {number}
                            </Link>
                        );
                    }
                })}
                {[countPage - 2, countPage - 1, countPage].map((number) => {
                    if (number >= 4 && number <= countPage) {
                        return (
                            <Link
                                key={number}
                                prefetch={false}
                                href={generateHref(number)}
                                className={`w-14 h-14 rounded-md text-center text-xl leading-14 flex-shrink-0 ${
                                    currentPage === number
                                        ? "text-white bg-sky-600"
                                        : "bg-white hover:bg-gray-100 active:bg-gray-200"
                                }`}
                            >
                                {number}
                            </Link>
                        );
                    }
                })}
                {currentPage <= countPage - 1 ? (
                    <Link
                        prefetch={false}
                        href={generateHref(currentPage + 1)}
                        className="w-14 h-14 rounded-md flex-shrink-0 bg-white hover:bg-gray-100 active:bg-gray-200 border border-gray-200"
                    >
                        <IconAnglesRight className="w-14 h-14 py-5 mx-auto fill-black" />
                    </Link>
                ) : (
                    <div
                        className={`w-14 h-14 rounded-md border border-gray-200 flex-shrink-0`}
                    >
                        <IconAnglesRight className="w-14 h-14 py-5 mx-auto fill-black/20" />
                    </div>
                )}
            </div>
        </div>
    );
};
