"use client";

import Link from "next/link";
import Image from "next/image";

import { toast } from "sonner";
import { useSession } from "next-auth/react";

import IconTrash from "../../icons/IconTrash";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart, removeCartItem, selectCartItems } from "@/store/cart";
import convertPrice from "@/utils/convertPrice";
import { createOrderApi } from "@/services/order/order.api";

const CartTemplate = () => {
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectCartItems);

    const handleDeleteProduct = (itemKey: string) => {
        dispatch(removeCartItem({ itemKey }));
    }

    const handleBuyNow = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get("name") as string;
            const phone = formData.get("phone") as string;
            const address = formData.get("address") as string;

            const createOrderResponse = await createOrderApi({
                body: {
                    info: {
                        name: name,
                        phone: phone,
                        address: address,
                    },
                    items: products,
                    userId: session?.user?.userId,
                },
            });

            if (createOrderResponse?.orderId) {
                toast.success("Đặt hàng thành công", {
                    duration: 1500,
                });
                dispatch(clearCart());
            }
            else {
                toast.error("Đặt hàng thất bại", {
                    duration: 1500,
                });
            }
        } catch (error) {
            // console.error(error);
        }
    }

    return (
        <div className="py-4 container max-w-7xl mx-auto">
            <div className="flex lg:flex-row flex-col gap-3">
                <section className="px-5 py-4 border border-gray-200 bg-white lg:w-7/12 w-full lg:rounded-lg" aria-labelledby="cart-items-heading">
                    <div className="">
                        <h2 id="cart-items-heading" className="text-lg font-semibold mb-5 uppercase">
                            Sản phẩm trong giỏ
                        </h2>

                        <div className="flex flex-col gap-1">
                            {products.map((product) => (
                                <div key={`${product.productId}-${product.variantId}`} className="px-3 py-2 border border-gray-200 rounded-lg flex items-center gap-3 bg-gray-100">
                                    <Image
                                        src={product.productImage || ""}
                                        alt={`Ảnh sản phẩm: ${product.productName}`}
                                        width={100}
                                        height={100}
                                        loading="lazy"
                                        className="w-10 h-10 object-cover"
                                    />
                                    <div className="flex flex-col gap-1 flex-1">
                                        <div className="flex items-center justify-between gap-3">
                                            <h3 className="text-sm font-semibold line-clamp-2">{product.productName}</h3>

                                            <button onClick={() => handleDeleteProduct(`${product.itemKey}`)} className="cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full">
                                                <IconTrash className="w-8 h-8 p-2 fill-gray-500" />
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {
                                                (product.selectedOptions?.length ?? 0) > 0
                                                    ? (product.selectedOptions ?? [])
                                                        .map(
                                                            (option) =>
                                                                `${option.optionName}: ${option.valueLabel}`,
                                                        )
                                                        .join(", ")
                                                    : ""
                                            }
                                        </p>
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-sm text-gray-500">{convertPrice(product.variantPrice)}</p>

                                            <Link
                                                title="Xem chi tiết"
                                                href={`/san-pham/${product.productSlug ? `${product.productSlug}-` : ""}${product.productId}`}
                                                className="text-sm font-semibold text-blue-900 hover:text-blue-500"
                                            >
                                                Xem chi tiết
                                            </Link>
                                        </div>

                                    </div>

                                </div>
                            ))}

                            <div className="mt-5 flex justify-between items-center bg-gradient-to-r from-gray-300 to-slate-200 px-3 py-2 rounded-lg border border-gray-200">
                                <p className="text-md text-black font-semibold">Tổng tiền</p>
                                <p className="font-bold text-blue-900">
                                    {convertPrice(products.reduce((acc, product) => acc + product.variantPrice, 0))}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-5 py-4 border border-gray-200 bg-white lg:w-5/12 w-full lg:rounded-lg" aria-labelledby="checkout-heading">
                    <div className="">
                        <h2 id="checkout-heading" className="text-lg font-semibold mb-5 uppercase">
                            Thông tin khách hàng
                        </h2>

                        <form onSubmit={handleBuyNow} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-3">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-semibold"
                                >
                                    Họ và tên
                                </label>
                                <input
                                    required
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label
                                    htmlFor="phone"
                                    className="text-sm font-semibold"
                                >
                                    Số điện thoại
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label
                                    htmlFor="address"
                                    className="text-sm font-semibold"
                                >
                                    Địa chỉ cụ thể
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    id="address"
                                    name="address"
                                    placeholder="Nhập địa chỉ cụ thể"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="text-sm bg-gray-100 px-3 py-2 rounded-lg border border-gray-200">
                                Liên hệ Zalo để được hỗ trợ nhanh nhất: <Link
                                    target="_blank"
                                    href="https://zalo.me/0971183153"
                                    className="font-semibold text-blue-800 hover:text-blue-500"
                                >0971.183.153</Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full cursor-pointer px-3 py-3 border border-gray-200 rounded-lg bg-blue-900 text-white hover:bg-blue-800"
                            >
                                Đặt hàng
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CartTemplate;