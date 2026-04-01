import { GetServerSideProps } from "next";
import MainLayout from "@/components/layouts/MainLayout";
import AdminLayoutTemplate from "@/components/modules/AdminLayoutTemplate";
import AdminPostDetailFormTemplate from "@/components/modules/AdminPostDetailFormTemplate";
import { requireAdminPage } from "@/lib/auth/require-admin-page";
import { getAdminPostDetailByIdApi, getAdminTagListApi } from "@/services/admin/admin.api";
import { IGetPostDetail } from "@/services/post/post.type";

interface AdminEditPostPageProps {
    postId: string;
    post: IGetPostDetail;
    tags: string[];
}

const AdminEditPostPage = ({ postId, post, tags }: AdminEditPostPageProps) => {
    return (
        <AdminPostDetailFormTemplate postId={postId} initialPost={post} tagOptions={tags} />
    );
};

export default AdminEditPostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const denied = await requireAdminPage(context);
    if (denied) return denied;

    const { params } = context;
    const postId = params?.postId;
    if (typeof postId !== "string") {
        return { notFound: true };
    }

    const [postRes, tags] = await Promise.all([
        getAdminPostDetailByIdApi({ postId }),
        getAdminTagListApi(),
    ]);

    if (!postRes?.post) {
        return { notFound: true };
    }

    return {
        props: {
            postId,
            post: JSON.parse(JSON.stringify(postRes.post)),
            tags: JSON.parse(JSON.stringify(tags)),
        },
    };
};

AdminEditPostPage.getLayout = (page: React.ReactNode) => {
    return <MainLayout>
        <AdminLayoutTemplate>
            {page}
        </AdminLayoutTemplate>
    </MainLayout>;
};
