import { ReactNode } from "react";
import dynamic from "next/dynamic";
import Header from "../partials/Header";
import SubHeader from "../partials/SubHeader";
import { useRouter } from "next/router";

const Footer = dynamic(() => import("../partials/Footer"), {
    ssr: false,
});
const ButtonContact = dynamic(
    () => import("@/components/share/ButtonContact"),
    {
        ssr: false,
    }
);
const ScrollOnTop = dynamic(() => import("@/components/share/ScrollOnTop"), {
    ssr: false,
});

interface MainLayoutProps {
    children: ReactNode;
    isHeader?: boolean;
    isSubHeader?: boolean;
    isFooter?: boolean;
    isContact?: boolean;
    className?: string;
    isNavbar?: boolean;
    isDynamicHeader?: boolean;
}

const MainLayout = ({
    children,
    isDynamicHeader = true,
    isHeader = true,
    isSubHeader = true,
    isFooter = true,
    isContact = true,
    isNavbar = false,
    className,
}: MainLayoutProps) => {
    const router = useRouter();

    return (
        <>
            {isHeader && <Header isDynamicHeader={isDynamicHeader} />}

            {isSubHeader && <SubHeader path={router.pathname} />}

            <main className="min-h-screen">
                <div className="lg:max-w-screen-xl sm:max-w-screen-md max-w-screen-sm w-full px-3 mx-auto text-black">
                    {children}
                </div>
            </main>

            {isFooter && <Footer />}

            <ScrollOnTop />
            <ButtonContact />
        </>
    );
};

export default MainLayout;
