import { ReactNode } from "react";
import dynamic from "next/dynamic";
import Header from "../partials/Header";

// const Header = dynamic(() => import('../partials/Header'), {
//     ssr: false
// })
const Footer = dynamic(() => import('../partials/Footer'), {
    ssr: false
})
const ButtonContact = dynamic(() => import("@/components/share/ButtonContact"), {
    ssr: false
})
const ScrollOnTop = dynamic(() => import("@/components/share/ScrollOnTop"), {
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
        
        <>

            {/* { isNavbar && <div className="h-[60px]"></div> } */}
            { isHeader && <Header /> }

            <div className={`min-h-screen w-full ${className}`}>
                <div className="max-w-screen-xl mx-auto px-3">{children}</div>
            </div>

            { isFooter && <Footer /> }


            <ScrollOnTop />
            <ButtonContact />

        </>

    )
}

export default MainLayout;