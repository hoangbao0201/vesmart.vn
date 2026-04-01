import Link from "next/link";

import IconCart from "../../icons/IconCart";
import { selectCartItems } from "@/store/cart";
import { useAppSelector } from "@/store/hooks";

const NavCart = () => {
    const products = useAppSelector(selectCartItems);

    return (
        <Link
            href="/gio-hang"
            title="Giỏ hàng"
            aria-label="Giỏ hàng"
            className="w-10 h-10 relative bg-slate-600 hover:bg-slate-500 rounded-full transition-colors inline-flex items-center justify-center"
        >
            <IconCart className="w-10 h-10 p-3 fill-white" aria-hidden />
            {products.length > 0 && (
                <span className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                    {products.length > 9 ? "9+" : products.length}
                </span>
            )}
        </Link>
    )
}

export default NavCart;