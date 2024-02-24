import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { CartSlideState, removeCartHandle, setCartHandle } from "@/redux/cartSlice";

import { NextPageWithLayout } from "./_app";
import convertPrice from "@/utils/convertPrice";
import ClientOnly from "@/components/share/ClientOnly";
import MainLayout from "@/components/layouts/MainLayout";
import InputQuantity from "@/components/share/InputQuantity";
import { ShowToastify } from "@/components/share/ShowToastify";
import LoadingDots from "@/components/share/Loading/LoadingDots";
import OptionAdress from "@/components/PageComponent/PageCart/OptionAdress";
import { AdressSlideState } from "@/redux/userSlice";



const CartPage : NextPageWithLayout = () => {

    const dispatch = useDispatch();
    const { products } : { products: CartSlideState[] } = useSelector(
        (state: any) => state.cart
    );
    const { adressUser } : { adressUser: AdressSlideState }  = useSelector(
        (state: any) => state.user
    );
    
    const [infoOreder, setInfoOreder] = useState({
        name: "",
        conscious: "",
        specificAdress: "",
        phone: "",
        code: "",
        description: ""
    })
    const [description, setDescription] = useState("");
    const [orderLoading, setOrderLoading] = useState(false);

    const handleRemoveProductCart = (id: string) => {
        if(products?.length <= 0 || !id) {
            return;
        }

        dispatch(removeCartHandle(id));
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
        if(infoOreder.name.length < 5 || infoOreder.name.length > 30) {
            ShowToastify({
                data: "Tên không hợp lệ",
                type: "error"
            });
            return;
        }
        if(infoOreder.phone.length < 5 || infoOreder.phone.length > 12) {
            ShowToastify({
                data: "Số điện thoại không hợp lệ",
                type: "error"
            });
            return;
        }
        if(!adressUser.city) {
            ShowToastify({
                data: "Tỉnh không hợp lệ",
                type: "error"
            });
            return;
        }
        if(!adressUser.district) {
            ShowToastify({
                data: "Quận/Huyện/Thành phố không hợp lệ",
                type: "error"
            });
            return;
        }
        if(!adressUser.ward) {
            ShowToastify({
                data: "Xã/Phường không hợp lệ",
                type: "error"
            });
            return;
        }
        if((infoOreder.specificAdress.trim()).length < 5 || (infoOreder.specificAdress.trim()).length > 40) {
            ShowToastify({
                data: "Địa chỉ không hợp lệ",
                type: "error"
            });
            return;
        }
        if(infoOreder.code.length > 10) {
            ShowToastify({
                data: "Code không hợp lệ",
                type: "error"
            });
            return;
        }

        setOrderLoading(true)

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: infoOreder.name,
                    phone: infoOreder.phone,
                    adress: adressUser.city.label + " - " + adressUser.district.label + " - " + adressUser.ward.label + " - " + infoOreder.specificAdress.trim(),
                    code: infoOreder.code,
                    description: description,
                    productsOrder: JSON.stringify(products)
                }),
            });
            if(response.ok) {
                ShowToastify({
                    data: "Bạn đã đặt hàng thành công",
                    type: "success"
                });
    
                dispatch(setCartHandle([]));
            }
            setOrderLoading(false);
        } catch (error) {
            // console.log(error)
            setOrderLoading(false);
        }
    }

    const handleSetCountOrder = (id: string, countO: number) => {
        if(countO === 0) {
            return;
        }

        const ipA = id.split("|");

        const setCart = products.map(productCart => {
            if (ipA[1] !== "" ? productCart.id === ipA[0] && productCart.skuP === ipA[1] : productCart.id === ipA[0]) {
                return {
                    ...productCart,
                    count: countO
                };
            } else {
                return productCart;
            }
        });

        // console.log(ipA);
        // console.log(setCart);

        dispatch(setCartHandle(setCart));
    }

    return (
        <> 
            <div className="-mx-3">
                <h1 className="font-semibold text-lg px-3 py-3 mb-3 border-b">Giỏ hàng của bạn</h1>

                <ClientOnly>
                    <div className="lg:flex">
                        <div className="lg:w-6/12 px-3 min-h-[100px]">
    
                            {
                                products?.length ? (
                                    products.map((product, index) => {
                                        return (
                                            <div key={product.id + "-" + product.skuP + "-" + index} id={product.id + "-" + product.skuP + "-" + index} className="relative flex mb-3 py-3 px-3 border-b bg-white border shadow-sm">
                                                <div className="w-2/12 mt-2">
                                                    <Image
                                                        unoptimized
                                                        width={120}
                                                        height={120}
                                                        alt="Ảnh sản phẩm"
                                                        src={product?.image}
                                                        className="w-full bg-gray-100 overflow-hidden object-cover"
                                                    />
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <p className="font-semibold text-lg mb-5">{product?.name}</p>
                                                    <div className="mb-3">
                                                        <InputQuantity
                                                            quantity={product.stock}
                                                            value={product.count}
                                                            setValue={(countO) => handleSetCountOrder(`${product.id}|${product.skuP ? product.skuP : ""}`, countO as number)}
                                                        />
                                                        <span>Giá: {convertPrice(product?.price)}</span>
                                                    </div>

                                                    <p className="font-semibold flex">
                                                        Tổng cộng:&emsp;<span className="font-normal">{convertPrice(product?.count * product?.price)}</span>
                                                        <button
                                                            onClick={() => handleRemoveProductCart(`${product.id}|${product.skuP ? product.skuP : ""}`)}
                                                            className="hover:bg-gray-200 border rounded-sm px-6 py-1 ml-auto shadow-sm" 
                                                        >
                                                            xóa
                                                        </button>
                                                    </p>
                                                </div>
                                                
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="">Bạn chưa thêm sản phẩm nào vào giỏ hàng! <Link href={`/`} className="text-sky-600 underline whitespace-nowrap">Mua ngay</Link></div>
                                )
                            }
                            
                        </div>

                        <div className="lg:w-6/12 md:px-3">
                            <div className="px-4 py-6 bg-white border">
                                <div className="pt-5 pb-2 mt-3 border-t text-lg font-semibold text-orange-500 border-orange-500">TỔNG TIỀN</div>
    
                                <ul className="mb-4">
                                    {
                                        products.length > 0 ? products.map((product, index) => {
                                            return (
                                                <li className="flex border-b py-4" key={product.id + "-" + product.skuP + "-" + index}>
                                                    <div className="w-2/12 mt-2">
                                                        <Image
                                                            unoptimized
                                                            width={120}
                                                            height={120}
                                                            alt="Ảnh sản phẩm"
                                                            src={product?.image}
                                                            className="w-full bg-gray-100 overflow-hidden object-cover"
                                                        />
                                                    </div>
                                                    <div className="mr-2 ml-2 border-r flex-1">
                                                        <p className="line-clamp-2 mb-3">{product.name}</p>
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
                                        placeholder="Mã giới thiệu (không bắt buộc)"
                                        className="input-info mb-4"
                                    />
                                </div>
    
                                <div className="py-5 my-3 border-t text-lg font-semibold text-orange-500 border-orange-500">THÔNG TIN KHÁCH HÀNG</div>
                                <input
                                    value={infoOreder.name}
                                    name="name"
                                    onChange={onChangeValueForm}
                                    placeholder="Họ và tên"
                                    className="input-info mb-4"
                                />
                                <input
                                    value={infoOreder.phone}
                                    name="phone"
                                    onChange={onChangeValueForm}
                                    placeholder="Số điện thoại"
                                    className="input-info mb-4"
                                />

                                <OptionAdress />
                                
                                <input
                                    value={infoOreder.specificAdress}
                                    name="specificAdress"
                                    onChange={onChangeValueForm}
                                    placeholder="Địa chỉ cụ thể"
                                    className="input-info mb-4"
                                />
    
                                <textarea
                                    value={description}
                                    name="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full min-h-[200px] border rounded-sm px-3 py-2 outline:border-sky-600 outline-none"
                                    placeholder="Ghi chú"
                                />

                                {/* <div className="text-red-600">Tính năng đặt hàng đang trong quá trình thử nghiệm!</div>
                                <div className="text-red-600">Để mua hàng ngay có thể liên hệ trực tiếp qua <Link target="_blank" href={`https://zalo.me/0971183153`} className="underline text-blue-500">Zalo</Link></div> */}

                                <button disabled={orderLoading} onClick={handleOrderProduct} className="font-semibold uppercase mt-5 py-3 w-full text-white bg-black">
                                    {
                                        orderLoading ? (
                                            <LoadingDots color="#ffff"/>
                                        ) : (
                                            <>Đặt hàng</>
                                        )
                                    }
                                </button>
                                <div className="mt-3">
                                    Liên hệ bộ phận hỗ trợ tại <Link target="_blank" href={`https://zalo.me/0971183153`} className="underline text-blue-500">Zalo</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </ClientOnly>

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