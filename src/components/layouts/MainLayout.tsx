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



interface MainLayoutProps {
    children: ReactNode
    isHeader?: boolean
    isFooter?: boolean
    isContact?: boolean
    className?: string
}

const MainLayout = ({ children, isHeader = true, isFooter = true, isContact = true, className }: MainLayoutProps) => {


    return (
        
        <div className="">

            { isHeader && <Header /> }

            <main className={`min-h-screen w-full overflow-hidden mt-[50px] py-6 ${className}`}>
                <div className="max-w-screen-xl mx-auto px-3">{children}</div>
            </main>

            { isFooter && <Footer /> }


            <ScrollOnTop />
            <ButtonContact />

        </div>

    )
}

export default MainLayout;