import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "usehooks-ts";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import IconMagnifyingGlass from "@/components/modules/icons/IconMagnifyingGlass";
import ModalDialog from "@/components/share/ModalDialog";
import IconClose from "@/components/modules/icons/IconClose";
import IconChevronRight from "@/components/modules/icons/IconChevronRight";


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
    const inputRef = useRef<HTMLInputElement>(null);

    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const [isModalSearch, setIsModalSearch] = useState<boolean>(false);
    const [valueInputSearch, setValueInputSearch] = useState<string>("");
    const [listResultProducts, setListResultProducts] = useState<null | ListProductResProps[]>(null);

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

    // Handle Delete Search
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
        <>
            <div
                onClick={() => {
                    setIsModalSearch(true);
                    inputRef.current?.focus();
                }}
                className="flex items-center md:flex-1 md:py-2 py-3 md:px-3 mx-3 select-none md:cursor-text cursor-pointer border md:rounded-sm rounded-full bg-gray-200 fill-gray-500 text-gray-500"
            >
                <IconMagnifyingGlass size={15} className="md:mr-2 mx-3" /> 
                <span className="md:block hidden">Tìm kiếm sản phẩm trên VESMART...</span>
            </div>
            {/* <div className="-mx-3 md:px-3">
                <nav className="relative flex items-center bg-white w-full border-b h-11">
    
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
                                                                    unoptimized
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
            </div> */}
            <ModalDialog
                title="Tìm kiếm"
                isOpen={isModalSearch}
                setIsOpen={setIsModalSearch}
                size="large"
            >
                <div className="mb-4">
                    <div className="border-b flex items-center">
                        <i>
                            <IconMagnifyingGlass className="fill-gray-500"/>
                        </i>
                        <input
                            ref={inputRef}
                            value={valueInputSearch}
                            onChange={handleOnchangeValueInput}
                            className="w-full outline-none border-none py-2 px-2 bg-transparent"
                            placeholder="Tìm kiếm theo tên sản phẩm, loại..."
                        />

                        {textDebounce !== "" &&
                            (isLoadingSearch ? (
                                <span className="loading-search"></span>
                            ) : (
                                <i
                                    onClick={() => {
                                        setValueInputSearch("");
                                        setListResultProducts([]);
                                    }}
                                    className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"
                                >
                                    <IconClose />
                                </i>
                            ))}
                    </div>
                    <div
                        style={{ height: "2px" }}
                        className={`loading-bar ${
                            !isLoadingSearch && "before:content-none"
                        }`}
                    ></div>
                </div>
                <ul className="flex-auto overflow-y-auto px-2">
                    {listResultProducts && listResultProducts.map((product) => {
                        return (
                            <li
                                key={product?.id}
                                className="rounded-md mb-2 bg-gray-50 dark:bg-slate-800/70 group hover:bg-blue-500 hover:text-white"
                            >
                                <Link
                                    onClick={() => setIsModalSearch(false)}
                                    href={`/san-pham/${product?.slug}-${product?.id}`}
                                >
                                    <div className="flex items-center px-4 py-3">
                                        <span className="border rounded-md px-[7px] py-[1px]">
                                            #
                                        </span>
                                        <p className="ml-3">{product?.title}</p>
                                        <IconChevronRight
                                            size={15}
                                            className="ml-auto fill-gray-800 group-hover:fill-white"
                                        />
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </ModalDialog>
        </>
    )
}

export default NavSearch;