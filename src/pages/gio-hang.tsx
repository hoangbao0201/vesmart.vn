import Image from "next/image"

import { NextPageWithLayout } from "./_app";
import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";

const CartPage : NextPageWithLayout = () => {

    return (
        <>
            <div className="lg:max-w-screen-xl max-w-screen-sm w-full mx-auto">
                <h1 className="font-semibold text-lg py-3 mb-3 border-b">Giỏ hàng của bạn</h1>
                <div className="lg:flex -mx-3">

                    <div className="lg:w-8/12 px-3 min-h-[100px]">

                        {/* {
                            [1,2,3,4,5].map(item => {
                                return (
                                    <div key={item} className="relative flex mb-3 pb-3 border-b">
                                        <div>
                                            <Image
                                                width={100}
                                                height={100}
                                                alt="Ảnh sản phẩm"
                                                src="https://image.folderstyle.com/data/folderstyle_data/images/product/00/00/05/76/74/b_0000057674.gif?w=243&f=webp"
                                                className="w-full bg-gray-100 overflow-hidden object-cover"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-semibold text-lg mb-5">Sữa bột Friso Gold số 4 hương vani 850g (2 - 6 tuổi)</p>
                                            <p className="mb-3">Số lượng 12</p>
                                            <p className="font-semibold">Giá 12.606.000 VND</p>
                                        </div>
                                    </div>
                                )
                            })
                        } */}
                        <div>Bạn chưa thêm sản phẩm nào vào giỏ hang! <Link href={`/`} className="text-sky-600 underline whitespace-nowrap">Mua ngay</Link></div>

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