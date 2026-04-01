import Link from "next/link";
import { PaginationNav } from "@/components/share/PaginationNav";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";
import { IGetProductList } from "@/services/product/product.type";
import convertDate from "@/utils/convertDate";

interface AdminProductListTemplateProps {
    products: IGetProductList[];
    meta: PageOptionsMapper;
}

const AdminProductListTemplate = ({ products, meta }: AdminProductListTemplateProps) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h1 className="text-xl font-semibold mb-4">Danh sách sản phẩm</h1>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-left">
                            <th className="px-3 py-2 border-b border-gray-200">Tên sản phẩm</th>
                            <th className="px-3 py-2 border-b border-gray-200">Slug</th>
                            <th className="px-3 py-2 border-b border-gray-200">Nổi bật</th>
                            <th className="px-3 py-2 border-b border-gray-200">Ngày tạo</th>
                            <th className="px-3 py-2 border-b border-gray-200">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.productId} className="hover:bg-gray-50">
                                <td className="px-3 py-2 border-b border-gray-100">{product.name}</td>
                                <td className="px-3 py-2 border-b border-gray-100">{product.slug}</td>
                                <td className="px-3 py-2 border-b border-gray-100">{product.isFeatured ? "Có" : "Không"}</td>
                                <td className="px-3 py-2 border-b border-gray-100">{convertDate(product.createdAt)}</td>
                                <td className="px-3 py-2 border-b border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/san-pham/${product.slug}`}
                                            className="px-2 py-1 text-sm rounded-md bg-sky-100 text-sky-700 hover:bg-sky-200"
                                        >
                                            Xem
                                        </Link>
                                        <Link
                                            href={`/admin/san-pham/${product.productId}/sua`}
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

export default AdminProductListTemplate;
