import Link from "next/link";
import Image from "next/image";
import { IGetProductList } from "@/services/product/product.type";

interface ProductCardProps {
    product: IGetProductList;
}

export default function ProductCard({ product }: ProductCardProps) {
    const displayPrice = product.variants[0].price || 0;
    const finalPrice = product.variants[0].discountPercent
        ? displayPrice * (1 - product.variants[0].discountPercent / 100)
        : displayPrice;

    return (
        <Link
            href={`/san-pham/${product.slug ? `${product.slug}-` : ''}${product.productId}`}
            title={product?.name}
            className="block group overflow-hidden bg-white border border-transparent hover:border-blue-600 hover:translate-y-[-5px] translate-y-0 hover:shadow-lg transition-all duration-300 relative"
        >
            <div className="relative">
                {product.images[0].image?.url ? (
                    <div className="w-full aspect-square overflow-hidden">
                        <Image
                            unoptimized
                            width={500}
                            height={500}
                            alt={`${product.name} - ảnh sản phẩm`}
                            src={product.images[0].image?.url}
                            loading="lazy"
                            className="w-full h-full transition-all duration-300 object-cover object-center"
                        />
                    </div>
                ) : (
                    <div className="w-full aspect-square bg-gray-200"></div>
                )}
                {!!product.variants[0].discountPercent && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold z-10">
                        -{product.variants[0].discountPercent}%
                    </div>
                )}
                {!!product?.isFeatured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-semibold z-10">
                        Nổi bật
                    </div>
                )}
            </div>
            <div className="py-3 px-3 flex flex-col">
                <h3 className="mb-3 h-14 font-medium text-lg line-clamp-2">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="">
                    {product.variants[0].price ? (
                        <div className="flex items-center gap-2 text-lg">
                            <div className="text-red-600 font-bold mb-1">
                                {product.variants[0].price.toLocaleString("vi-VN")}₫
                            </div>
                            {!!product.variants[0].discountPercent && (
                                <span className="inline-block bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    Giảm {product.variants[0].discountPercent}%
                                </span>
                            )}
                        </div>
                    ) : (
                        <div className="py-2 px-3 w-full rounded-md text-center text-white bg-blue-600 font-bold text-base mb-1">
                            Liên hệ
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
