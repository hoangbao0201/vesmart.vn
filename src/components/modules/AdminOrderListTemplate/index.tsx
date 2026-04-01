import Link from "next/link";
import { PaginationNav } from "@/components/share/PaginationNav";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";
import { IGetOrderList } from "@/services/order/order.type";

interface AdminOrderListTemplateProps {
    orders: IGetOrderList[];
    meta: PageOptionsMapper;
}

const currencyFormatter = new Intl.NumberFormat("vi-VN");

const AdminOrderListTemplate = ({ orders, meta }: AdminOrderListTemplateProps) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h1 className="text-xl font-semibold mb-4">Danh sách đặt hàng</h1>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-left">
                            <th className="px-3 py-2 border-b border-gray-200">Mã đơn</th>
                            <th className="px-3 py-2 border-b border-gray-200">Khách hàng</th>
                            <th className="px-3 py-2 border-b border-gray-200">Trạng thái</th>
                            <th className="px-3 py-2 border-b border-gray-200">Thanh toán</th>
                            <th className="px-3 py-2 border-b border-gray-200">Tổng tiền</th>
                            <th className="px-3 py-2 border-b border-gray-200">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId} className="hover:bg-gray-50">
                                <td className="px-3 py-2 border-b border-gray-100">{order.orderId}</td>
                                <td className="px-3 py-2 border-b border-gray-100">{order.shippingName}</td>
                                <td className="px-3 py-2 border-b border-gray-100">{order.status}</td>
                                <td className="px-3 py-2 border-b border-gray-100">{order.paymentStatus}</td>
                                <td className="px-3 py-2 border-b border-gray-100">
                                    {currencyFormatter.format(order.total)} đ
                                </td>
                                <td className="px-3 py-2 border-b border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/don-hang/${order.orderId}`}
                                            className="px-2 py-1 text-sm rounded-md bg-sky-100 text-sky-700 hover:bg-sky-200"
                                        >
                                            Xem
                                        </Link>
                                        <Link
                                            href={`/admin/don-hang/${order.orderId}/sua`}
                                            className="px-2 py-1 text-sm rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200"
                                        >
                                            Sửa
                                        </Link>
                                        <button
                                            type="button"
                                            className="px-2 py-1 text-sm rounded-md bg-rose-100 text-rose-700 hover:bg-rose-200"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <PaginationNav currentPage={meta.page} countPage={meta.pageCount} />
            </div>
        </div>
    );
};

export default AdminOrderListTemplate;
