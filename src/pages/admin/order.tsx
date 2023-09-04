import AdminLayout from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "../_app";
import { useEffect, useState } from "react";
import orderService from "@/serverless/order.service";
import axios from "axios";
import { OrderTypes } from "@/types";
import ClientOnly from "@/components/share/ClientOnly";

const OrderPage: NextPageWithLayout = () => {
    const [orders, setOrders] = useState<OrderTypes[]>([]);

    const eventGetOrder = async () => {
        try {
            const response = await axios("/api/order", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response)
            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (error) {}
    };

    useEffect(() => {
        eventGetOrder();
    }, []);

    return (
        <div>
            <table className="w-full overflow-hidden text-left">
                <tbody>
                    <tr className="">
                        <th>id</th>
                        <th>Tên</th>
                        <th>SĐT</th>
                        <th>Địa chỉ</th>
                        <th>Code</th>
                        <th>Chú thích</th>
                    </tr>
                    {/* <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                        <td>Mexico</td>
                        <td>Mexico</td>
                        <td>Mexico</td>
                    </tr> */}
                    <ClientOnly>
                        {
                            orders.length > 0 && orders.map((order, index) => {
                                return (
                                    <tr key={order?.id || index}>
                                        <td>{order?.id}</td>
                                        <td>{order?.name}</td>
                                        <td>{order?.phone}</td>
                                        <td>{order?.adress}</td>
                                        <td>{order?.code}</td>
                                        <td>{order?.description}</td>
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
