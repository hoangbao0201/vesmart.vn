import { GetServerSideProps } from "next";
import MainLayout from "@/components/layouts/MainLayout";
import AdminLayoutTemplate from "@/components/modules/AdminLayoutTemplate";
import AdminPostListTemplate from "@/components/modules/AdminPostListTemplate";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";
import { IGetPostList } from "@/services/post/post.type";
import { Order } from "@/services/prisma-select/prisma-select-config";
import { requireAdminPage } from "@/lib/auth/require-admin-page";
import { getAdminPostListApi } from "@/services/admin/admin.api";

interface AdminPostListPageProps {
    posts: IGetPostList[];
    meta: PageOptionsMapper;
}

const AdminPostListPage = ({ posts, meta }: AdminPostListPageProps) => {
    return (
        <AdminLayoutTemplate>
            <AdminPostListTemplate posts={posts} meta={meta} />
        </AdminLayoutTemplate>
    );
};

export default AdminPostListPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const denied = await requireAdminPage(context);
    if (denied) return denied;

    const { query } = context;
    const page = query.page ? Number(query.page) : 1;
    const take = query.take ? Number(query.take) : 20;

    const response = await getAdminPostListApi({
        query: { page, take, order: Order.DESC },
    });

    if (!response) {
        return {
            props: {
                posts: [],
                meta: { page: 1, take, itemCount: 0, pageCount: 0 },
            },
        };
    }

    return {
        props: {
            posts: JSON.parse(JSON.stringify(response.posts)),
            meta: JSON.parse(JSON.stringify(response.meta)),
        },
    };
};

AdminPostListPage.getLayout = (page: React.ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
