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
    isDynamic?: boolean;
}

const MainLayout = ({
    children,
    isDynamic = true,
    isHeader = true,
    isFooter = true,
}: MainLayoutProps) => {
    return (
        <>
            {isHeader && <Header isDynamic={isDynamic} />}

            <main>{children}</main>

            {isFooter && <Footer />}

            <ScrollOnTop />
            <ButtonContact />
        </>
    );
};

export default MainLayout;
