import { ReactNode } from "react";
import dynamic from "next/dynamic";

const Header = dynamic(() => import('../partials/Header'), {
    ssr: false
})
const Footer = dynamic(() => import('../partials/Footer'), {
    ssr: false
})
const ButtonContact = dynamic(() => import("@/components/share/ButtonContact"), {
    ssr: false
})
const ScrollOnTop = dynamic(() => import("@/components/share/ScrollOnTop"), {
    ssr: false
})
const Navbar = dynamic(() => import("@/components/partials/Navbar"), {
    ssr: false
})



interface MainLayoutProps {
    children: ReactNode
    isHeader?: boolean
    isFooter?: boolean
    isContact?: boolean
    className?: string
    isNavbar?: boolean
}

const MainLayout = ({ children, isHeader = true, isFooter = true, isContact = true, isNavbar = false, className }: MainLayoutProps) => {


    return (
        
        <div className="">

            <div className="h-[60px]"></div>
            { isHeader && <Header /> }

            {isNavbar && <div className="h-12 py-2"></div>}
            {isNavbar && <Navbar />}


            <main className={`min-h-screen w-full ${className}`}>
                <div className="max-w-screen-xl mx-auto px-3">{children}</div>
            </main>

            { isFooter && <Footer /> }


            <ScrollOnTop />
            <ButtonContact />

        </div>

    )
}

export default MainLayout;