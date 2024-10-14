import { ReactNode } from "react";
import Image from "next/image";
import { styled } from "styled-components";
import Link from "next/link";
import siteMetadata from "@/siteMetadata";

const ButtonContactStyles = styled.div<{ $primary?: string }>`
    z-index: 11;
    width: 70px;
    height: 70px;
    cursor: pointer;
    visibility: visible;
    background-color: transparent;
    transition: visibility 0.5s;
    left: 0;
    bottom: 0;
    display: block;
    position: relative;

    & > span {
        width: 60px;
        height: 60px;
        top: 4px;
        left: 4px;
        position: absolute;
        opacity: 0.7;
        box-shadow: 0 0 0 0 ${props => props?.$primary ? props?.$primary : "#35bee8"};
        background-color: ${props => props?.$primary ? props?.$primary : "#35bee8"};
        border-radius: 50%;
        border: 2px solid transparent;
        transition: all 0.5s;
        transform-origin: 50% 50%;
        animation: zoom 1.3s infinite;
    }

    & > div {
        top: 12px;
        left: 12px;
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
                <div className="top-[18px] left-[18px]">
                    <ButtonContactStyles $primary="#60a5fa">
                        <span></span>
                        <div className="flex items-center justify-center bg-blue-400 w-11 h-11 rounded-full overflow-hidden absolute leading-10">
                            <Link
                                href={`https://zalo.me/${
                                    siteMetadata?.phone || "0971183153"
                                }`}
                                target="_blank"
                            >
                                <Image
                                    // unoptimized
                                    width={30}
                                    height={30}
                                    alt="Image zalo"
                                    src={`/static/images/icon-zalo.png`}
                                    className="w-6 h-6 object-cover flex-shrink-0"
                                />
                            </Link>
                        </div>
                    </ButtonContactStyles>
                    <ButtonContactStyles $primary="#2563eb">
                        <span></span>
                        <div className="flex items-center justify-center bg-blue-600 w-11 h-11 rounded-full overflow-hidden absolute leading-10">
                            <Link
                                href={`https://zalo.me/${
                                    siteMetadata?.phone || "0971183153"
                                }`}
                                target="_blank"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                    width={30}
                                    height={30}
                                    className="p-1 fill-white"
                                >
                                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                </svg>
                            </Link>
                        </div>
                    </ButtonContactStyles>
                    <ButtonContactStyles $primary="#22c55e">
                        <span></span>
                        <div className="flex items-center justify-center bg-green-500 w-11 h-11 rounded-full overflow-hidden absolute leading-10">
                            <Link
                                href={`https://zalo.me/${
                                    siteMetadata?.phone || "0971183153"
                                }`}
                                target="_blank"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    width={30}
                                    height={30}
                                    className="p-1 fill-white"
                                >
                                    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                </svg>
                            </Link>
                        </div>
                    </ButtonContactStyles>
                </div>
                <span className="text-white font-semibold bg-blue-500 px-2 rounded-md">
                    Liên hệ
                </span>
            </div>
        </>
    );
};

export default ButtonContact;
