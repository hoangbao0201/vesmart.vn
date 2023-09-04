import Link from "next/link";
import { ReactNode } from "react";
// import {
//     iconAddDraft,
//     iconAddNewNovel,
//     iconAllDraft,
//     iconChart,
//     iconDocuments,
//     iconMyNovel,
//     iconNotifyError,
//     iconSteal,
// } from "../../../public/icons";
// import PerfectScrollbar from "react-perfect-scrollbar";
// import 'react-perfect-scrollbar/dist/css/styles.css';

interface AdminLayoutProps {
    children?: ReactNode;
    tab?: string;
}

const dataContentSide = [
    {
        title: "Sản phẩm",
        children: [
            {
                value: "Đơn hàng",
                // icon: iconSteal,
                linkItem: "/admin/order",
            },
        ],
    },
];

const AdminLayout = ({ children, tab }: AdminLayoutProps) => {

    return (
        <div className="overflow-hidden w-full h-full relative">
            <div className="z-50 bg-white fixed ml-[260px] top-0 w-full border-b border-gray-300 h-14">
                <h1>
                    <Link href="/" className="px-4 leading-[56px] font-semibold text-lg">VESMART</Link>
                </h1>
            </div>
            <div className="relative block ml-[260px] mt-12 p-5 overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                <div>
                    <h2></h2>
                    <div></div>
                </div>
                <div className="bg-white min-h-[500px] p-5 rounded-xl border-gray-300 border">
                    {children}
                </div>
            </div>

            <div className="fixed bg-white h-full top-0 left-0 flex w-[260px] flex-col border-r border-gray-300">
                <h1 className="py-1 mt-3 ml-[30px] font-semibold text-2xl">
                    <Link href="/">
                        VESMART
                    </Link>
                </h1>
                <ul>
                    {dataContentSide.map((itemTitle, indexTitle) => {
                        return (
                            <li key={indexTitle} className="flex flex-col">
                                <div className="ml-[30px] mb-[15px] mt-[30px] uppercase text-sm text-gray-400 font-semibold">
                                    {itemTitle.title}
                                </div>
                                <ul>
                                    {itemTitle.children.map((item, index) => {
                                        return (
                                            <li key={index} className="">
                                                <Link
                                                    href={item.linkItem}
                                                    className={`flex items-center px-[15px] py-[10px] mx-[15px] hover:ml-[21px] transition-all duration-300 rounded-lg ${
                                                        tab == item.linkItem &&
                                                        "bg-indigo-500 text-white fill-white shadow-sm bg-opacity-90 shadow-indigo-600"
                                                    }`}
                                                >
                                                    {/* <i className="block w-5 mr-4 ">
                                                        {!!item.icon && item.icon}
                                                    </i> */}
                                                    <span className="text-base line-clamp-1">
                                                        {item.value}
                                                    </span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default AdminLayout;
