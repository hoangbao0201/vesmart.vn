import { NextPageWithLayout } from "@/pages/_app";
import AdminLayout from "@/components/layouts/AdminLayout";
import BlogForm from "@/components/modules/Admin/BlogForm";

const CreateBlogPage: NextPageWithLayout = () => {
    return <BlogForm mode="create" />;
};

export default CreateBlogPage;

CreateBlogPage.getLayout = (page) => {
    return <AdminLayout tab="/admin/blog/create">{page}</AdminLayout>;
};
