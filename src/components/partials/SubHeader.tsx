import Link from "next/link";


interface SubHeaderProps {
    path: string
}
const SubHeader = ({ path }: SubHeaderProps) => {

    return (
        <div className="bg-slate-900 text-white md:block hidden">
            <div className="max-w-screen-xl mx-auto px-3 py-1">
                <ul className="flex items-center [&>li>a>span]:py-2 [&>li>a>span]:block gap-3">
                    <li className="font-medium">
                        <Link href={`/`}>
                            <span className={`${path === "/" && "border-b-2"}`}>Trang chủ</span>
                        </Link>
                    </li>
                    <li className="font-medium">
                        <Link href={`/`}>
                            <span className={`${path === "" && "border-b-2"}`}>Sản phẩm</span>
                        </Link>
                    </li>
                    <li className="font-medium">
                        <Link href={`/bai-viet`}>
                            <span className={`${(path === "/bai-viet/[slugBlog]" || path === "/bai-viet")  && "border-b-2"}`}>Blog</span>
                        </Link>
                    </li>
                    <li className="font-medium">
                        <Link href={`/`}>
                            <span className={`${path === "" && "border-b-2"}`}>Hệ thống cửa hàng</span>
                        </Link>
                    </li>

                    <li className="ml-auto">
                        <Link href={`/`}>
                            <span className={`${path === "" && "border-b-2"}`}>vesmart98@gmail.com</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/`}>
                            <span className={`${path === "" && "border-b-2"}`}>Đà Nẵng: 0971183153</span>
                        </Link>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default SubHeader;