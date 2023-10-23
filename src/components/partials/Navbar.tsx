import Link from "next/link";

const Navbar = () => {
    return (
        <div className="top-[60px] absolute bg-white w-full left-0 right-0">
            <div className="flex max-w-7xl mx-auto px-3 py-2 space-x-2">
                
                <p>
                    <Link
                        href={"/"}
                        className="block hover:underline bg-white px-3 py-1 border rounded-sm"
                    >
                        Sản phẩm
                    </Link>
                </p>
                <p>
                    <Link
                        href={"/bai-viet"}
                        className="block hover:underline bg-white px-3 py-1 border rounded-sm"
                    >
                        Bài viết
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Navbar;