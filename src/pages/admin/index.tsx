import AdminLayout from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "../_app";


const AdminPage : NextPageWithLayout = () => {

    return (
        <div>

        </div>
    )
}

export default AdminPage;

AdminPage.getLayout = (page) => {

    return (
        <AdminLayout>{page}</AdminLayout>
    )
}