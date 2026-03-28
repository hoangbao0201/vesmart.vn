import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { NextPageWithLayout } from "@/pages/_app";
import AdminLayout from "@/components/layouts/AdminLayout";
import BlogForm, { BlogFormInitial } from "@/components/modules/Admin/BlogForm";
import blogService from "@/serverless/blog.service";
import { authOptions } from "@/lib/authOptions";
import { isAdminEmail } from "@/lib/adminAuth";

interface EditBlogPageProps {
    blog: BlogFormInitial & { id: string };
}

const EditBlogPage: NextPageWithLayout<EditBlogPageProps> = ({ blog }) => {
    const { id, ...initial } = blog;
    return <BlogForm key={id} mode="edit" blogId={id} initial={initial} />;
};

export default EditBlogPage;

export const getServerSideProps: GetServerSideProps<EditBlogPageProps> = async (ctx) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    if (!session?.user?.email || !isAdminEmail(session.user.email)) {
        return { redirect: { destination: "/", permanent: false } };
    }

    const id = ctx.params?.id;
    if (!id || typeof id !== "string") {
        return { notFound: true };
    }

    const res = await blogService.findById(id);
    if (!res.success || !res.blog) {
        return { notFound: true };
    }

    const b = res.blog;
    const hashtagStr =
        b.blogHashtags?.map((bh: { Hashtag: { name: string } }) => bh.Hashtag.name).join("||") ?? "";

    const blogPayload: EditBlogPageProps["blog"] = {
        id: b.id,
        title: b.title,
        slug: b.slug,
        thumbnail: b.thumbnail ?? "",
        description: b.description ?? "",
        blogHashtags: hashtagStr,
        content: b.content ?? "",
    };

    return {
        props: {
            blog: JSON.parse(JSON.stringify(blogPayload)),
        },
    };
};

EditBlogPage.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};
