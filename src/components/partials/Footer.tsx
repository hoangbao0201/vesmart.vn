import Link from "next/link";


const Footer = () => {

    return (
        <footer className="bg-gray-900 border-t border-gray-200 text-white">
            <div className="max-w-screen-xl w-full md:flex py-5 mx-auto">

                <div className="px-3 md:w-4/12 mb-5" itemScope itemType="http://schema.org/Organization">
                    <div className="text-xl font-semibold mb-4">
                        <Link itemProp="url" title="vesmart" href={`/`}>
                            VESMART
                        </Link>
                    </div>
                    <p>Copyright © 2023 VESMART</p>
                </div>
                <div className="px-3 md:w-8/12 mb-5">
                    <h4 className="text-xl font-semibold mb-4">Từ khóa</h4>
                    <ul className="[&>li]:inline-block [&>li]:leading-10 [&>li]:mr-2">
                        <li><Link className="border px-2 py-1 border-gray-300 rounded-sm whitespace-nowrap" href={`/`}>Đà Nẵng</Link></li>
                        <li><Link className="border px-2 py-1 border-gray-300 rounded-sm whitespace-nowrap" href={`/`}>limosa.vn</Link></li>
                        <li><Link className="border px-2 py-1 border-gray-300 rounded-sm whitespace-nowrap" href={`/`}>toplist.vn</Link></li>
                        <li><Link className="border px-2 py-1 border-gray-300 rounded-sm whitespace-nowrap" href={`/`}>Robot hút bụi</Link></li>
                        <li><Link className="border px-2 py-1 border-gray-300 rounded-sm whitespace-nowrap" href={`/`}>AZ Smart Home</Link></li>
                        <li><Link className="border px-2 py-1 border-gray-300 rounded-sm whitespace-nowrap" href={`/`}>Phụ kiện điện tử</Link></li>
                        <li><Link className="border px-2 py-1 border-gray-300 rounded-sm whitespace-nowrap" href={`/`}>Linh kiện điện tử</Link></li>
                        <li><Link className="border px-2 py-1 border-gray-300 rounded-sm whitespace-nowrap" href={`/`}>sửa chữa robot hút bụi đà nẵng</Link></li>
    
                    </ul>
                </div>

            </div>
        </footer>
    )
}

export default Footer;