import AdminLayout from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";


const ProductCreatePage : NextPageWithLayout = () => {

    return (
        <div>
            <div>
                <label className="block">Tên sản phẩm</label>
                <input
                    placeholder=""
                    className="border px-2 py-1 rounded-sm"
                />
            </div>
            <div>
                <label className="block">Đường dẫn</label>
                <input
                    placeholder=""
                    className="border px-2 py-1 rounded-sm"
                />
            </div>
            <div>
                <label className="block">Xuất sứ</label>
                <input
                    placeholder=""
                    className="border px-2 py-1 rounded-sm"
                />
            </div>
            <div>
                <label className="block">Mô tả</label>
                <textarea
                    placeholder=""
                    className="border px-2 py-1 rounded-sm"
                />
            </div>
        </div>
    )
}

export default ProductCreatePage;

ProductCreatePage.getLayout = (page) => {
    return <AdminLayout tab="/admin/product/create">{page}</AdminLayout>;
};