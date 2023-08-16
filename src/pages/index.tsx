import { ReactNode } from "react";
import MainLayout from "@/components/layouts/MainLayout";

const HomePage = () => {
    return (
      <div className="">Home Page</div>
    );
};

export default HomePage;

HomePage.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};
