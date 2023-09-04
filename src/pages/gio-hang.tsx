import Link from "next/link";
import Image from "next/image"

import { useDispatch, useSelector } from "react-redux";
import { CartSlideState, removeCartHandle } from "@/redux/cartSlice";

import { NextPageWithLayout } from "./_app";
import convertPrice from "@/utils/convertPrice";
import ClientOnly from "@/components/share/ClientOnly";
import MainLayout from "@/components/layouts/MainLayout";
import axios from "axios";
import { ChangeEvent, useState } from "react";



const CartPage : NextPageWithLayout = () => {

    const dispatch = useDispatch();
    const { products } : { products: CartSlideState[] } = useSelector(
        (state: any) => state.cart
    );
    // const [name, setName] = useState("");
    // const [adress, setAdress] = useState("");
    // const [phone, setPhone] = useState("");
    // const [code, setCode] = useState("");
    // const [description, setDescription] = useState("");
    const [infoOreder, setInfoOreder] = useState({
        name: "",
        conscious: "",
        specificAdress: "",
        phone: "",
        code: "",
    })
    const [description, setDescription] = useState("");

    const handleRemoveProductCart = (id: string) => {
        if(products?.length <= 0 || !id) {
            return;
        }

        const setCart = products.filter(product => product.id !== id);

        dispatch(removeCartHandle(setCart));
    }
    const onChangeValueForm = (e : ChangeEvent<HTMLInputElement>) => {
        setInfoOreder({
            ...infoOreder,
            [e.target.name]: e.target.value
        })
    }

    const handleOrderProduct = async () => {
        if(products?.length <= 0) {
            return;
        }
        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // name: infoOreder.name,
                    // count: 
                    // adress: infoOreder.conscious.trim() + " - " + infoOreder.specificAdress.trim(),
                    // phone: infoOreder.phone,
                    // code: infoOreder.code,
                    // description: description,
                    // products: products.map(product => product.id)
                }),
            });

            // console.log(response);
    
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
    
            // const data = await response.json();
        } catch (error) {
        }
    }

    return (
        <>
            <div className="lg:max-w-screen-xl max-w-screen-sm w-full mx-auto">
                <h1 className="font-semibold text-lg py-3 mb-3 border-b">Giỏ hàng của bạn</h1>
                <div className="lg:flex -mx-3">

                    <ClientOnly>
                        <div className="lg:w-6/12 sm:px-3">
                            <div className="px-4 py-6 bg-white border">
                                <div className="pt-5 pb-2 mt-3 border-t text-lg font-semibold text-orange-500 border-orange-500">TỔNG TIỀN</div>
    
                                <ul className="mb-4">
                                    {
                                        products.length > 0 ? products.map(product => {
                                            return (
                                                <li className="flex border-b py-4" key={product.id}>
                                                    <div className="mr-2 border-r flex-1">
                                                        <p className="line-clamp-2 mb-3"><strong className="font-semibold">{product?.count}X</strong> {product.name}</p>
                                                        <div>
                                                            {
                                                                product?.variant.length > 0 && product.variant.map((itemVariant, index) => {
                                                                    return (
                                                                        <span key={index} className="mr-3">{itemVariant?.name}:{" "}<span className="border px-1 border-red-600 text-red-600">{itemVariant?.value}</span></span>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <span className="text-right whitespace-nowrap"><strong className="font-semibold">{product?.count}{" "}X{" "}</strong>{convertPrice(product?.price)}</span>
                                                </li>
                                            )
                                        }) : (
                                            <li>Chưa có sản phẩm nào trong giỏ hàng!</li>
                                        )
                                    }
                                </ul>
    
                                <div>
                                    <div className="flex justify-between font-medium mb-3">
                                        <span>Tạm tính:</span>
                                        <span>{convertPrice(products.reduce((sum, product) => sum + product.price*product.count, 0))}</span>
                                    </div>
                                    <div className="mb-3 mt-2 text-sm text-gray-500 text-right">(Chưa bao gồm phí vận chuyển)</div>
                                    <input
                                        placeholder=" Mã giới thiệu (không bắt buộc)"
                                        className="border border-gray-400 rounded-sm w-full focus:border-sky-600 outline-none py-2 px-3"
                                    />
                                </div>
    
                                <div className="py-5 my-3 border-t font-semibold text-orange-500 border-orange-500">THÔNG TIN KHÁCH HÀNG</div>
                                <input
                                    value={infoOreder.name}
                                    name="name"
                                    onChange={onChangeValueForm}
                                    placeholder="Họ và tên"
                                    className="border border-gray-400 rounded-sm w-full focus:border-sky-600 outline-none py-2 px-3 mb-4"
                                />
                                <input
                                    value={infoOreder.phone}
                                    name="phone"
                                    onChange={onChangeValueForm}
                                    placeholder="Số điện thoại"
                                    className="border border-gray-400 rounded-sm w-full focus:border-sky-600 outline-none py-2 px-3 mb-4"
                                />
                                <input
                                    value={infoOreder.conscious}
                                    name="conscious"
                                    onChange={onChangeValueForm}
                                    placeholder="Tỉnh"
                                    className="border border-gray-400 rounded-sm w-full focus:border-sky-600 outline-none py-2 px-3 mb-4"
                                />
                                <input
                                    value={infoOreder.specificAdress}
                                    name="specificAdress"
                                    onChange={onChangeValueForm}
                                    placeholder="Địa chỉ cụ thể"
                                    className="border border-gray-400 rounded-sm w-full focus:border-sky-600 outline-none py-2 px-3 mb-4"
                                />
    
                                <textarea
                                    value={description}
                                    name="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full min-h-[200px] border rounded-sm px-3 py-2 focus:border-sky-600 outline-none"
                                    placeholder="Ghi chú"
                                />

                                <div className="text-red-600">Tính năng đặt hàng đang trong quá trình thử nghiệm!</div>
                                <div className="text-red-600">Để mua hàng ngay có thể liên hệ trực tiếp qua <Link target="_blank" href={`https://zalo.me/0971183153`} className="underline text-blue-500">Zalo</Link></div>

                                <button disabled={true} onClick={handleOrderProduct} className="font-semibold uppercase mt-5 py-3 w-full text-white bg-black/60">Đặt hàng</button>
                                <div className="mt-3">
                                    Liên hệ bộ phận hỗ trợ tại <Link target="_blank" href={`https://zalo.me/0971183153`} className="underline text-blue-500">Zalo</Link>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-6/12 px-3 min-h-[100px]">
    
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
                                                    <p className="font-semibold">Giá {convertPrice(product?.price * product?.count)}</p>
                                                </div>
                                                <button onClick={() => handleRemoveProductCart(product.id)} className="hover:bg-white/40 px-2">xóa</button>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div>Bạn chưa thêm sản phẩm nào vào giỏ hàng! <Link href={`/`} className="text-sky-600 underline whitespace-nowrap">Mua ngay</Link></div>
                                )
                            }
                            
                        </div>
                    </ClientOnly>

                </div>
            </div>
        </>
    )
}

export default CartPage;

CartPage.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};


// [
//     { id: 1, name: "bao", price: 12000},
//     { id: 5, name: "bao1", price: 52000},
//     { id: 8, name: "bao2", price: 32000},
//     { id: 6, name: "bao3", price: 15000},
// ]