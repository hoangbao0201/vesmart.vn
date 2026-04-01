import Link from "next/link";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import IconXmark from "../../icons/IconXmark";
import { useDebounceValue } from "usehooks-ts";
import ModalDialog from "@/components/share/ModalDialog";
import IconMagnifyingGlass from "../../icons/IconMagnifying-glass";

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
    const [allProducts, setAllProducts] = useState<ListProductResProps[]>([]);
    const [listResultProducts, setListResultProducts] = useState<null | ListProductResProps[]>(null);

    const [textDebounce] = useDebounceValue(valueInputSearch, 500);

    const fetchAllProducts = async () => {
    };

    const handleOnchangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInputSearch(e.target.value)
        setIsLoadingSearch(true);
    }

    // Load toàn bộ danh sách sản phẩm khi vừa vào trang
    useEffect(() => {
        fetchAllProducts();
    }, []);

    useEffect(() => {
        if (textDebounce === "") {
            setListResultProducts(allProducts);
            setIsLoadingSearch(false);
        } else if (textDebounce) {
            const text = textDebounce.toLowerCase();
            const filtered = allProducts.filter((product) =>
                product.title.toLowerCase().includes(text),
            );
            setListResultProducts(filtered);
            setIsLoadingSearch(false);
        }

    }, [textDebounce, allProducts]);

    return (
        <>
            <button
                type="button"
                aria-label="Mở tìm kiếm sản phẩm"
                onClick={() => {
                    setIsModalSearch(true);
                    inputRef.current?.focus();
                }}
                className="w-10 h-10 cursor-pointer relative bg-slate-600 hover:bg-slate-500 rounded-full transition-colors"
            >
                <IconMagnifyingGlass className="w-10 h-10 p-3 fill-white" aria-hidden />
            </button>
            <ModalDialog
                size="large"
                title="Tìm kiếm"
                isOpen={isModalSearch}
                setIsOpen={setIsModalSearch}
            >
                <div className="mb-4">
                    <div className="px-3 bg-gray-200 rounded-md flex items-center">
                        <IconMagnifyingGlass className="w-6 h-6 p-1 fill-gray-500"/>
                        <input
                            ref={inputRef}
                            value={valueInputSearch}
                            onChange={handleOnchangeValueInput}
                            className="w-full outline-none border-none py-2 px-2 bg-transparent"
                            placeholder="Tìm kiếm theo tên sản phẩm, loại..."
                        />

                        {textDebounce.trim() !== "" &&
                            (isLoadingSearch ? (
                                <span className="loading-search"></span>
                            ) : (
                                <i
                                    onClick={() => {
                                        setValueInputSearch("");
                                        setListResultProducts(allProducts);
                                    }}
                                    className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"
                                >
                                    <IconXmark />
                                </i>
                            ))}
                    </div>
                    {/* <div
                        style={{ height: "2px" }}
                        className={`loading-bar ${
                            textDebounce.trim() !== "" && "before:content-none"
                        }`}
                    ></div> */}
                </div>
                <ul className="flex-auto overflow-y-auto">
                    {listResultProducts && listResultProducts.map((product) => {
                        return (
                            <li
                                key={product?.id}
                                className="rounded-md mb-2 bg-gray-100 group hover:bg-blue-500 hover:text-white"
                            >
                                <Link
                                    onClick={() => setIsModalSearch(false)}
                                    href={`/san-pham/${product?.slug}-${product?.id}`}
                                >
                                    <div className="flex items-center px-4 py-3">
                                        <span className="">
                                            #
                                        </span>
                                        <p className="pl-6 flex-shink-0 ">{product?.title}</p>
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