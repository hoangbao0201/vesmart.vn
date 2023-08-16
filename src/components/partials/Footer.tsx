import Link from "next/link";


const Footer = () => {

    return (
        <footer className="">
            <div className="w-full py-5 text-center bg-white border-t border-gray-200">
                <Link title="vesmart" href={`/`}>
                    VESMART
                </Link>
            </div>
        </footer>
    )
}

export default Footer;