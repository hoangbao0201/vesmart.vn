import Link from "next/link";


const Header = () => {

    return (
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200">
            <div className="max-w-screen-xl mx-auto px-3">
                <Link title="vesmart" href={`/`}>
                    <p className="leading-[50px]">VESMART</p>
                </Link>
            </div>
        </header>
    )
}

export default Header;