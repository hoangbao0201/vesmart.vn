import Link from "next/link";
import { useState } from "react";

import styled from "styled-components";
import { useMediaQuery } from "usehooks-ts";
import { useSession } from "next-auth/react";

import ModalMenu from "./ModalMenu";
import UserDropdown from "../UserDropdown";
import { useSignInModal } from "./SignInModal";
import { IconBars } from "../../../../public/static/icons/IconSvg";


const TagCartStyle = styled.div`
    padding: 6px;
    strong {
        border-radius: 0;
        font-weight: bold;
        border: 2px solid #172554;
        color: #172554;
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
            border: 2px solid #172554;
            border-top-left-radius: 99px;
            border-top-right-radius: 99px;
            border-bottom: 0;
        }
    }

    &:hover strong {
        color: white;
        background-color: #172554;
        &::after {
            height: 10px;
        }
    }
`
interface NavbarProps {
}
const Navbar = ({} : NavbarProps) => {
    const { data: session, status } = useSession();
    const [isModalMenu, setIsModalMenu] = useState(false);
    
    const { SignInModal, setIsShowModal } = useSignInModal();

    const matchesMobile = useMediaQuery("(max-width: 768px)");

    return (
        <>
            <SignInModal />
                        
            {!matchesMobile ? (
                <>
                    {
                        session ? (
                            <UserDropdown session={session}/>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsShowModal(true)}
                                    className="px-2 py-1 text-blue-950 border border-blue-950 rounded-sm hover:bg-gray-50"
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
                            <IconBars className="w-7 h-7 fill-blue-500 block" />
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
