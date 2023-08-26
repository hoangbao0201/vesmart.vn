import Link from "next/link";
import Image from "next/image"

import { useDispatch, useSelector } from "react-redux";
import { CartSlideState, removeCartHandle } from "@/redux/cartSlice";

import { NextPageWithLayout } from "./_app";
import convertPrice from "@/utils/convertPrice";
import ClientOnly from "@/components/share/ClientOnly";
import MainLayout from "@/components/layouts/MainLayout";



const CartPage : NextPageWithLayout = () => {

    const dispatch = useDispatch();
    const { products } : { products: CartSlideState[] } = useSelector(
        (state: any) => state.cart
    );

    const handleRemoveProductCart = (id: string) => {
        if(products?.length <= 0 || !id) {
            return;
        }

        const setCart = products.filter(product => product.id !== id);

        dispatch(removeCartHandle(setCart));
    }

    return (
        <>
            <div className="lg:max-w-screen-xl max-w-screen-sm w-full mx-auto">
                <h1 className="font-semibold text-lg py-3 mb-3 border-b">Giỏ hàng của bạn</h1>
                <div className="lg:flex -mx-3">

                    <div className="lg:w-8/12 px-3 min-h-[100px]">

                        <ClientOnly>
                            {
                                products?.length ? (
                                    products.map(product => {
                                        return (
                                            <div key={product.id} className="relative flex mb-3 pb-3 border-b">
                                                <div className="w-1/5">
                                                    <Image
                                                        width={200}
                                                        height={200}
                                                        alt="Ảnh sản phẩm"
                                                        src={product?.image}
                                                        className="w-full bg-gray-100 overflow-hidden object-cover"
                                                    />
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <p className="font-semibold text-lg mb-5">{product?.name}</p>
                                                    <p className="mb-3">Số lượng {product?.count}</p>
                                                    <p className="font-semibold">Giá {convertPrice(product?.price * product?.count)} VND</p>
                                                </div>
                                                <button onClick={() => handleRemoveProductCart(product.id)} className="hover:bg-white/40 px-2">xóa</button>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div>Bạn chưa thêm sản phẩm nào vào giỏ hang! <Link href={`/`} className="text-sky-600 underline whitespace-nowrap">Mua ngay</Link></div>
                                )
                            }
                        </ClientOnly>
                        
                    </div>

                    <div className="lg:w-4/12 px-3">
                        <div className="px-4 py-6 bg-white border">
                            <div className="py-5 my-3 border-t font-semibold text-orange-500 border-orange-500">TỔNG TIỀN</div>
                            <div>
                                <div className="flex justify-between font-medium mb-3">
                                    <span>Tạm tính</span>
                                    <span>37.818.000 VND</span>
                                </div>
                                <input
                                    placeholder=" Mã giới thiệu"
                                    className="border-b w-full outline-none py-2 px-1"
                                />
                                <div className="mb-3 mt-2 text-sm text-gray-500">(Chưa bao gồm phí vận chuyển)</div>
                            </div>

                            <div className="py-5 my-3 border-t font-semibold text-orange-500 border-orange-500">THÔNG TIN KHÁCH HÀNG</div>
                            <input
                                placeholder=" Họ và tên"
                                className="border-b w-full outline-none py-1 px-1 mb-4"
                            />
                            <input
                                placeholder=" Số điện thoại"
                                className="border-b w-full outline-none py-1 px-1 mb-4"
                            />

                            <button className="font-semibold uppercase mt-5 py-3 w-full text-white bg-black">Đặt hàng</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage;

CartPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};