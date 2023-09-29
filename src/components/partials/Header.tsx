import Link from "next/link";
import { Suspense } from 'react';

import { useSession } from "next-auth/react";


import UserDropdown from "./UserDropdown";
import { useSignInModal } from "../share/SignInModal";
import { IconBars, IconShoppingBag } from "../../../public/static/icons/IconSvg";
import { useSelector } from "react-redux";
import { CartSlideState } from "@/redux/cartSlice";
import styled from "styled-components";

const ButtonNavbarStyles = styled.li`
    position: relative;

    &+& {
        margin-left: 10px;
    }

    &:hover {
        a::after {
            background: #3b82f6;
            width: 100%;
        }
    }

    a {
        padding: 8px 6px;
        display: block;
    }

    a::after {
        content: '';
        height: 3px;
        width: 0%;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        transition: width 0.2s ease;
    }
`

const Header = () => {

    const { products } : { products: CartSlideState[] } = useSelector(
        (state: any) => state.cart
    );

    const { data: session, status } = useSession();
    const { SignInModal, setIsShowModal } = useSignInModal();

    return (
        <>  
            <SignInModal />
            
            {/* <div className="w-full h-[60px] block"></div> */}
            
            <header className={`fixed z-50 top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm transition-all`}>
                <div className="flex items-center max-w-screen-xl mx-auto px-3 h-[60px]">
                    <Link title="vesmart" href={`/`}>
                        <p className="leading-[60px] font-bold text-2xl select-none">VESMART</p>
                    </Link>
    
                    <div className="relative ml-auto mr-4">
                        <Link href={`/gio-hang`}>
                            <p className="p-2 rounded-full hover:bg-gray-100">
                                <IconShoppingBag className="w-6 h-6"/>
                                {
                                    products?.length>0 && (
                                        <span className="absolute bottom-0 right-0 w-[18px] h-[18px] leading-[18px] text-center text-[13px] text-white font-semibold bg-sky-500 rounded-full">
                                            {products?.length}
                                        </span>
                                    )
                                }
                            </p>
                        </Link>
                    </div>

                    {/* <button
                        className="px-2 py-2 rounded-full hover:bg-gray-100"
                    >
                        <IconBars className="w-6 h-6 block"/>
                    </button> */}

                    <div className="">
                        {
                            session ? (
                                <UserDropdown session={session}/>
                            ) : (
                                <button
                                    onClick={() => setIsShowModal(true)}
                                    className="px-2 py-1 rounded-sm bg-black border border-black text-white transition-all hover:bg-white hover:text-black"
                                >
                                    Đăng nhập
                                </button>
                            )
                        }

                    </div>
                    
                </div>
            </header>
            {/* <div className="bg-white py-1">
                <div className="flex items-center max-w-screen-xl mx-auto px-3">
                    <ul className="flex uppercase font-medium">
                        <ButtonNavbarStyles>
                            <Link href={`/bai-viet`}>Trang chủ</Link>
                        </ButtonNavbarStyles>
                        <ButtonNavbarStyles>
                            <Link href={`/bai-viet`}>Bài viết</Link>
                        </ButtonNavbarStyles>
                        <ButtonNavbarStyles>
                            <Link href={`/bai-viet`}>Sản phẩm</Link>
                        </ButtonNavbarStyles>
                        <ButtonNavbarStyles>
                            <Link href={`/bai-viet`}>Giới thiệu</Link>
                        </ButtonNavbarStyles>
                        <ButtonNavbarStyles>
                            <Link href={`/bai-viet`}>Liên hệ</Link>
                        </ButtonNavbarStyles>
                    </ul>
                </div>
            </div> */}
        </>
    )
}

export default Header;