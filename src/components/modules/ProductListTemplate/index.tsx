import BreadcrumbNav from "@/components/seo/BreadcrumbNav";
import ProductCard from "@/components/share/ProductCard";
import { PaginationNav } from "@/components/share/PaginationNav";
import { PageOptionsMapper } from "@/services/mappers/page-options.mapper";
import { IGetProductList } from "@/services/product/product.type";

interface ProductListTemplateProps {
    products: IGetProductList[];
    meta: PageOptionsMapper;
}
const ProductListTemplate = ({ products, meta }: ProductListTemplateProps) => {
    const pageLabel = meta.page > 1 ? `Sản phẩm - Trang ${meta.page}` : "Sản phẩm";

    return (
        <div className="pt-4 px-2 mx-auto max-w-7xl container min-h-screen">
            <BreadcrumbNav
                className="mb-4 px-1"
                items={[
                    { name: "Trang chủ", path: "/" },
                    { name: pageLabel },
                ]}
            />
            <header className="mb-4 px-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{pageLabel}</h1>
                <p className="mt-2 text-gray-600 text-sm md:text-base">
                    Danh sách sản phẩm và phụ kiện - {meta.itemCount} mặt hàng.
                </p>
            </header>
            <h2 className="sr-only">Lưới sản phẩm</h2>
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
        </div>
    )
}

export default ProductListTemplate;