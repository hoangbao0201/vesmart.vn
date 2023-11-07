import Link from "next/link";
import { IconNewSpaper, IconPackageSearch } from "../../../public/static/icons/IconSvg";

const Navbar = () => {
    return (
        <div className="top-[60px] absolute bg-white w-full left-0 right-0">
            <div className="flex items-center max-w-7xl mx-auto px-3 py-2">
                
                <p>
                    <Link
                        href={"/"}
                        className="hover:underline bg-white px-3 py-1 flex items-center border rounded-sm"
                    >
                        <IconPackageSearch className="w-4 h-4 mr-1"/>
                        Sản phẩm
                    </Link>
                </p>
                <p className="ml-2">
                    <Link
                        href={"/bai-viet"}
                        className="hover:underline bg-white px-3 py-1 flex items-center border rounded-sm"
                    >
                        <IconNewSpaper className="w-4 h-4 mr-1 fill-black"/>
                        Bài viết
                    </Link>
                </p>

                <div className="ml-auto">
                    <strong>Liên hệ:</strong> {" "}
                    <span className="">
                        0971183153
                    </span>
                </div>

            </div>
        </div>
    )
}

export default Navbar;