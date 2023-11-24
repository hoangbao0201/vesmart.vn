import Link from "next/link";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

import { CartSlideState } from "@/redux/cartSlice";
import {
    IconMail,
    IconPhone,
} from "../../../public/static/icons/IconSvg";
import { useMediaQuery } from "usehooks-ts";
import ClientOnly from "../share/ClientOnly";
// import MainNav from "./MainNav";

const Navbar = dynamic(() => import("@/components/partials/Navbar"), {
    ssr: false,
});
const MainNav = dynamic(() => import("./MainNav"), {
    ssr: false,
});

const Header = () => {
    const { products }: { products: CartSlideState[] } = useSelector(
        (state: any) => state.cart
    );
    const matchesMobile = useMediaQuery("(max-width: 768px)");

    return (
        <>
            <div className="bg-blue-600/80 py-1 text-white border-b border-t-4 border-white md:hidden">
                <ul className="flex justify-center space-x-2 line-clamp-1 [&>li>a]:flex [&>li>a]:items-center">
                    <li>
                        <Link href={`mailto:vesmart98@gmail.com`}>
                            <i className="mr-1">
                                <IconMail className="w-4 h-4 block fill-white" />
                            </i>
                            <span>vesmart98@gmail.com</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`tel:0971183153`}>
                            <i className="mr-1">
                                <IconPhone className="w-4 h-4 block fill-white" />
                            </i>
                            <span>0971183153</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <header
                className={`z-50 top-0 left-0 right-0 bg-[#0084ff] border-b border-gray-200 shadow-sm transition-all`}
            >
                <div className="flex items-center max-w-screen-xl mx-auto px-3 h-[60px]">
                    <Link title="vesmart" href={`/`}>
                        <p className="text-white leading-[60px] font-bold text-2xl select-none">
                            VESMART
                        </p>
                    </Link>

                    <Navbar products={products} />
                </div>
            </header>
            
            <ClientOnly>
                {
                    !matchesMobile && (
                        <nav className="bg-white w-full left-0 right-0 md:block hidden">
                            <MainNav />
                        </nav>
                    )
                }
            </ClientOnly>
        </>
    );
};

export default Header;
