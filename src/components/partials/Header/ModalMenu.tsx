import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
    Dispatch,
    Fragment,
    ReactNode,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { signOut, useSession } from "next-auth/react";
import { Dialog, Menu, Transition } from "@headlessui/react";

import { IconLogout } from "../../../../public/static/icons/IconSvg";


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


interface ModalMenuProps {
    children?: ReactNode;
    isShow: boolean;
    setIsShowModal: Dispatch<SetStateAction<boolean>>
    setIsShow: Dispatch<SetStateAction<boolean>>;
}

const ModalMenu = ({ isShow, setIsShowModal, setIsShow }: ModalMenuProps) => {
    const { data: session } = useSession();
    const { name, email, image } = session?.user || {};

    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = () => {
            setIsShow(false);
        };

        router.events.on("routeChangeStart", handleRouteChange);

        return () => {
            router.events.off("routeChangeStart", handleRouteChange);
        };
    }, [router]);

    return (
        <>
            <div className="top-[60px] flex" >
                <Transition show={isShow} as={Fragment}>
                    <Dialog onClose={() => setIsShow(false)} >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/30 z-[50]" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="-translate-x-1/2 opacity-0 scale-100"
                            enterTo="translate-x-0 opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="translate-x-0 opacity-100 scale-100"
                            leaveTo="-translate-x-1/2 opacity-0 scale-100"
                        >
                            <Dialog.Panel className="bg-white fixed inset-0 w-3/4 z-[50]">
                                <Dialog.Title>
                                    <div className="relative h-screen">
                                        <div className="text-black">
                                            <div className="mx-5 my-4">
                                                <span className="text-white font-semibold uppercase bg-sky-950 rounded-sm px-2 py-1">
                                                    VESMART
                                                </span>
                                            </div>
                                            <div className="">
                                                <div className="border-b pb-4 px-2">
                                                    {
                                                        (email=="hoangbao020103@gmail.com" || email=="vesmart98@gmail.com") && (
                                                            <Link href={"/admin"}>
                                                                <p className="px-4 py-2 rounded-md hover:bg-gray-100">
                                                                    Admin
                                                                </p>
                                                            </Link>
                                                        )
                                                    }
                                                    {
                                                        !email && (
                                                            <p
                                                                onClick={() =>
                                                                    setIsShowModal(true)
                                                                }
                                                                className="px-4 py-2 cursor-pointer rounded-md hover:bg-gray-100"
                                                            >
                                                                Đăng nhập
                                                            </p>
                                                        )
                                                    }
                                                    <Link href={"/"}>
                                                        <p className="px-4 py-2 rounded-md hover:bg-gray-100">
                                                            Trang chủ
                                                        </p>
                                                    </Link>
                                                    <Link href={"/bai-viet"}>
                                                        <p className="px-4 py-2 rounded-md hover:bg-gray-100">
                                                            Bài viết
                                                        </p>
                                                    </Link>
                                                </div>

                                                <div className="px-2">
                                                    <p className="px-4 py-2 mb-2 font-semibold">Thiết bị và linh kiện</p>
                                                    {
                                                        solutions.map((item, index) => {
                                                            return (
                                                                <Link key={index} href={`/${item.href}`}>
                                                                    <p className="px-4 py-2 flex items-center rounded-md hover:bg-gray-100">
                                                                        <i className="mr-2">
                                                                            <Image
                                                                                unoptimized
                                                                                alt="ảnh"
                                                                                width={20}
                                                                                height={20}
                                                                                className="w-5 h-5 block object-cover"
                                                                                src={`/static/images/${item.icon}`}
                                                                            />
                                                                        </i>
                                                                        {item.name}
                                                                    </p>
                                                                </Link>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
    
                                        <div className="py-1 px-1 border-t absolute bottom-10 left-0 right-0">
                                            {email && (
                                                <div onClick={() => signOut()} className="px-3 py-3 flex items-center cursor-pointer text-black hover:bg-gray-200">
                                                    <span className="flex flex-shrink-0 h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-105 sm:h-9 sm:w-9">
                                                        <Image
                                                            unoptimized
                                                            alt={email}
                                                            src={
                                                                image ||
                                                                `https://avatars.dicebear.com/api/micah/${email}.svg`
                                                            }
                                                            width={45}
                                                            height={45}
                                                        />
                                                    </span>
                                                    <div className="ml-3 block overflow-hidden">
                                                        <p className="text-lg line-clamp-1">{name}</p>
                                                        <p className="text-sm line-clamp-1">{email}</p>
                                                    </div>
                                                    <i className="ml-auto pl-3">
                                                        <IconLogout
                                                            className="w-6 h-6 block stroke-black"
                                                        />
                                                    </i>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </Dialog.Title>
                            </Dialog.Panel>
                        </Transition.Child>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
};

export default ModalMenu;

// export function useModalMenu() {
//     const [isModalMenu, setIsModalMenu] = useState(false);

//     const ModalMenuCallback = useCallback(() => {
//         return <ModalMenu isShow={isModalMenu} setIsShow={setIsModalMenu} />;
//     }, [isModalMenu, setIsModalMenu]);

//     return useMemo(
//         () => ({ setIsModalMenu, ModalMenu: ModalMenuCallback }),
//         [setIsModalMenu, ModalMenuCallback]
//     );
// }
