import { ProductTypes } from "@/types";
import siteMetadata from "@/siteMetadata";
import SideLeftHome from "./SideLeftHome";
import { PageSEO } from "@/components/share/SEO";
import NavBrand from "@/components/modules/home/NavBrand";
import ListProduct from "@/components/modules/home/ListProduct";
import BannerMain from "./BannerMain";

interface PageHome {
    products: ProductTypes[]
}
const PageHome = ({ products }: PageHome) => {

    return (
        <>
            <PageSEO
                title="Trang chủ - VESMART"
                description={siteMetadata?.description}
            />

            <div className="-mx-3">
                <div className="px-3 mb-3">
                    <NavBrand />
                </div>
                <div className="px-3 mb-4">
                    <BannerMain />
                </div>
    
                <div className="flex">
                    <div className="ld:w-3/12 px-3 min-h-full top-0 bottom-0 lg:block hidden">
                        <SideLeftHome />
                    </div>
                    {/* lg:px-3 md:px-0 px-3 lg:-mr-3 */}
                    <div className="lg:w-9/12 px-3 flex-1">
                        <div className="">
                            <ListProduct
                                title="Sản phẩm mới"
                                products={products}
                            />
                            <ListProduct
                                title="Sản phẩm nổi bật"
                                products={products}
                            />
                            <ListProduct
                                title="Phụ kiện"
                                products={products}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageHome;