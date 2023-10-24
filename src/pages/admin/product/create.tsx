import { ChangeEvent, useState } from "react";

import { ShowToastify } from "@/components/Features/ShowToastify";

import { NextPageWithLayout } from "@/pages/_app";
import AdminLayout from "@/components/layouts/AdminLayout";
import { convertTextToSlug } from "@/utils/convertTextToSlug";
import { IconPlus } from "../../../../public/static/icons/IconSvg";
import LoadingDots from "@/components/share/Loading/LoadingDots";
import axios from "axios";


interface SubVariantProps {
    name: string
    position: string
}
interface VariantProps {
    name: string
    position: string
    subVariants: SubVariantProps[]
}

interface SkuProps {
    price: number
    stock: number
    sku: string
}

interface VariantsProductProps {
    variants: VariantProps[] | []
    skus: SkuProps[]
}

const ProductCreatePage : NextPageWithLayout = () => {

    const [dataProduct, setDataProduct] = useState({
        title: "",
        slug: "",
        description: "",
        brand: "",
        images: ""
    })
    const [variantsProduct, setVariantsProduct] = useState<VariantsProductProps>({
        variants: [],
        skus: [
            {
                price: 0,
                stock: 0,
                sku: ""
            }
        ]
    })
    const [productItemInfo, setProductItemInfo] = useState<{name: string, value: string}[]>([{
        name: "",
        value: ""
    }]);
    const [isLoad, setIsLoad] = useState(false);
    const [productListItemInfo, setProductListItemInfo] = useState("");

    const handleOnchangeValueVariant = (e: ChangeEvent<HTMLInputElement>, type: "variant" | "subVariant") => {
        let updatedData = { ...variantsProduct };

        if(type === "variant") {
            // @ts-ignore
            updatedData.variants[e.target.dataset.index-1].name = e.target.value;
        }
        else if(type === "subVariant") {
            const indexVariant = e.target.dataset.index?.split("-")[0];
            const indexSubVariant = e.target.dataset.index?.split("-")[1];
            // @ts-ignore
            updatedData.variants[indexVariant-1].subVariants[indexSubVariant-1].name = e.target.value;

            // @ts-ignore
            const newPosition = updatedData.variants[indexVariant-1].subVariants.length+1;
            
            // @ts-ignore
            if(indexSubVariant == updatedData.variants[indexVariant-1].subVariants.length) {
                // @ts-ignore
                updatedData.variants[indexVariant-1].subVariants.push({
                    name: "",
                    position: indexVariant + "-" + newPosition
                })

                if(updatedData.variants.length === 2 && updatedData.variants[1].subVariants[0].name !== "") {
                    let newUpdateSkus : { price: number, stock: number, sku: string }[] = []
                    for(let a1 of updatedData.variants[0].subVariants) {
                        for(let a2 of updatedData.variants[1].subVariants) {
                            newUpdateSkus.push({
                                price: 0,
                                stock: 0,
                                sku: `${a1.position}_${a2.position}`
                            })
                        }
                    }
                    updatedData.skus = newUpdateSkus;
                }
                else {
                    if(updatedData.skus[0].sku === "") {
                        updatedData.skus[0] = {
                            ...updatedData.skus[0],
                            sku: "1-1"
                        }
                    }
                    else {
                        // @ts-ignore
                        updatedData.skus.push({
                            price: 0,
                            stock: 0,
                            sku: `${indexVariant}-${newPosition-1}`
                        })
                    }
                }
            }
        }

        setVariantsProduct(updatedData);
    }

    const handleOnchangeDataProduct = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if(e.target.name === "title") {
            setDataProduct({
                ...dataProduct,
                [e.target.name]: e.target.value,
                slug: convertTextToSlug(e.target.value) || ""
            })
        }
        else {
            setDataProduct({
                ...dataProduct,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleAddVariantProduct = () => {
        const position = variantsProduct.variants.length + 1;
        if(position>=3) {
            return;
        }

        // let skusUpdate = [...variantsProduct.skus]
        // skusUpdate = skusUpdate[0].sku === "" ? (
        //     skusUpdate[0].sku = "1-1"
        // ) : (
        //     [
        //         ...skusUpdate,
        //         {
        //             price: 0,
        //             stock: 0,
        //             sku: "",
        //         }
        //     ]
        // )
        setVariantsProduct({
            ...variantsProduct,
            variants: [
                ...variantsProduct.variants,
                {
                    name: "",
                    position: String(position),
                    subVariants: [
                        {
                            name: "",
                            position: String(position) + "-1"
                        },
                    ]
                }
            ],
        })
    }

    const handleDeleteSubvariant = (position: string) => {
        const indexVariant = position.split("-")[0];
        const indexSubVariant = position.split("-")[1];

        let updatedData = { ...variantsProduct };

        // @ts-ignore
        updatedData.variants[indexVariant-1].subVariants = updatedData.variants[indexVariant-1].subVariants.filter(subVariant => subVariant.position !== position).map(subVariant => {
            if(subVariant.position.split("-")[1] > indexSubVariant) {
                return {
                    ...subVariant,
                    // @ts-ignore
                    position: `${indexVariant}-${Number(subVariant.position.split("-")[1]-1)}`
                }
            }

            return subVariant;
        });

        // @ts-ignore
        updatedData.skus = updatedData.variants[0].subVariants.length === 1 ? [{ ...updatedData.skus[0], sku: "" }] : updatedData.skus.filter(skuP => skuP.sku !== position).map(skuP => {
            if(skuP.sku.split("-")[1] > indexSubVariant) {
                return {
                    ...skuP,
                    // @ts-ignore
                    sku: `${indexVariant}-${Number(skuP.sku.split("-")[1]-1)}`
                }
            }

            return skuP;
        });

        setVariantsProduct(updatedData);
    }

    const handleOnchangeSkuProduct = (e: ChangeEvent<HTMLInputElement>,type: "price" | "stock", position: string) => {
        if(!/^[0-9]*(\.[0-9]+)?$/.test(e.target.value)) {
            return;
        }
        const skuPs = position.split("_");
        let updatedData = { ...variantsProduct };
        if(position === "") {
            // @ts-ignore
            updatedData.skus[0][type] = Number(e.target.value || 0);
            setVariantsProduct(updatedData);
        }
        else if(skuPs.length === 1) {
            // @ts-ignore
            updatedData.skus[position.split("-")[1]-1][type] = Number(e.target.value || 0);
            setVariantsProduct(updatedData);
        }
    }

    const handleCreateProduct = async () => {
        const { title, slug, description, brand } = dataProduct;
        if(!title || !slug || !description || !brand) {
            ShowToastify({
                data: "Chưa điền đủ thông tin",
                type: "error"
            })
            return;
        }

        try {
            setIsLoad(true);
            const productRes = await axios.post("/api/product/create", {
                ...dataProduct,
                variants: variantsProduct.variants.length > 0 ? variantsProduct.variants.map((variantP) => {
                    return ({
                        ...variantP,
                        subVariants: variantP.subVariants.slice(0, -1)
                    })
                }) : [],
                skus: variantsProduct.skus,
                images: dataProduct.images.split("\n").map(item => {
                    return ({
                        url: item,
                        publicId: item.split("https://down-vn.img.susercontent.com/file/")[1]
                    })
                }),
                productInformationItems: productItemInfo.slice(0,-1)
            })
            
            if(productRes.data.success) {
                ShowToastify({
                    data: "Tạo sản phẩm thành công",
                    type: "success",
                });
            }

            // console.log(productRes?.data);
            setIsLoad(false);
        } catch (error) {
            setIsLoad(false);
        }
    }

    const handleOnchangeDataItemInfo = (e: ChangeEvent<HTMLInputElement>) => {
        const updateData = [...productItemInfo];
        const position = e.target.dataset.index;

        // @ts-ignore
        updateData[position][e.target.name] = e.target.value;
        
        // @ts-ignore
        if(Number(position)+1 == productItemInfo.length && productItemInfo[position].name) {
            setProductItemInfo([
                ...updateData,
                {
                    name: "",
                    value: "",
                }
            ])
        }
        else {
            setProductItemInfo([
                ...updateData,
            ])
        }
    }

    const handleDeleteDataItemInfo = (position: number) => {
        let updateData = [...productItemInfo];
        updateData = updateData.filter((upD, index) => index !== position);
        setProductItemInfo([
            ...updateData,
        ])
    }

    const handleAddFastDataItems = () => {
        let updateData = [...productItemInfo];
        let arrListItem : string[] = [];
        arrListItem = productListItemInfo.trim().split("\n");

        if(arrListItem.length >= 2) {
            for(let i = 0; i < arrListItem.length; i = i + 2) {

                updateData.splice(updateData.length - 1, 0, { name: arrListItem[i], value: arrListItem[i+1] });

                updateData[productItemInfo.length + i];

            }
        };

        setProductItemInfo([
            ...updateData
        ]);

        setProductListItemInfo("");
    }

    console.log(productItemInfo)

    return (
        <div>

            <div className="bg-white py-5 px-5 mb-4 rounded-xl border">
                <div>
                    <label className="block mb-2 font-semibold">Tên sản phẩm</label>
                    <input
                        placeholder=""
                        name="title"
                        value={dataProduct.title}
                        onChange={handleOnchangeDataProduct}
                        className="input-info mb-4 max-w-3xl"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Đường dẫn</label>
                    <input
                        disabled={true}
                        placeholder=""
                        value={dataProduct.slug}
                        className="input-info mb-4 max-w-3xl"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Xuất sứ</label>
                    <input
                        placeholder=""
                        name="brand"
                        value={dataProduct.brand}
                        onChange={handleOnchangeDataProduct}
                        className="input-info mb-4 max-w-3xl"
                    />
                    <ul className="flex [&>li]:mr-2 select-none">
                        <li onClick={() => setDataProduct({...dataProduct, brand: "No brand"})} className="active:border-sky-600 border px-2 cursor-pointer rounded-sm bg-gray-100 border-gray-400">No brand</li>
                        <li onClick={() => setDataProduct({...dataProduct, brand: "Trung Quốc"})} className="active:border-sky-600 border px-2 cursor-pointer rounded-sm bg-gray-100 border-gray-400">Trung Quốc</li>
                        <li onClick={() => setDataProduct({...dataProduct, brand: "Việt Nam"})} className="active:border-sky-600 border px-2 cursor-pointer rounded-sm bg-gray-100 border-gray-400">Việt Nam</li>
                        <li onClick={() => setDataProduct({...dataProduct, brand: "VESMART"})} className="active:border-sky-600 border px-2 cursor-pointer rounded-sm bg-gray-100 border-gray-400">VESMART</li>
                    </ul>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Ảnh sản phẩm</label>
                    <textarea
                        placeholder=""
                        name="images"
                        value={dataProduct.images}
                        onChange={handleOnchangeDataProduct}
                        className="input-info max-w-3xl min-h-[200px]"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Mô tả</label>
                    <textarea
                        placeholder=""
                        name="description"
                        value={dataProduct.description}
                        onChange={handleOnchangeDataProduct}
                        className="input-info max-w-3xl min-h-[300px]"
                    />
                </div>
            </div>

            <div className="bg-white py-5 px-5 mb-4 rounded-xl border">
                <h2 className="text-lg font-semibold mb-2">Đặc tính sản phẩm</h2>
                <div className="mb-4">
                    <table className="border border-gray-400 w-full">
                        <thead>
                            <tr className="border-b border-gray-400 bg-indigo-100">
                                <th className="py-2 mb-4">Đặt tính</th>
                                <th className="py-2 mb-4">Thông tin</th>
                                <th className="py-2 mb-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productItemInfo.length > 0 && productItemInfo.map((itemInfo, index) => {
                                    return (
                                        <tr key={index} className="border-b border-gray-400">
                                            <td className="px-4 py-3">
                                                <div>
                                                    <input
                                                        data-index={index}
                                                        name="name"
                                                        value={itemInfo.name}
                                                        onChange={handleOnchangeDataItemInfo}
                                                        className="input-info"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div>
                                                    <input
                                                        data-index={index}
                                                        name="value"
                                                        value={itemInfo.value}
                                                        onChange={handleOnchangeDataItemInfo}
                                                        className="input-info"
                                                    />
                                                    {/* <span>{itemInfo}</span> */}
                                                </div>
                                            </td>
                                            <td>
                                                {
                                                    productItemInfo.length-1 !== index && (
                                                        <button onClick={() => handleDeleteDataItemInfo(index)} className="border border-gray-400 px-2 py-1 mx-2 hover:bg-gray-100">xóa</button>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div>
                    <label className="mb-2 block">Thêm nhanh</label>
                    <textarea
                        value={productListItemInfo}
                        onChange={(e) => setProductListItemInfo(e.target.value)}
                        placeholder="Nhấn vào"
                        className={`border px-4 py-3 outline-none rounded-md w-full resize-none ${productListItemInfo.trim().length > 0 ? "" : "bg-slate-100"}`}
                    />
                    <button
                        onClick={handleAddFastDataItems}
                        className="border rounded-md bg-blue-600 focus:bg-blue-700 text-white px-3 py-2"
                    >
                        Thêm vào
                    </button>
                </div>
            </div>

            <div className="bg-white py-5 px-5 mb-4 rounded-xl border">
                <h2 className="text-lg font-semibold mb-2">Giá bán, Kho hàng và Biến thể</h2>
                <div className="mb-4">
                    <button onClick={handleAddVariantProduct} className="border rounded-md hover:bg-gray-100 px-3 py-1 text-gray-700 flex items-center">
                        <IconPlus className="w-3 h-3 mr-2" />
                        <span>Thêm biến thể</span>
                    </button>
                </div>
                
                {
                    variantsProduct.variants.length>0 && (
                        <div className="bg-indigo-100 border px-3 py-4 mb-3">
                            {
                                variantsProduct.variants.map((variant) => {
                                    return (
                                        <div key={variant.position} className="mb-3">
                                            <h4 className="mb-2 font-semibold">Tên biến thể</h4>
                                            <input
                                                data-index={variant.position}
                                                value={variant.name}
                                                onChange={(e) => handleOnchangeValueVariant(e, "variant")}
                                                className="input-info mb-4"
                                            />
                                            <div className="ml-3">
                                                <h4 className="mb-2 font-semibold">Biến thể con</h4>
                                                <div className="bg-white border px-3 py-4">
                                                    {
                                                        variant.subVariants.map((subVariant, index) => {
                                                            return (
                                                                <div key={subVariant.position} className="flex items-center">
                                                                    <input
                                                                        data-index={subVariant.position}
                                                                        value={subVariant.name}
                                                                        onChange={(e) => handleOnchangeValueVariant(e, "subVariant")}
                                                                        className="input-info mb-4 mr-2"
                                                                    />
                                                                    {
                                                                        productItemInfo.length-1 !== index && (
                                                                            <button onClick={() => handleDeleteSubvariant(subVariant.position)} className="border px-2 hover:bg-gray-100">xóa</button>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }

                <h3 className="font-semibold mb-2">*Giá bán & Kho hàng</h3>

                <div className="mb-3">
                    <table className="border border-gray-400 w-full">
                        <thead className="bg-indigo-100">
                            <tr className="border-b border-gray-400">
                                {
                                    (variantsProduct.variants.length === 1 || variantsProduct.variants.length === 2) && variantsProduct?.variants[0].subVariants[0].name.length !== 0 && (
                                        <th key={variantsProduct.variants[0].position} className="py-2 mb-4 border-x border-gray-400">{variantsProduct.variants[0].name}</th>
                                    )
                                }
                                {
                                    variantsProduct.variants.length === 2 && variantsProduct.variants[1].subVariants[0].name.length !== 0 && (
                                        <th key={variantsProduct.variants[1].position} className="py-2 mb-4 border-x border-gray-400">{variantsProduct.variants[1].name}</th>
                                    )
                                }
                                <th className="py-2 mb-4 border-x border-gray-400">Giá</th>
                                <th className="py-2 mb-4 border-x border-gray-400">Kho hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    (variantsProduct.variants.length === 1 || variantsProduct.variants.length === 2) && variantsProduct.variants[0].subVariants[0].name.length !== 0 ? (variantsProduct.variants[0].subVariants.slice(0,-1).map(variant => {
                                        return (
                                            variantsProduct.variants.length === 1 || variantsProduct.variants[1].subVariants[0].name.length === 0 ? (
                                                <tr key={variant.position} className="[&>td]:border [&>td]:border-gray-400">
                                                    <td className="px-4 py-3">
                                                        <p>{variant.name}</p>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div>
                                                            <input
                                                                // @ts-ignore
                                                                value={variantsProduct.skus[Number(variant.position.split("-")[1]-1)].price}
                                                                onChange={(e) => handleOnchangeSkuProduct(e, "price", variant.position)}
                                                                className="input-info"
                                                                />
                                                            <span>{variant.position}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div>
                                                            <input
                                                                // @ts-ignore
                                                                value={variantsProduct.skus[Number(variant.position.split("-")[1]-1)].stock}
                                                                onChange={(e) => handleOnchangeSkuProduct(e, "stock", variant.position)}
                                                                className="input-info"
                                                            />
                                                            <span>{variant.position}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                variantsProduct.variants[1].subVariants.slice(0, -1).map((subVariant, index) => {
                                                    return (
                                                        <tr key={subVariant.position} className="[&>td]:border [&>td]:border-gray-400">
                                                            {
                                                                index === 0 && (
                                                                    <td rowSpan={variantsProduct.variants[1].subVariants.length-1} className="px-4 py-3 border-r border-gray-400 text-center">
                                                                        <p>{variant.name}</p>
                                                                    </td>
                                                                )
                                                            }
                                                            <td rowSpan={1} className="px-4 py-3 border-r border-gray-400 text-center">
                                                                <p>{subVariant.name}</p>
                                                            </td>
                                                            <td className="px-4 py-3 border-r border-gray-400">
                                                                <div>
                                                                    <input className="input-info"/>
                                                                    <span>{subVariant.position}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3 border-r border-gray-400">
                                                                <div>
                                                                    <input className="input-info"/>
                                                                    <span>{subVariant.position}</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            )
                                        )
                                    })) : (
                                        <tr className="[&>td]:border [&>td]:border-gray-400">
                                            <td className="px-4 py-3">
                                                <div>
                                                    <input
                                                        value={variantsProduct.skus[0].price}
                                                        onChange={(e) => handleOnchangeSkuProduct(e, "price", variantsProduct.skus[0].sku)}
                                                        className="input-info"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div>
                                                    <input
                                                        value={variantsProduct.skus[0].stock}
                                                        onChange={(e) => handleOnchangeSkuProduct(e, "stock", variantsProduct.skus[0].sku)}
                                                        className="input-info"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                        </tbody>
                    </table>
                </div>

            </div>

            <div className="bg-white py-4 px-5 mb-4 rounded-xl border">
                <div className="flex justify-end">
                    <button disabled={isLoad} onClick={handleCreateProduct} className="disabled:opacity-90 bg-blue-600 enabled:hover:bg-blue-700 transition-all border px-3 py-2 rounded-md text-white font-semibold">
                        Đăng sản phẩm {isLoad && <LoadingDots color="#ffff" />}
                    </button>
                </div>
            </div>

            <div className="bg-white py-5 px-5 mb-4 rounded-xl border">
                <p>Data Product</p>
                <div>
                    {JSON.stringify(dataProduct)}
                </div>
                <p>Variant Product</p>
                <div>
                    {JSON.stringify(variantsProduct)}
                </div>
            </div>

        </div>
    )
}

export default ProductCreatePage;

ProductCreatePage.getLayout = (page) => {
    return <AdminLayout tab="/admin/product/create">{page}</AdminLayout>;
};


