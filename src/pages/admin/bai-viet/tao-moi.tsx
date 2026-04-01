import { GetServerSideProps } from "next";
import MainLayout from "@/components/layouts/MainLayout";
import AdminLayoutTemplate from "@/components/modules/AdminLayoutTemplate";
import AdminPostDetailFormTemplate from "@/components/modules/AdminPostDetailFormTemplate";
import { requireAdminPage } from "@/lib/auth/require-admin-page";
import { getAdminTagListApi } from "@/services/admin/admin.api";

interface AdminCreatePostPageProps {
    tags: string[];
}

const AdminCreatePostPage = ({ tags }: AdminCreatePostPageProps) => {
    return (
        <AdminLayoutTemplate>
            <AdminPostDetailFormTemplate tagOptions={tags} />
        </AdminLayoutTemplate>
    );
};

export default AdminCreatePostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const denied = await requireAdminPage(context);
    if (denied) return denied;

    const tags = await getAdminTagListApi();
    return {
        props: {
            tags: JSON.parse(JSON.stringify(tags)),
        },
    };
};

AdminCreatePostPage.getLayout = (page: React.ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
