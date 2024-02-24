import Link from "next/link";
import Image from "next/image"

import { ProductTypes } from "@/types";
import convertPrice from "@/utils/convertPrice";

interface ListProductProps {
    title: string
    products: ProductTypes[]
}

const ListProduct = ({ title, products } : ListProductProps) => {

    return (
        <section className="my-4">
            <header className="flex items-end justify-between text-lg mb-3">
                <h3 className="font-semibold">{title}</h3>
                <Link href={'/'} className="text-blue-600 hover:underline text-base">Xem thêm (99+)</Link>
            </header>
            <ul className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2">
                {
                    products && products
                    .map((product, index) => {
                        return (
                            <li key={product.id + index} className="mb-1 group translate-y-0 hover:shadow-md">
                                <Link href={`/san-pham/${product?.slug}-${product?.id}`} title={product?.title}>
                                    <article className="transition-all ease-linear bg-white rounded-b-sm overflow-hidden border-[1px] group-hover:border-red-500">
                                        <div style={{ paddingTop: "100%" }} className="relative w-full bg-red-500">
                                            <Image
                                                unoptimized
                                                width={200}
                                                height={200}
                                                alt="Ảnh sản phẩm"
                                                src={product.images[0].url}
                                                className="absolute w-full object-contain align-bottom inset-0 bg-white opacity-1 transition-all"
                                            />
                                        </div>
                                        <div className="px-2 py-1">
                                            <h3 className="line-clamp-2 text-black font-medium mb-1">
                                                {product?.title}
                                            </h3>
                                            <div className="text-lg flex items-center mb-2">
                                                <span className="font-semibold text-rose-500 ">
                                                    {convertPrice(product?.skus[0]?.price || 0)}
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}

export default ListProduct;