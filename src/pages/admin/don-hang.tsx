import { GetServerSideProps } from "next";
import MainLayout from "@/components/layouts/MainLayout";
import AdminLayoutTemplate from "@/components/modules/AdminLayoutTemplate";
import AdminOrderListTemplate from "@/components/modules/AdminOrderListTemplate";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";
import { IGetOrderList } from "@/services/order/order.type";
import { requireAdminPage } from "@/lib/auth/require-admin-page";
import { getAdminOrderListApi } from "@/services/admin/admin.api";

interface AdminOrderListPageProps {
    orders: IGetOrderList[];
    meta: PageOptionsMapper;
}

const AdminOrderListPage = ({ orders, meta }: AdminOrderListPageProps) => {
    return (
        <AdminLayoutTemplate>
            <AdminOrderListTemplate orders={orders} meta={meta} />
        </AdminLayoutTemplate>
    );
};

export default AdminOrderListPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const denied = await requireAdminPage(context);
    if (denied) return denied;

    const { query } = context;
    const page = query.page ? Number(query.page) : 1;
    const take = query.take ? Number(query.take) : 20;

    const response = await getAdminOrderListApi({
        query: { page, take },
    });

    if (!response) {
        return {
            props: {
                orders: [],
                meta: { page: 1, take, itemCount: 0, pageCount: 0 },
            },
        };
    }

    return {
        props: {
            orders: JSON.parse(JSON.stringify(response.orders)),
            meta: JSON.parse(JSON.stringify(response.meta)),
        },
    };
};

AdminOrderListPage.getLayout = (page: React.ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
