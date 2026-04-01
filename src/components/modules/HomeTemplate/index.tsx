import HomeBanner from "./HomeBanner";
import MapNav from "./MapNav";
import ProductCard from "@/components/share/ProductCard";
import { PaginationNav } from "@/components/share/PaginationNav";
import { SITE_CONFIG } from "@/configs/site.config";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";
import { IGetProductList } from "@/services/product/product.type";

interface HomeTemplateProps {
    meta: PageOptionsMapper;
    products: IGetProductList[];
}
const HomeTemplate = ({ meta, products }: HomeTemplateProps) => {
    return (
        <>
            <h1 className="sr-only">
                {SITE_CONFIG.name} - {SITE_CONFIG.description}. Sửa chữa robot hút bụi, máy lọc không khí và thiết bị smart home tại Đà Nẵng.
            </h1>
            <HomeBanner />
            <div className="pt-4 px-2 mx-auto container min-h-screen">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 px-1">Sản phẩm</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-6 gap-x-1 gap-y-4">
                    {products.map((product) => (
                        <ProductCard
                            product={product}
                            key={product.productId}
                        />
                    ))}
                </div>
                <PaginationNav
                    currentPage={meta.page}
                    countPage={meta.pageCount}
                />
                <MapNav />
            </div>
        </>
    )
}

export default HomeTemplate;