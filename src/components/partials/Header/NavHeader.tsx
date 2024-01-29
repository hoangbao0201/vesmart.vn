import Link from "next/link";

import styled from "styled-components";
import { useSelector } from "react-redux";

import Navbar from "./Navbar";
import NavSearch from "./NavSearch";
import { CartSlideState } from "@/redux/cartSlice";

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

const NavHeader = () => {
    const { products }: { products: CartSlideState[] } = useSelector(
        (state: any) => state.cart
    );

    return (
        <>
            <NavSearch />

            <div className="relative ml-auto mr-3">
                <Link href={`/gio-hang`}>
                    <TagCartStyle>
                        <strong>{products?.length}</strong>
                    </TagCartStyle>
                </Link>
            </div>

            <Navbar />
        </>
    )
}

export default NavHeader;