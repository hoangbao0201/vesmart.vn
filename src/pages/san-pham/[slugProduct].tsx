import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";

import { ProductTypes } from "@/types";
import { NextPageWithLayout } from "../_app";
import convertPrice from "@/utils/convertPrice";
import { ListStar } from "@/components/share/ListStar";
import MainLayout from "@/components/layouts/MainLayout";
import MarkContent from "@/components/share/MarkContent";
import productService from "@/serverless/product.service";
import InputQuantity from "@/components/share/InputQuantity";
import { useDispatch, useSelector } from "react-redux";
import { CartSlideState, addCartHandle, setCartHandle } from "@/redux/cartSlice";
import Gallery from "@/components/share/product/gallery";
import ProductLoad from "@/components/share/skeleton/ProductLoad";
import OptionVariant from "@/components/PageComponent/PageProduct/OptionVariant";
import { ShowToastify } from "@/components/Features/ShowToastify";




export interface Params extends ParsedUrlQuery {
    slugProduct: string;
}

interface ProductDetailProps {
    product: ProductTypes
}

const ProductDetail : NextPageWithLayout<ProductDetailProps> = ({ product }) => {

    const dispatch = useDispatch();
    const { products } : { products: CartSlideState[] } = useSelector(
        (state: any) => state.cart
    );

    const [countProduct, setCountProduct] = useState<number>(0);
    const [dataBuy, setDataBuy] = useState({
        "màu sắc": [
            ""
        ]
    });
    const [thumbsSwiper, setThumbsSwiper] = useState<number>(0);
    const [errorBuy, setErrorBuy] = useState<string | null>(null); 
    const [successBuy, setSuccessBuy] = useState<string | null>(null);
    const [obVariant, setObVariant] = useState<any>({
        variants: {}
    });
    // const [productOrder, setProductOrder] = useState<{
    //     sku: string,
    //     stock: number,
    //     variants: { position: string, value: string }[] | []
    // } | {}>({});

    useEffect(() => {
        // setObVariant(
        //     product?.variants.length === 0 ? {} : (
        //         product?.variants.length === 1 ? ({
        //             sku: "1-1",
        //             price: product?.skus[0].price,
        //             stock: product?.skus[0].stock,
        //             variants: {
        //                 "1": "1-1"
        //             }
        //         }) : ({
        //             sku: "1-1_2-1",
        //             price: product?.skus[0].price,
        //             stock: product?.skus[0].stock,
        //             variants: {
        //                 "1": "1-1",
        //                 "2": "2-1"
        //             }
        //         })
        //     )
        // )
        // setProductOrder({
        //     sku: product?.skus[0].sku,
        //     stock: product?.skus[0].stock,
        //     variants: product?.variants.length > 0 ? (
        //         [
        //             {
        //                 position: "1-1",
        //                 value: product?.variants[0].subVariants && product?.variants[0].subVariants.length > 0 ? (
        //                     product?.variants[0].subVariants[0].name
        //                 ) : ""
        //             }
        //         ]
        //     ) : []
        // })
    }, [product])

    // console.log(obVariant);

    const handleAddCartProduct = () => {
        if(countProduct===0){
            setErrorBuy("Bạn chưa thêm số lượng đơn hàng!");
            setTimeout(() => {
                setErrorBuy(null);
            }, 5000);
            return;
        }
        if(products.length > 0) {
            const hasProduct = products.some(item => item.id === product.id);

            if(hasProduct) {
                // const setCart = products.map(productCart => {
                //     if (product.id === product.id) {
                //     return {
                //         ...productCart,
                //         count: productCart.count + countProduct
                //     };
                //     } else {
                //         return product;
                //     }
                // });

                // dispatch(setCartHandle(setCart));
                // setSuccessBuy("Trong giỏ hàng chỉ có thể xuất hiện 1 sản phẩm!");
                ShowToastify({
                    data: "Sản phẩm đã tồn tại trong giỏ hàng!",
                    type: "warning"
                })
                setTimeout(() => {
                    setSuccessBuy(null);
                }, 5000);
                return;
            }
        }

        let result : any = [];
        if(Object.keys(obVariant.variants).length > 0) {
            for (let obV in obVariant?.variants) {
                result.push({
                    name: product.variants[Number(obVariant?.variants[obV].split("-")[0])-1].name,
                    // @ts-ignore
                    value: product.variants[Number(obVariant?.variants[obV].split("-")[0])-1].subVariants[Number(obVariant?.variants[obV].split("-")[1])-1].name
                })
            }
        }
        
        
        if(product.variants.length > 0) {
            dispatch(addCartHandle({
                id: product.id,
                image: product?.images[0].url,
                name: product?.title,
                price: obVariant?.price,
                count: countProduct,
                stock: obVariant?.stock,
                variant: result
            }))
            
        }
        else {
            dispatch(addCartHandle({
                id: product.id,
                image: product?.images[0].url,
                name: product?.title,
                price: product?.skus[0].price,
                count: countProduct,
                stock: product?.skus[0].stock,
                variant: result
            }))
        }

        setSuccessBuy("Thêm thành công, mời kiểm tra giỏ hàng!");
        setTimeout(() => {
            setSuccessBuy(null);
        }, 5000);
        return;
    }

    const handleChangeVariant = (e: any) => {
        if (e.target !== e.currentTarget) return;
        const position = e.target.dataset.position;

        const prod = product?.skus.filter(prod => {
            if(prod.sku === position) {
                return prod
            }
        })

        setObVariant({
            sku: position,
            price: prod[0].price,
            stock: prod[0].stock,
            variants: {
                [position.split("-")[0]]: position
            }
        })
    };

    // console.log(obVariant);

    return (
        <div className="lg:max-w-screen-xl sm:max-w-screen-md max-w-screen-sm w-full mx-auto">

            <div className="-mx-3">

                {
                    product ? (
                        <div className="md:flex bg-white py-4">
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
                                        {convertPrice(product?.skus[0]?.price || 0)}
                                    </div>
                                    {/* <div className="line-through mr-3">856.000 ₫</div>
                                    <div className="font-semibold text-rose-500">-30%</div> */}
                                </div>
            
                                <div className="flex leading-tight mb-3 gap-3">
                                    <div className=""><ListStar numb={product?.rating || 5}/></div>
                                    <p className="">(Xem 18 đánh giá)</p>
                                    <p className="border-l pl-3">Đã bán 70</p>
                                </div>
            
                                <OptionVariant
                                    obVariant={obVariant}
                                    handleChangeVariant={handleChangeVariant}
                                    product={product}
                                />

                                <InputQuantity
                                    quantity={
                                        // product?.variants.length === 0 ? product.skus[0].stock : (
                                        //     Object.keys(obVariant).length === 0 ? 0 : (
                                        //         product.skus.forEach((prd) => {
                                        //             if(prd.sku === obVariant[0].position) {
                                        //                 return prd.stock;
                                        //             }
                                        //         })
                                        //     )
                                        // )
                                        product?.variants.length === 0 ? product.skus[0].stock : (
                                            obVariant?.stock ? obVariant?.stock : 0
                                        )
                                    }
                                    value={countProduct}
                                    setValue={setCountProduct}
                                    setErrorBuy={setErrorBuy}
                                />

                                <div className="h-7">
                                    <span className="text-red-600">{errorBuy}</span>
                                    <span className="text-blue-600">{successBuy}</span>
                                </div>
                                
                                <div className="flex">
                                    {/* <button className="sm:p-4 p-3 border mr-2 bg-white hover:bg-slate-50">
                                        <IconHeart className="w-5 h-5"/>
                                    </button> */}
                                    <button onClick={handleAddCartProduct} className="sm:py-3 py-2 border bg-gray-600 hover:bg-gray-700/80 text-white uppercase font-semibold w-1/2 mr-2">
                                        Thêm vào giỏ hàng
                                    </button>
                                    <button className="sm:py-3 py-2 border bg-blue-600 hover:bg-blue-700/90 text-white uppercase font-semibold w-1/2">
                                        Mua ngay
                                    </button>
                                </div>
                            </div>

                        </div>
                    ) : (
                        <ProductLoad />
                    )
                } 
    
                <div className="bg-white px-3 py-4 my-4 min-h-[250px]">
                    <h2 className="font-semibold text-xl mb-4">Thông tin chi tiết</h2>
    
                    <ul className="block [&>li]:flex [&>li]:py-2">

                        {
                            product && product?.productDetail?.productInformationItems.map((itemInfo, index) => {
                                return (
                                    <li key={itemInfo.id} className={`px-3 ${index%2===0 && "bg-gray-100"}`}>
                                        <div className="basis-[35%]">{itemInfo?.name}</div>
                                        <p className="ml-4 flex-1">{itemInfo?.value}</p>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>

                <div className="bg-white px-3 py-4 my-4 min-h-[250px]">
                    <h2 className="font-semibold text-xl mb-4">Mô tả sản phẩm</h2>

                    <MarkContent>
                        {product?.description}
                    </MarkContent>

                </div>

                <div className="bg-white px-3 py-4 my-4 min-h-[250px]">
                    <h2 className="font-semibold text-lg mb-4">Đánh Giá - Nhận Xét Từ Khách Hàng</h2>
                </div>

            </div>

        </div>
    )
}

export default ProductDetail;

export const getStaticProps: GetStaticProps = async (context) => {
    const { slugProduct } = context.params as Params;

    const productsRes = await productService.findOne(slugProduct);

    if (!productsRes?.success) {
        return {
            props: {
                products: null,
            },
        };
    }

    return {
        props: {
            product: JSON.parse(JSON.stringify(productsRes?.product)),
        },
        revalidate: 60 * 5,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: true };
};

ProductDetail.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};



// obj = {
//     "1": "1-3",
//     "2": "2-1"
// }

// arr = [
//     title: "test title",
//     slug: "2343-23-4-234-23",
//     variant: [
//         {
//             position: "1",
//             name: "variant 1 HFK",
//             subvariant: [
//                 {
//                     position: "1-1",
//                     value: "subvariant 1 KTJ",
//                 },
//                 {
//                     position: "1-2",
//                     value: "subvariant 2 FVS",
//                 },
//                 {
//                     position: "1-3",
//                     value: "subvariant 3 JSB",
//                 },
//             ]
//         },
//         {
//             position: "2",
//             name: "variant 2 KFE",
//             subvariant: [
//                 {
//                     position: "2-1",
//                     value: "subvariant 2-1 ABC",
//                 },
//                 {
//                     position: "2-2",
//                     value: "subvariant 2-2 NVB",
//                 },
//             ]
//         }
//     ],
//     sku: [
//         {
//             sku: "1-1_2-1",
//             stock: 2
//         },
//         {
//             sku: "1-1_2-2",
//             stock: 2
//         },
//         {
//             sku: "1-2_2-1",
//             stock: 2
//         },
//         {
//             sku: "1-2_2-2",
//             stock: 2
//         },
//         {
//             sku: "1-3_2-1",
//             stock: 2
//         },
//         {
//             sku: "1-3_2-2",
//             stock: 2
//         },
//     ]
// ]

// từ 2 cái trên biến đổi thành

// {
//     sku: "1-3_2-1",
//     stock: 2,
//     variants: [
//         {
//             position: "1-3",
//             value: "subvariant 3 JSB",
//         },
//         {
//             position: "2-1",
//             value: "subvariant 2-1 ABC",
//         },
//     ]
// }

["1123", "mk1", "134w"]