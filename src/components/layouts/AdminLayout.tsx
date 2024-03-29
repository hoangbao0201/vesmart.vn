import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IconBars } from "../../../public/static/icons/IconSvg";

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
            {
                value: "Tạo sản phẩm",
                // icon: iconSteal,
                linkItem: "/admin/product/create",
            },
            {
                value: "Tạo Blog",
                // icon: iconSteal,
                linkItem: "/admin/blog/create",
            },
        ],
    },
];

const AdminLayout = ({ children, tab }: AdminLayoutProps) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { name, email, image } = session?.user || {};

    const [isModalMenu, setIsModalMenu] = useState(false);
    
    useEffect(() => {
        if(status !== "loading" && email !== "hoangbao020103@gmail.com" && email !== "vesmart98@gmail.com") {
            router?.push("/");
        }
    }, [router, status])


    return (
        <div className="overflow-hidden w-full h-full relative text-black">
            <div className={`z-50 bg-white fixed top-0 w-full border-b border-gray-300 transition-all ${isModalMenu ? "ml-[260px]" : "ml-[0px]"}`}>
                <div className="h-14 flex items-center">
                    <button
                        className="hover:bg-white/20 rounded-full p-1"
                        onClick={() => setIsModalMenu(state => !state)}
                    >
                        <i className="block p-1">
                            <IconBars className="w-7 h-7 fill-blue-500 block" />
                        </i>
                    </button>
                    <h1>
                        <Link href="/" className="px-4 leading-[56px] font-semibold text-lg">VESMART</Link>
                    </h1>
                </div>
            </div>
            <div className={`relative block mt-12 md:p-5 py-5 px-0 overflow-y-auto scrollbar-thumb-gray-500 scrollbar-track-gray-300 transition-all ${isModalMenu ? "ml-[260px]" : "ml-0"}`}>
                <div>
                    <h2></h2>
                    <div></div>
                </div>
                <div className="min-h-[500px] p-3">
                    {children}
                </div>
            </div>

            <div className={`fixed bg-white h-full top-0 flex w-[260px] flex-col border-r border-gray-300 transition-all ${isModalMenu ? "left-0" : "-left-[260px]"}`}>
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
                                                    className={`flex items-center px-[15px] py-[10px] mx-[15px] rounded-lg ${
                                                        tab == item.linkItem ?
                                                        "bg-indigo-500 text-white fill-white shadow-sm bg-opacity-90" : "hover:bg-gray-100"
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
