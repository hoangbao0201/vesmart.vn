import { GetServerSideProps } from "next";
import MainLayout from "@/components/layouts/MainLayout";
import AdminLayoutTemplate from "@/components/modules/AdminLayoutTemplate";
import { requireAdminPage } from "@/lib/auth/require-admin-page";

const AdminPage = () => {
    return (
        <AdminLayoutTemplate>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h1 className="text-xl font-semibold mb-2">Trang quản trị</h1>
                <p className="text-gray-600">
                    Chọn danh mục ở menu bên trái để xem danh sách bài viết, sản phẩm hoặc đơn hàng.
                </p>
            </div>
        </AdminLayoutTemplate>
    );
};

export default AdminPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const denied = await requireAdminPage(context);
    if (denied) return denied;
    return { props: {} };
};

AdminPage.getLayout = (page: React.ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
