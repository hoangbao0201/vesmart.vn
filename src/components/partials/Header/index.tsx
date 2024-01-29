import Link from "next/link";
import dynamic from "next/dynamic";

const NavHeader = dynamic(() => import("./NavHeader"), {
    ssr: false,
});
// const NavSearch = dynamic(() => import("./NavSearch"), {
//     ssr: false,
// });
// const Navbar = dynamic(() => import("@/components/partials/Navbar"), {
//     ssr: false,
// });

interface HeaderProps {
    isDynamicHeader?: boolean
}
const Header = ({ isDynamicHeader }: HeaderProps) => {

    return (
        <>
            <header
                className={`${isDynamicHeader ? "sticky top-0 left-0 right-0 z-40" : ""} top-0 left-0 right-0 bg-white shadow-sm transition-all`}
            >
                <div className="flex items-center max-w-screen-xl mx-auto px-3 h-[52px]">

                    <Link href={`/`} title="VESMART">
                        <p className="text-white font-semibold uppercase bg-sky-950 rounded-sm px-2 py-1">
                            VESMART
                        </p>
                    </Link>

                    <NavHeader />
                </div>
            </header>
        </>
    );
};

export default Header;
