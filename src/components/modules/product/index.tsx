import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Gallery from "./gallery";
import { ProductTypes } from "@/types";
import OptionVariant from "./OptionVariant";
import convertPrice from "@/utils/convertPrice";
import Breadcrumb from "@/components/share/Breadcrumb";
import IconLocationDot from "../icons/IconLocationDot";
import MarkContent from "@/components/share/MarkContent";
import IconCartShopping from "../icons/IconCartShopping";
import InputQuantity from "@/components/share/InputQuantity";
import ProductLoad from "@/components/share/skeleton/ProductLoad";
import { ShowToastify } from "@/components/share/ShowToastify";
import { CartSlideState, addCartHandle } from "@/redux/cartSlice";


interface obVariantProps {
    skuId?: string;
    skuP?: string;
    price?: number;
    stock?: number;
    variants: { "1": string; "2": string } | {};
}

interface ProductDetailPageTemplateProps {
    product: ProductTypes
}
const ProductDetailPageTemplate = ({ product }: ProductDetailPageTemplateProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { products }: { products: CartSlideState[] } = useSelector(
        (state: any) => state.cart
    );

    const [countProduct, setCountProduct] = useState<number>(0);
    const [thumbsSwiper, setThumbsSwiper] = useState<number>(0);
    const [errorBuy, setErrorBuy] = useState<string | null>(null);
    const [successBuy, setSuccessBuy] = useState<string | null>(null);
    const [obVariant, setObVariant] = useState<obVariantProps>({
        variants: {},
    });

    useEffect(() => {
        if (product?.skus) {
            setObVariant({
                ...obVariant,
                skuId: product.skus[0].id,
                price: product.skus[0].price,
                stock: product.skus[0].stock,
                skuP: "",
            });
        }
    }, [product?.skus]);

    // Handle Add Cart Product
    const handleAddCartProduct = () => {
        if (countProduct === 0) {
            setErrorBuy("Bạn chưa thêm số lượng đơn hàng!");
            setTimeout(() => {
                setErrorBuy(null);
            }, 5000);
            return;
        }

        let result: any = [];
        let skus: any = [];
        if (Object.keys(obVariant.variants).length > 0) {
            for (let obV in obVariant?.variants) {
                result.push({
                    // @ts-ignore
                    sku: obVariant?.variants[obV] || "",
                    // @ts-ignore
                    name: product.variants[
                        // @ts-ignore
                        Number(obVariant?.variants[obV].split("-")[0]) - 1
                    ].name,
                    // @ts-ignore
                    value: product.variants[
                        // @ts-ignore
                        Number(obVariant?.variants[obV].split("-")[0]) - 1
                    ].subVariants[
                        // @ts-ignore
                        Number(obVariant?.variants[obV].split("-")[1]) - 1
                    ].name,
                });
            }
        }

        if (products.length > 0) {
            const hasProduct = products.some(
                (item) =>
                    item.id === product.id &&
                    JSON.stringify(item.variant) == JSON.stringify(result)
            );

            if (hasProduct) {
                ShowToastify({
                    data: "Sản phẩm loại này đã đã tồn tại trong giỏ hàng!",
                    type: "warning",
                });
                setTimeout(() => {
                    setSuccessBuy(null);
                }, 5000);
                throw new Error();
            }
        }

        if (product.variants.length > 0) {
            dispatch(
                addCartHandle({
                    id: product.id,
                    skuId: obVariant?.skuId,
                    skuP: obVariant?.skuP,
                    slug: product.slug,
                    image: product?.images[0].url,
                    name: product?.title,
                    price: obVariant?.price,
                    count: countProduct,
                    stock: obVariant?.stock,
                    variant: result,
                })
            );
        } else {
            dispatch(
                addCartHandle({
                    id: product.id,
                    skuId: obVariant?.skuId,
                    skuP: obVariant?.skuP,
                    slug: product.slug,
                    image: product?.images[0].url,
                    name: product?.title,
                    price: product?.skus[0].price,
                    count: countProduct,
                    stock: product?.skus[0].stock,
                    variant: result,
                })
            );
        }

        setSuccessBuy("Thêm thành công, mời kiểm tra giỏ hàng!");
        setTimeout(() => {
            setSuccessBuy(null);
        }, 5000);
        return;
    };

    // Handle Change Variant
    const handleChangeVariant = (e: any) => {
        if (e.target !== e.currentTarget) return;
        const position = e.target.dataset.position;

        const prod = product?.skus.filter((prod) => {
            if (prod.sku === position) {
                return prod;
            }
        });

        setObVariant({
            skuId: prod[0]?.id ?? product.skus[0].id,
            skuP: position,
            price: prod[0].price,
            stock: prod[0].stock,
            variants: {
                [position.split("-")[0]]: position,
            },
        });
    };

    // Hanle Buy Now
    const handleBuyNow = () => {
        try {
            handleAddCartProduct();
            router.push("/gio-hang");
        } catch (error) {}
    };

    return (
        <>
            <div className="-mx-3">
                <div className="md:px-3">
                    <Breadcrumb
                        path={[
                            {
                                title: "Sản phẩm",
                                url: "/"
                            },
                            {
                                title: product?.title || "",
                                url: "/bai-viet/" + product?.slug
                            }
                        ]}
                    />
                </div>
                <div className=" md:px-3">
                    {product ? (
                        <>
                            <div className="md:flex bg-white shadow-sm rounded-md py-4">
                                <div className="relative md:w-4/12 px-3 mb-3">
                                    <div className="overflow-hidden max-w-md:max-w-[400px]">
                                        <Gallery
                                            images={product.images}
                                            thumbsSwiper={thumbsSwiper}
                                            setThumbsSwiper={setThumbsSwiper}
                                        />
                                    </div>
                                </div>
                                <div className="relative md:w-8/12 px-3 mb-3">
                                    <div className="mb-4">
                                        <h1 className="font-semibold text-2xl">
                                            {product?.title}
                                        </h1>
                                    </div>
        
                                    <div className="p-4 mb-4 bg-gray-100 flex items-end leading-none">
                                        <div className="font-semibold text-[30px] text-rose-500 mr-3">
                                            {convertPrice(obVariant?.price || 0)}
                                        </div>
                                    </div>
        
                                    {/* <div className="flex leading-tight mb-3 gap-3">
                                        <div className="">
                                            <ListStar numb={product?.rating || 5} />
                                        </div>
                                        <p className="">(Xem 18 đánh giá)</p>
                                        <p className="border-l pl-3">Đã bán 70</p>
                                    </div> */}
        
                                    <OptionVariant
                                        obVariant={obVariant}
                                        handleChangeVariant={handleChangeVariant}
                                        product={product}
                                    />
        
                                    <InputQuantity
                                        quantity={
                                            product?.variants.length === 0
                                                ? product.skus[0].stock
                                                : obVariant?.stock
                                                ? obVariant?.stock
                                                : 0
                                        }
                                        value={countProduct}
                                        setValue={setCountProduct}
                                        setErrorBuy={setErrorBuy}
                                    />
        
                                    <div className="h-7">
                                        <span className="text-red-600">
                                            {errorBuy}
                                        </span>
                                        <span className="text-blue-600">
                                            {successBuy}
                                        </span>
                                    </div>
        
                                    <div className="flex mb-4 max-w-[500px]">
                                        <button
                                            onClick={handleAddCartProduct}
                                            className="sm:py-3 py-2 px-1 flex items-center justify-center border bg-blue-600 hover:bg-blue-700/90 text-white uppercase font-semibold select-none w-2/3 mr-2"
                                        >
                                            <IconCartShopping size={18} className="fill-white mb-1 mr-1"/> Thêm vào giỏ hàng
                                        </button>
                                        <button
                                            onClick={handleBuyNow}
                                            className="sm:py-3 py-2 px-1 border bg-red-600 hover:bg-red-700/90 text-white uppercase font-semibold select-none w-1/3"
                                        >
                                            Mua ngay
                                        </button>
                                    </div>
        
                                    <div className="bg-red-100 border rounded-md px-4 py-4">
        
                                        <div className="mb-5">
                                            <h4 className="mb-2 font-medium">Hệ thống cửa hàng</h4>
                                            <div className="flex items-center mb-1">
                                                <IconLocationDot size={16} className="mr-2 flex-shrink-0 fill-red-600"/>
                                                634/24 Trưng Nữ Vương, phường Hòa Thuận Tây, Đà Nẵng, Việt Nam
                                            </div>
                                            <div className="flex items-center mb-1">
                                                <IconLocationDot size={16} className="mr-2 flex-shrink-0 fill-red-600"/>
                                                105 Nguyễn Hoàng – Hải Châu – Đà Nẵng
                                            </div>
                                            <div className="flex items-center mb-1">
                                                <IconLocationDot size={16} className="mr-2 flex-shrink-0 fill-red-600"/>
                                                135 Nguyễn Hoàng – Hải Châu – Đà Nẵng
                                            </div>
                                        </div>
        
                                        <div>
                                            <h4 className="mb-3 font-medium">LIÊN HỆ MUA HÀNG</h4>
                                            <div className="flex items-center mb-2">
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    alt={`Icon Zalo`}
                                                    className="w-5 h-5 mr-2 flex-shrink-0"
                                                    src={`/images/icons/zalo.png`}
                                                />
                                                Zalo:&nbsp;
                                                
                                                <Link className="text-blue-600 hover:underline" href={`https://zalo.me/0971183153`} target="_blank">
                                                    0972.84.11.66
                                                </Link>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    alt={`Icon Zalo`}
                                                    className="w-5 h-5 mr-2 flex-shrink-0"
                                                    src={`/images/icons/facebook.png`}
                                                />
                                                Facebook:&nbsp;
                                                <Link className="text-blue-600 hover:underline line-clamp-1" href={`https://www.facebook.com/suachuarobothutbuidanang`} target="_blank">
                                                    https://www.facebook.com/suachuarobothutbuidanang
                                                </Link>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <Image
                                                    width={30}
                                                    height={30}
                                                    alt={`Icon Zalo`}
                                                    className="w-5 h-5 mr-2 flex-shrink-0"
                                                    src={`/images/icons/gmail.png`}
                                                />
                                                Email:&nbsp;
                                                <Link className="text-blue-600 hover:underline" href={`mailto:vesmart98@gmail.com`} target="_blank">
                                                    vesmart98@gmail.com
                                                </Link>
                                            </div>
                                        </div>
        
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <ProductLoad />
                    )}
                </div>
    
                <div className="lg:flex gap-4 md:px-3">
    
                    <div className="lg:w-4/12 bg-white border shadow-sm rounded-md px-3 py-4 my-4 min-h-[250px]">
                        <h2 className="font-semibold text-xl mb-4">
                            Thông tin chi tiết
                        </h2>
    
                        <ul className="block [&>li]:flex [&>li]:py-2">
                            {product &&
                                product?.productDetail?.productInformationItems.map(
                                    (itemInfo, index) => {
                                        return (
                                            <li
                                                key={itemInfo.id}
                                                className={`px-3 ${
                                                    index % 2 === 0 && "bg-gray-100"
                                                }`}
                                            >
                                                <div className="basis-[50%]">
                                                    {itemInfo?.name}
                                                </div>
                                                <p className="ml-4 flex-1">
                                                    {itemInfo?.value}
                                                </p>
                                            </li>
                                        );
                                    }
                                )}
                        </ul>
                    </div>
    
                    <div className="lg:w-8/12 bg-white border shadow-sm rounded-md px-3 py-4 my-4 min-h-[250px]">
                        <h2 className="font-semibold text-xl mb-4">
                            Mô tả sản phẩm
                        </h2>
    
                        <div className="prose-sm">
                            <MarkContent>{product?.description}</MarkContent>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProductDetailPageTemplate;