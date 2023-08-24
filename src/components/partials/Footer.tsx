import Link from "next/link";


const Footer = () => {

    return (
        <footer className="">
            <div className="w-full md:flex py-5 bg-white border-t border-gray-200">

                <div className="px-3 md:w-4/12 mb-5" itemScope itemType="http://schema.org/Organization">
                    <div className="text-xl font-semibold mb-4">
                        <Link itemProp="url" title="vesmart" href={`/`}>
                            VESMART
                        </Link>
                    </div>
                    <p>Copyright © 2022 VESMART</p>
                </div>
                <div className="px-3 md:w-8/12 mb-5">
                    <h4 className="text-xl font-semibold mb-4">Từ khóa</h4>
                    <ul className="flex flex-wrap gap-2">
                        <li><Link className="border px-2 border-gray-300 rounded-sm" href={`/`}>Đà Nẵng</Link></li>
                        <li><Link className="border px-2 border-gray-300 rounded-sm" href={`/`}>limosa.vn</Link></li>
                        <li><Link className="border px-2 border-gray-300 rounded-sm" href={`/`}>toplist.vn</Link></li>
                        <li><Link className="border px-2 border-gray-300 rounded-sm" href={`/`}>Robot hút bụi</Link></li>
                        <li><Link className="border px-2 border-gray-300 rounded-sm" href={`/`}>AZ Smart Home</Link></li>
                        <li><Link className="border px-2 border-gray-300 rounded-sm" href={`/`}>Phụ kiện điện tử</Link></li>
                        <li><Link className="border px-2 border-gray-300 rounded-sm" href={`/`}>Linh kiện điện tử</Link></li>
                        <li><Link className="border px-2 border-gray-300 rounded-sm" href={`/`}>sửa chữa robot hút bụi đà nẵng</Link></li>
    
                        
    
                    </ul>
                </div>

            </div>
        </footer>
    )
}

export default Footer;