import { ReactNode } from "react";
import Image from "next/image";
import { styled } from "styled-components";
import Link from "next/link";
import siteMetadata from "@/siteMetadata";

const ButtonContactStyles = styled.div`
    z-index: 11;
    width: 80px;
    height: 80px;
    cursor: pointer;
    visibility: visible;
    background-color: transparent;
    transition: visibility 0.5s;
    left: 0;
    bottom: 0;
    display: block;

    & > span {
        width: 64px;
        height: 64px;
        top: 8px;
        left: 8px;
        position: absolute;
        opacity: 0.7;
        box-shadow: 0 0 0 0 #35bee8;
        background-color: #35bee8;
        border-radius: 50%;
        border: 2px solid transparent;
        transition: all 0.5s;
        transform-origin: 50% 50%;
        animation: zoom 1.3s infinite;
    }

    & > div {
        animation: phone-vr-circle-fill 4s infinite ease-in-out;
    }
`;

interface ButtonContactProps {
    children?: ReactNode;
}

const ButtonContact = ({ children }: ButtonContactProps) => {
    return (
        <>
            <div className="fixed left-3 bottom-3 flex flex-col items-center">

                <ButtonContactStyles>
                    <span>
                    </span>
                    <div className="flex items-center justify-center bg-blue-500 top-[18px] left-[18px] w-11 h-11 rounded-full overflow-hidden absolute leading-10">
                        <Link href={`https://zalo.me/${siteMetadata?.phone || "0971183153"}`} target="_blank">
                            <Image
                                width={30}
                                height={30}
                                alt="Image zalo"
                                src={`/static/images/icon-zalo.png`}
                                className="w-6 h-6 object-cover flex-shrink-0"
                            />
                        </Link>
                    </div>
                </ButtonContactStyles>
                <span className="text-white font-semibold bg-blue-500 px-2 rounded-md">Liên hệ</span>
            </div>
        </>
    );
};

export default ButtonContact;
