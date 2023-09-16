import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { NextPageWithLayout } from "../_app";
import convertPrice from "@/utils/convertPrice";
import AdminLayout from "@/components/layouts/AdminLayout";
import { OrderSlideState, removeOrderHandle, setOrderHandle } from "@/redux/orderSlice";
import ClientOnly from "@/components/share/ClientOnly";
import convertDate from "@/utils/convertDate";

const OrderPage: NextPageWithLayout = () => {

    const dispatch = useDispatch();
    const { orders } : { orders: OrderSlideState[] } = useSelector(
        (state: any) => state.order
    );
    
    const eventGetOrder = async () => {
        try {
            const response = await axios("/api/order", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success) {
                dispatch(setOrderHandle(response.data.orders));
            }
        } catch (error) {}
    };

    useEffect(() => {
        eventGetOrder();
    }, []);

    const handleDeleteOrder = async (id: string) => {
        try {

            if(!confirm("Bạn có chắc chắn muốn xóa!")) {
                return;
            }

            const deleteOrder = await fetch(`/api/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if(deleteOrder.ok) {
                dispatch(removeOrderHandle(id));
            }
        } catch (error) {
            
        }
    }

    return (
        <div className="bg-white py-5 px-5 mb-4 rounded-xl border">
            <div className="flex mb-4">
                <button onClick={() => eventGetOrder()} className="ml-auto border px-2 py-1 bg-gray-200">Tải lại đơn hàng</button>
            </div>
            <table className="w-full overflow-hidden text-left">
                <thead>
                    <tr className="uppercase bg-gray-200 rounded-l-lg rounded-r-lg overflow-hidden border border-red-200 text-gray-500 font-normal [&>th]:px-3 [&>th]:py-2">
                        <th className="">stt</th>
                        <th className="w-3/12">Thông tin</th>
                        <th className="">Code</th>
                        <th className="w-5/12">Sản phẩm</th>
                        <th className="w-2/12">Chú thích</th>
                        <th className="w-2/12">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>

                    <ClientOnly>
                        {
                            orders.length > 0 && orders.map((order, index) => {
                                return (
                                    <tr key={order?.id || index} className={`[&>td]:px-3 [&>td]:py-3 [&>td]:align-top ${index%2 !== 0 && "bg-gray-100"}`}>
                                        <td className="text-lg">{index+1}</td>
                                        <td>
                                            <p className="line-clamp-2"><strong>Tên:</strong> {order?.name}</p>
                                            <p className="line-clamp-2"><strong>Sđt:</strong> {order?.phone}</p>
                                            <p className="line-clamp-2"><strong>Địa chỉ:</strong> {order?.adress}</p>
                                            <p className="line-clamp-2"><strong>Thời gian:</strong> {convertDate(order?.createdAt)}</p>
                                        </td>
                                        <td>{order?.code || ""}</td>
                                        <td>
                                            <ProductOrderComponent
                                                productsOrder={JSON.parse(order.productsOrder)}
                                            />
                                        </td>
                                        <td>{order?.description}</td>
                                        <td>
                                            <button className="mb-1 border px-2 py-1 w-full rounded-sm text-white bg-blue-600">Xác nhận</button>
                                            <button className="mb-1 border px-2 py-1 w-full rounded-sm bg-white">Sửa</button>
                                            <button onClick={() => handleDeleteOrder(order.id)} className="mb-1 border px-2 py-1 w-full rounded-sm text-white bg-red-600">Xóa</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </ClientOnly>

                </tbody>
            </table>
        </div>
    );
};

export default OrderPage;

OrderPage.getLayout = (page) => {
    return <AdminLayout tab="/admin/order">{page}</AdminLayout>;
};

type ProductVariantOrd = {
    sku: string
    name: string
    value: string
}
type productOrderComponentProps = {
    id: string
    slug: string
    image: string
    name: string
    price: number
    count: number
    stock: number
    variant: [] | ProductVariantOrd[]
}
const ProductOrderComponent = ({ productsOrder }: { productsOrder: productOrderComponentProps[] }) => {

    if(!productsOrder || productsOrder.length === 0) {
        return null;
    }

    return (
        <>
            {
                productsOrder.map((prdOrder, index) => {
                    return (
                        <div key={prdOrder + "-" + index} className="flex mb-2">
                            <div className="w-2/12 mt-1 flex-shrink-0">
                                <Image
                                    width={120}
                                    height={120}
                                    alt="Ảnh sản phẩm"
                                    src={prdOrder?.image}
                                    className="w-full bg-gray-100 overflow-hidden object-cover"
                                />
                            </div>
                            <div className="ml-3">
                                <Link
                                    target="_blank"
                                    className="line-clamp-1 text-blue-500 hover:underline text-lg"
                                    href={`/san-pham/${prdOrder?.slug}`}
                                >
                                    {prdOrder?.name}
                                </Link>
                                <div className="mt-1">
                                    <div className="">
                                        {
                                            prdOrder?.variant.length > 0 && prdOrder.variant.map((prdVariant, index) => {
                                                return (
                                                    <p key={prdVariant?.sku + " " + index}><strong>{prdVariant?.name}:</strong><span className="border px-1 mx-2 border-red-600 text-red-600">{prdVariant?.value}</span></p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <p className="mt-1"><strong>Số lượng:</strong> [ <strong>{prdOrder?.count}</strong> ] x {convertPrice(prdOrder?.price)}</p>
                                <p className="mt-1"><strong>Tổng tiền:</strong> {convertPrice(prdOrder.count * prdOrder.price)}</p>
                            </div>
                        </div>
                    )
                })
            }

            <div className="mt-2 pt-2 border-t border-gray-300">
                <strong>Tổng tiền: </strong>
                {
                    convertPrice(productsOrder.reduce((accumulator, currentValue) => {
                        return accumulator + (currentValue.count * currentValue.price);
                    }, 0))
                }
            </div>
        </>
    )
}