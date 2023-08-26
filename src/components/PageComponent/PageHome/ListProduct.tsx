import Link from "next/link";
import Image from "next/image"

import { ProductTypes } from "@/types";
import convertPrice from "@/utils/convertPrice";

interface ListProductProps {
    products: ProductTypes[]
}

// [1,2,3,4,5,6,7,8,9,10,11,12]

const ListProduct = ({ products } : ListProductProps) => {

    // console.log(products)

    return (
        <div>
            <ul className="flex flex-wrap px-1">
                {
                    // products && [
                    //     products[0],
                    //     products[0],
                    //     products[0],
                    //     products[0],
                    //     products[0],
                    //     products[0],
                    //     products[0],
                    //     products[0],
                    //     products[0],
                    //     products[0],
                    //     products[0],
                    //     products[0],
                    //     products[0],
                    //     products[0],
                    // ]
                    products && products
                    .map((product, index) => {
                        return (
                            <li key={product.id + index} className="group transition-all ease-linear px-[5px] mb-3 xl:basis-2/12 md:basis-3/12 sm:basis-4/12 basis-1/2">
                                <Link href={`/san-pham/${product.slug}`} title={product?.title}>
                                    <article className="bg-white rounded-b-sm overflow-hidden border-[1px] group-hover:border-red-500">
                                        <div style={{ paddingTop: "100%" }} className="relative w-full bg-red-500">
                                            <Image
                                                width={300}
                                                height={300}
                                                alt="Ảnh sản phẩm"
                                                src={product.images[0].url}
                                                className="absolute w-full object-contain align-bottom top-0 left-0 bg-white opacity-1"
                                            />
                                            {/* <div className="absolute px-2 py-1 w-full bg-black/60 text-white/80 group-hover:bottom-0 -bottom-60 transition-all ease-out">HELLO</div> */}
                                        </div>
                                        <div className="px-2 py-3">
                                            <h3 className="line-clamp-2 text-black font-medium mb-3">
                                                {product?.title}
                                                {/* Móc khóa thú hàn quốc hàng cao cấp nhiều mẫu hot trend phụ kiện túi xách ArsC Store */}
                                            </h3>
                                            <div className="text-lg flex items-center mb-2">
                                                <span className="font-semibold text-rose-500 ">
                                                    {convertPrice(product?.skus[0]?.price || 0)}
                                                    {/* <sub className="top-0 ml-1">₫</sub> */}
                                                </span>
                                                {/* <span className="bg-gray-200 px-1 ml-auto pl-2">-20%</span> */}
                                            </div>
                                            <div className="text-gray-600 text-sm">TP. Đà Nẵng</div>
                                        </div>
                                    </article>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default ListProduct;