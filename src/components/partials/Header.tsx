import Link from "next/link";


const Header = () => {

    return (
        <header className="fixed z-50 top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-screen-xl mx-auto px-3 h-[60px] overflow-hidden">
                <Link title="vesmart" href={`/`}>
                    <p className="leading-[60px] font-bold text-2xl">VESMART</p>
                </Link>
            </div>
        </header>
    )
}

export default Header;