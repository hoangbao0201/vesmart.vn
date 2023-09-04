import Link from "next/link";
import { Suspense } from 'react';

import { useSession } from "next-auth/react";


import UserDropdown from "./UserDropdown";
import { useSignInModal } from "../share/SignInModal";
import { IconShoppingBag } from "../../../public/static/icons/IconSvg";
import { useSelector } from "react-redux";
import { CartSlideState } from "@/redux/cartSlice";


const Header = () => {

    const { products } : { products: CartSlideState[] } = useSelector(
        (state: any) => state.cart
    );

    const { data: session, status } = useSession();
    const { SignInModal, setIsShowModal } = useSignInModal();

    return (
        <>  
            <SignInModal />
            
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
                {/* <Suspense fallback={<OpenCart />}> */}
                    
                {/* </Suspense> */}
            </header>
        </>
    )
}

export default Header;