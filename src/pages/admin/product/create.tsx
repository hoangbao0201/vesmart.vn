import AdminLayout from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { ChangeEvent, Fragment, useState } from "react";
import { IconPlus } from "../../../../public/static/icons/IconSvg";
import { convertTextToSlug } from "@/utils/convertTextToSlug";

interface SubVariantProps {
    name: string
    position: string
}
interface VariantProps {
    name: string
    position: string
    subVariants: SubVariantProps[]
}

interface VariantsProductProps {
    variants: VariantProps[] | []
    skus: any
}

const ProductCreatePage : NextPageWithLayout = () => {

    const [dataProduct, setDataProduct] = useState({
        title: "",
        slug: "",
        description: "",
        brand: "",
    })
    const [variantsProduct, setVariantsProduct] = useState<VariantsProductProps>({
        variants: [],
        skus: []
    })

    const eventOnchangeValueVariant = (e: ChangeEvent<HTMLInputElement>, type: "variant" | "subVariant") => {
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
            const newPosition = updatedData.variants[indexVariant-1].subVariants.length+1
            
            // @ts-ignore
            if(indexSubVariant == updatedData.variants[indexVariant-1].subVariants.length) {
                // @ts-ignore
                updatedData.variants[indexVariant-1].subVariants.push({
                    name: "",
                    position: indexVariant + "-" + newPosition
                })
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
            ]
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

        setVariantsProduct(updatedData);
    }


    return (
        <div>

            <div>
                <div>
                    <label className="block mb-2">Tên sản phẩm</label>
                    <input
                        placeholder=""
                        name="title"
                        value={dataProduct.title}
                        onChange={handleOnchangeDataProduct}
                        className="input-info mb-4 max-w-lg"
                    />
                </div>
                <div>
                    <label className="block mb-2">Đường dẫn</label>
                    <input
                        disabled={true}
                        placeholder=""
                        value={dataProduct.slug}
                        className="input-info mb-4 max-w-lg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Xuất sứ</label>
                    <input
                        placeholder=""
                        name="brand"
                        value={dataProduct.brand}
                        onChange={handleOnchangeDataProduct}
                        className="input-info mb-4 max-w-lg"
                    />
                    <ul className="flex [&>li]:mr-2">
                        <li onClick={() => setDataProduct({...dataProduct, brand: "No brand"})} className="active:border-sky-600 border px-2 cursor-pointer rounded-sm bg-gray-100 border-gray-400">No brand</li>
                        <li onClick={() => setDataProduct({...dataProduct, brand: "Trung Quốc"})} className="active:border-sky-600 border px-2 cursor-pointer rounded-sm bg-gray-100 border-gray-400">Trung Quốc</li>
                        <li onClick={() => setDataProduct({...dataProduct, brand: "Việt Nam"})} className="active:border-sky-600 border px-2 cursor-pointer rounded-sm bg-gray-100 border-gray-400">Việt Nam</li>
                        <li onClick={() => setDataProduct({...dataProduct, brand: "VESMART"})} className="active:border-sky-600 border px-2 cursor-pointer rounded-sm bg-gray-100 border-gray-400">VESMART</li>
                    </ul>
                </div>
                <div>
                    <label className="block mb-2">Mô tả</label>
                    <textarea
                        placeholder=""
                        name="description"
                        value={dataProduct.description}
                        onChange={handleOnchangeDataProduct}
                        className="input-info mb-4 max-w-lg min-h-[300px]"
                    />
                </div>
            </div>
            <div>
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
                                                onChange={(e) => eventOnchangeValueVariant(e, "variant")}
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
                                                                        onChange={(e) => eventOnchangeValueVariant(e, "subVariant")}
                                                                        className="input-info mb-4 mr-2"
                                                                    />
                                                                    {
                                                                        variant.subVariants.length-1 !== index && (
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
                    <table className="border">
                        <thead>
                            <tr className="border-b">
                                {
                                    variantsProduct.variants.length >= 1 && variantsProduct.variants.length <=2 && variantsProduct.variants[0].subVariants[0].name.length !== 0 && variantsProduct.variants.map(variant => {
                                        return (
                                            <th key={variant.position} className="py-2 mb-4">{variant.name}</th>
                                        )
                                    })
                                }
                                <th className="py-2 mb-4">Giá</th>
                                <th className="py-2 mb-4">Kho hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    (variantsProduct.variants.length === 1 || variantsProduct.variants.length === 2) && variantsProduct.variants[0].subVariants[0].name.length !== 0 ? (variantsProduct.variants[0].subVariants.slice(0,-1).map(variant => {
                                        return (
                                            variantsProduct.variants.length === 1 || variantsProduct.variants[1].subVariants[0].name.length === 0 ? (
                                                <tr key={variant.position} className="border-b">
                                                    <td className="px-4 py-3">
                                                        <p>{variant.name}</p>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div>
                                                            <input className="input-info"/>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div>
                                                            <input className="input-info"/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                variantsProduct.variants[1].subVariants.slice(0, -1).map((subVariant, index) => {
                                                    return (
                                                        <tr key={subVariant.position} className="border-b">
                                                            {
                                                                index === 0 && (
                                                                    <td rowSpan={variantsProduct.variants[1].subVariants.length-1} className="px-4 py-3 border-r text-center">
                                                                        <p>{variant.name}</p> 
                                                                    </td>
                                                                )
                                                            }
                                                            <td rowSpan={1} className="px-4 py-3 border-r text-center">
                                                                <p>{subVariant.name}</p>
                                                            </td>
                                                            <td className="px-4 py-3 border-r">
                                                                <div>
                                                                    <input className="input-info"/>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-3 border-r">
                                                                <div>
                                                                    <input className="input-info"/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            )
                                        )
                                    })) : (
                                        <tr className="border-b">
                                            <td className="px-4 py-3">
                                                <div>
                                                    <input className="input-info"/>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div>
                                                    <input className="input-info"/>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                        </tbody>
                    </table>
                </div>

                <div>
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

        </div>
    )
}

export default ProductCreatePage;

ProductCreatePage.getLayout = (page) => {
    return <AdminLayout tab="/admin/product/create">{page}</AdminLayout>;
};




                                            // <Fragment key={variant.position}>
                                            //     {
                                            //         // @ts-ignore
                                            //         variantsProduct.variants.length === 1 || variantsProduct.variants.length === 2 && variantsProduct.variants[1].subVariants[0].name === "" ? (
                                            //             variant.subVariants.slice(0,-1).map((subVariant) => {
                                            //                 return (
                                            //                     <tr key={subVariant.position} className="border-b">
                                            //                         <td className="px-4 py-3">
                                            //                             <p>{subVariant.name}</p>
                                            //                         </td>
                                            //                         <td className="px-4 py-3">
                                            //                             <div>
                                            //                                 <input className="input-info"/>
                                            //                             </div>
                                            //                         </td>
                                            //                         <td className="px-4 py-3">
                                            //                             <div>
                                            //                                 <input className="input-info"/>
                                            //                             </div>
                                            //                         </td>
                                            //                     </tr>
                                            //                 )
                                            //             })
                                            //         ) : (
                                            //             variantsProduct.variants[1].subVariants.slice(0,-1).map((subVariant, index) => {
                                            //                 return (
                                            //                     <tr key={subVariant.position} className="border-b">
                                            //                         {
                                            //                             index === 0 &&(
                                            //                                 <td rowSpan={variantsProduct.variants[1].subVariants.length-1} className="px-4 py-3 border-r text-center">
                                            //                                     <p>{variant.name}</p> 
                                            //                                 </td>
                                            //                             )
                                            //                         }
                                            //                         <td rowSpan={1} className="px-4 py-3 border-r text-center">
                                            //                             <p>{subVariant.name}</p>
                                            //                         </td>
                                            //                         <td className="px-4 py-3 border-r">
                                            //                             <div>
                                            //                                 <input className="input-info"/>
                                            //                             </div>
                                            //                         </td>
                                            //                         <td className="px-4 py-3 border-r">
                                            //                             <div>
                                            //                                 <input className="input-info"/>
                                            //                             </div>
                                            //                         </td>
                                            //                     </tr>
                                            //                 )
                                            //             })
                                            //         )
                                            //     }
                                            // </Fragment>