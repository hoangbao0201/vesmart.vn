import { GetServerSideProps } from "next";
import MainLayout from "@/components/layouts/MainLayout";
import AdminLayoutTemplate from "@/components/modules/AdminLayoutTemplate";
import AdminProductListTemplate from "@/components/modules/AdminProductListTemplate";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";
import { IGetProductList } from "@/services/product/product.type";
import { Order } from "@/services/prisma-select/prisma-select-config";
import { requireAdminPage } from "@/lib/auth/require-admin-page";
import { getAdminProductListApi } from "@/services/admin/admin.api";

interface AdminProductListPageProps {
    products: IGetProductList[];
    meta: PageOptionsMapper;
}

const AdminProductListPage = ({ products, meta }: AdminProductListPageProps) => {
    return (
        <AdminLayoutTemplate>
            <AdminProductListTemplate products={products} meta={meta} />
        </AdminLayoutTemplate>
    );
};

export default AdminProductListPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const denied = await requireAdminPage(context);
    if (denied) return denied;

    const { query } = context;
    const page = query.page ? Number(query.page) : 1;
    const take = query.take ? Number(query.take) : 20;

    const response = await getAdminProductListApi({
        query: { page, take, order: Order.DESC },
    });

    if (!response) {
        return {
            props: {
                products: [],
                meta: { page: 1, take, itemCount: 0, pageCount: 0 },
            },
        };
    }

    return {
        props: {
            products: JSON.parse(JSON.stringify(response.products)),
            meta: JSON.parse(JSON.stringify(response.meta)),
        },
    };
};

AdminProductListPage.getLayout = (page: React.ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
