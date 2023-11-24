import Link from "next/link";
import Image from "next/image"
import { Fragment, useState } from "react";

import { Popover, Switch, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import {
    IconNewSpaper,
    IconPackageSearch,
} from "../../../public/static/icons/IconSvg";

const solutions = [
    {
        name: "Linh kiện robot hút bụi",
        description: "Linh kiện robot hút bụi độc đáo, chính xác và hiệu quả, mang đến khả năng làm sạch tối ưu cho mọi góc nhỏ trong ngôi nhà của bạn.",
        href: "##",
        icon: "robot-cleaner-vacuum.png"
    },
    {
        name: "PHỤ KIỆN ECOVACS",
        description: "Phụ kiện Ecovacs độc đáo, tối ưu hóa hiệu suất robot hút bụi, giúp làm sạch hiệu quả trong mọi không gian",
        href: "##",
        icon: "ecovacs-home.png"    
    },
    {
        name: "ĐÔNG CƠ VÀ ĐIỀU KHIỂN",
        description: "Động cơ và điều khiển chất lượng, mang đến sức mạnh và kiểm soát hoàn hảo cho thiết bị hiện đại",
        href: "##",
        icon: "engine-motor.png"    
    },
    {
        name: "PIN VÀ PHỤ KIỆN",
        description: "Pin và phụ kiện độc đáo, tăng cường năng lượng và tính linh hoạt cho thiết bị, đảm bảo hoạt động liên tục.",
        href: "##",
        icon: "battery-full-charging.png"    
    },
];

const MainNav = () => {
    return (
        <>
            <div className="flex items-center space-x-2 px-3 py-1 mx-auto max-w-7xl">
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button
                                className={`${open ? "text-black bg-gray-200" : "text-black"} group inline-flex items-center border outline-none rounded-sm px-3 py-1 hover:underline`}
                            >
                                <span>Danh mục sản phẩm</span>
                                <ChevronDownIcon
                                    className={`${open ? "text-black rotate-180" : "text-black"} ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-black`}
                                    aria-hidden="true"
                                />
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute left-0 z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-2xl">
                                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                        <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                                            {solutions.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                                                >
                                                    <div className="flex-shrink-0">
                                                        <Image
                                                            alt="ảnh"
                                                            width={48}
                                                            height={48}
                                                            className="w-12 h-12 block object-cover"
                                                            src={`/static/images/${item.icon}`}
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 line-clamp-2">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
                <div>
                    <Link
                        href={"/"}
                        className="hover:underline bg-white px-3 py-1 flex items-center border rounded-sm"
                    >
                        <IconPackageSearch className="w-4 h-4 mr-1" />
                        Sản phẩm
                    </Link>
                </div>
                <div className="">
                    <Link
                        href={"/bai-viet"}
                        className="hover:underline bg-white px-3 py-1 flex items-center border rounded-sm"
                    >
                        <IconNewSpaper className="w-4 h-4 mr-1 fill-black" />
                        Bài viết
                    </Link>
                </div>

                {/* <div className="ml-auto hidden md:block">
                    <strong>Liên hệ:</strong>{" "}
                    <span className="">0971183153</span>
                </div> */}
            </div>
        </>
    );
};

export default MainNav;
