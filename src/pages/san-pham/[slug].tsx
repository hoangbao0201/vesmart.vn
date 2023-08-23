import Image from "next/image";
import { useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";

import { NextPageWithLayout } from "../_app";
import { ListStar } from "@/components/share/ListStar";
import MainLayout from "@/components/layouts/MainLayout";
import { IconHeart } from "../../../public/static/icons/IconSvg";
import InputQuantity from "@/components/share/InputQuantity";
import productService from "@/serverless/product.service";
import { ProductTypes } from "@/types";
import convertPrice from "@/utils/convertPrice";



export interface Params extends ParsedUrlQuery {
    slug: string;
}

interface ProductDetailProps {
    product: ProductTypes
}

const ProductDetail : NextPageWithLayout<ProductDetailProps> = ({ product }) => {

    console.log(product)

    const [countProduct, setCountProduct] = useState<number>(0);
    const [dataBuy, setDataBuy] = useState({
        "màu sắc": [
            ""
        ]
    })

    return (
        <div className="lg:max-w-screen-xl sm:max-w-screen-md max-w-screen-sm w-full mx-auto">

            <div className="-mx-3">

                <div className="md:flex bg-white py-4">
                    <div className="relative md:w-4/12 px-3 mb-3">
                        <div className="bg-gray-100 overflow-hidden border max-w-md:max-w-[400px]">
                            <Image
                                width={500}
                                height={500}
                                alt="Ảnh sản phẩm"
                                src="https://down-vn.img.susercontent.com/file/3149ca83c85c10e195f9e913757ff097"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        {/* <ListImageDetail /> */}
                    </div>
                    <div className="relative md:w-8/12 px-3 mb-3">
                        <div className="mb-4">
                            <h1 className="font-semibold text-2xl">
                                {product?.title}
                            </h1>
                        </div>
    
                        <div className="p-4 mb-4 bg-gray-100 flex items-end leading-none">
                            <div className="font-semibold text-[30px] text-rose-500 mr-3">
                                {convertPrice(product?.price || 0)}
                            </div>
                            <div className="line-through mr-3">856.000 ₫</div>
                            <div className="font-semibold text-rose-500">-30%</div>
                        </div>
    
                        <div className="flex items-center leading-tight">
                            <ListStar numb={4.5}/>
                            <p className="px-2">(Xem 18 đánh giá)</p>
                            <p className="px-2 border-l">Đã bán 70</p>
                        </div>
    
                        <div className="mb-4">
                            <ul className="flex flex-wrap gap-2">
                                <li className="py-1 px-2 cursor-pointer min-w-[80px] text-center border hover:border-sky-500 hover:text-sky-500 rounded-sm">xanh</li>
                                <li className="py-1 px-2 cursor-pointer min-w-[80px] text-center border hover:border-sky-500 hover:text-sky-500 rounded-sm">đỏ</li>
                                <li className="py-1 px-2 cursor-pointer min-w-[80px] text-center border hover:border-sky-500 hover:text-sky-500 rounded-sm">tím</li>
                                <li className="py-1 px-2 cursor-pointer min-w-[80px] text-center border hover:border-sky-500 hover:text-sky-500 rounded-sm">vàng</li>
                                <li className="py-1 px-2 cursor-pointer min-w-[80px] text-center border hover:border-sky-500 hover:text-sky-500 rounded-sm">cam</li>
                            </ul>
                        </div>

                        <InputQuantity
                            quantity={10}
                            value={countProduct}
                            setValue={setCountProduct}
                        />
                        
                        <div className="flex">
                            <button className="sm:p-4 p-3 border mr-2 bg-white hover:bg-slate-50">
                                <IconHeart className="w-5 h-5"/>
                            </button>
                            <button className="sm:py-3 py-2 border bg-gray-600 hover:bg-gray-700/80 text-white uppercase font-semibold flex-1 mr-2">
                                Thêm vào giỏ hàng
                            </button>
                            <button className="sm:py-3 py-2 border bg-blue-600 hover:bg-blue-700/90 text-white uppercase font-semibold flex-1">
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
    
                <div className="bg-white px-3 py-4 my-4">
                    <h2 className="font-semibold text-lg mb-4">Thông tin chi tiết</h2>
    
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

                <div className="bg-white px-3 py-4 my-4">
                    <h2 className="font-semibold text-lg mb-4">Thông tin chi tiết</h2>

                    <div>{product?.description}</div>

                    {/* <div dangerouslySetInnerHTML={{ __html: product?.description }}> */}
                        {/* Giải trí bất tận mỗi ngày, thoải mái thưởng thức nhiều nội dung hơn với màn hình tràn viền vô cực Infinity-V 6,5inch trên Galaxy A04s. Tận hưởng nội dung hiển thị rõ ràng và sắc nét đến không ngờ nhờ màn hình HD+ với tần số quét 90Hz giúp hiển thị mượt mà.
                        <br/>
                        Thiết kế liền mạch với cụm camera không viền thời thượng mang đến một Galaxy A04s đầy mị lực và sự thoải mái khi cầm nắm. Trọn bộ công nghệ đột phá đi kèm với 3 màu phá cách Đồng ánh hồng, Xanh dương xỉ, Đen tinh vân cho bạn thỏa sức khoe cái tôi cá tính. */}
                        
                    {/* </div> */}
                </div>

                <div className="bg-white px-3 py-4 my-4">
                    <h2 className="font-semibold text-lg mb-4">Đánh Giá - Nhận Xét Từ Khách Hàng</h2>
                </div>

            </div>

        </div>
    )
}

export default ProductDetail;

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as Params;

    const productsRes = await productService.findOne(slug);

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
