import Link from "next/link";
import { useState } from "react";

import styled from "styled-components";
import { useMediaQuery } from "usehooks-ts";
import { useSession } from "next-auth/react";

import ModalMenu from "./ModalMenu";
import UserDropdown from "./UserDropdown";
import { IconBars } from "../../../public/static/icons/IconSvg";
import { CartSlideState } from "@/redux/cartSlice";
import { useSignInModal } from "../share/SignInModal";
import ButtonDarkMode from "./ButtonDarkMode";


const TagCartStyle = styled.div`
    padding: 6px;
    strong {
        border-radius: 0;
        font-weight: bold;
        border: 2px solid #ffff;
        color: #ffff;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        width: 30px;
        height: 26px;

        &:after {
            -webkit-transition: height .1s ease-out;
            -o-transition: height .1s ease-out;
            transition: height .1s ease-out;
            bottom: 100%;
            margin-bottom: 0;
            margin-left: -7px;
            height: 8px;
            width: 14px;
            left: 50%;
            content: ' ';
            position: absolute;
            pointer-events: none;
            border: 2px solid #ffff;
            border-top-left-radius: 99px;
            border-top-right-radius: 99px;
            border-bottom: 0;
        }
    }

    &:hover strong {
        color: #000;
        background-color: white;
        &::after {
            height: 10px;
        }
    }
`
interface NavbarProps {
    products: CartSlideState[]
}
const Navbar = ({products} : NavbarProps) => {
    const { data: session, status } = useSession();
    const [isModalMenu, setIsModalMenu] = useState(false);

    const { SignInModal, setIsShowModal } = useSignInModal();

    const matchesMobile = useMediaQuery("(max-width: 768px)");

    return (
        <>
            <SignInModal />
            {/* <ButtonDarkMode /> */}
            <div className="relative ml-auto mr-3">
                <Link href={`/gio-hang`}>
                    <TagCartStyle>
                        <strong>{products?.length}</strong>
                    </TagCartStyle>
                </Link>
            </div>                
            {!matchesMobile ? (
                <>
                    {
                        session ? (
                            <UserDropdown session={session}/>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsShowModal(true)}
                                    className="px-2 py-1 rounded-sm border border-white text-white transition-all hover:bg-white/95 hover:text-black"
                                >
                                    Đăng nhập
                                </button>   
                            </>
                        )
                    }
                </>
            ) : (
                <>
                    <button
                        className="hover:bg-white/20 rounded-full p-1"
                        onClick={() => setIsModalMenu(true)}
                    >
                        <i className="block p-1">
                            <IconBars className="w-7 h-7 fill-white block" />
                        </i>
                    </button>
                    <ModalMenu
                        isShow={isModalMenu}
                        setIsShowModal={setIsShowModal}
                        setIsShow={setIsModalMenu}
                    />
                </>
            )}
        </>
    );
};

export default Navbar;
