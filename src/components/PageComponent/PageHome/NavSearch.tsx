import { ChangeEvent, useEffect, useState } from "react";
import { IconClose, IconMagnifyingGlass } from "../../../../public/static/icons/IconSvg";
import { useDebounce } from "usehooks-ts";
import blogService from "@/serverless/blog.service";
import productService from "@/serverless/product.service";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";


interface ListProductResProps {
    id: string
    title: string
    slug: string
    images: [
        {
            url: string
        }
    ]
}

const NavSearch = () => {

    const [valueInputSearch, setValueInputSearch] = useState<string>("");
    const [listResultProducts, setListResultProducts] = useState<null | ListProductResProps[]>(null);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const textDebounce = useDebounce(valueInputSearch, 500);

    const eventSearchProducts = async (value: string) => {
        try {
            const productsRes = await axios(`/api/blog/get?search=${value}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (productsRes?.data.success) {
                setListResultProducts(productsRes.data.products);
            }
            else {
                setListResultProducts([])
            }
            
            setIsLoadingSearch(false);
        } catch (error) {
            setListResultProducts([]);
            setIsLoadingSearch(false);
        }
    };

    const handleOnchangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInputSearch(e.target.value)
        setIsLoadingSearch(true);
    }

    const handleDeleteSearch = () => {
        setValueInputSearch("");
        setListResultProducts(null);
    }

    useEffect(() => {
        if (textDebounce === "") {
            setListResultProducts(null);
        } else if (textDebounce) {
            eventSearchProducts(textDebounce);
        }

    }, [textDebounce]);

    return (
        <div className="-mx-3 md:px-3">
            <nav className="relative flex items-center bg-white w-full border-b h-11">
                <input
                    value={valueInputSearch}
                    onChange={handleOnchangeValueInput}
                    className="py-3 px-3 w-full outline-none"
                    placeholder="Nhập tên sản phẩm cần tìm"    
                />

                {
                    textDebounce.length > 0 && (
                        isLoadingSearch ? (
                            <span className={`loading-search`}></span>
                        ) : (
                            <i
                                onClick={handleDeleteSearch}
                                className="hover:bg-gray-200 p-1 rounded-full cursor-pointer"
                            >
                                <IconClose
                                    className="w-5 h-5 block"
                                />
                            </i>
                        )
                    )
                }

                <button className="px-3 h-11 hover:bg-slate-200">
                    <IconMagnifyingGlass 
                        className="w-5 h-5 block fill-blue-600"
                    />
                </button>
                {
                    valueInputSearch.length > 0 && (
                        <div className="bg-white absolute z-10 top-11 w-full px-3 py-4 shadow-lg max-h-52 overflow-y-auto">
                            <div className="font-semibold text-sm">Kết quả tìm kiếm</div>
                            <ul>
                                {
                                    listResultProducts && listResultProducts?.length > 0 ? (
                                        listResultProducts?.map((product, index) => {
                                            return (
                                                <li className="border-b" key={product.id}>
                                                    <Link href={`/san-pham/${product.slug}`}>
                                                        <div className="flex py-2">
                                                            <Image
                                                                width={80}
                                                                height={80}
                                                                alt={`ảnh ${product.title}`}
                                                                src={product.images[0].url}
                                                                className="w-12 h-12 block object-cover"
                                                            />
                                                            <p className="ml-3">{product.title}</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    ) : (
                                        <li>{!isLoadingSearch && "Không tìm thấy"}</li>
                                    )
                                }
                            </ul>
                        </div>
                    )
                }
            </nav>
        </div>
    )
}

export default NavSearch;