import { ProductTypes } from "@/types";
import { ChangeEvent, Fragment, useState } from "react";
import { IconCheck } from "../../../../public/static/icons/IconSvg";

interface OptionVariantProps {
    product: ProductTypes;
    obVariant: any;
    handleChangeVariant: (e: any) => void;
}

const OptionVariant = ({
    product,
    obVariant,
    handleChangeVariant,
}: OptionVariantProps) => {

    return (
        <>
            {product?.variants.length > 0 && (
                <div className="mb-4 flex">
                    {product.variants.map((variant) => {
                        return (
                            <Fragment key={variant?.id}>
                                <label className="sm:w-2/12 w-3/12">
                                    {variant?.name}
                                </label>
                                <ul className="flex-1 flex items-center flex-wrap gap-2">
                                    {variant?.subVariants &&
                                        variant?.subVariants?.length > 0 &&
                                        variant?.subVariants.map(
                                            (subVariant) => {
                                                return (
                                                    <li
                                                        data-position={
                                                            subVariant?.position
                                                        }
                                                        key={subVariant?.id}
                                                        onClick={
                                                            handleChangeVariant
                                                        }
                                                        className={`${
                                                            obVariant?.variants[
                                                                variant.position
                                                            ] ===
                                                                subVariant.position &&
                                                            "border-sky-600 text-sky-600"
                                                        } select-none relative py-1 px-3 cursor-pointer min-w-[80px] text-center border hover:border-sky-500 hover:text-sky-500 rounded-sm`}
                                                    >
                                                        {subVariant?.name}

                                                        {obVariant?.variants[
                                                            variant.position
                                                        ] ===
                                                            subVariant.position && (
                                                            <>
                                                                <span
                                                                    className="absolute w-0 h-0 bottom-0 right-0 border-l-[20px] border-b-[20px] border-b-sky-600 border-t-transparent border-l-transparent"
                                                                ></span>
                                                                <span><IconCheck className="absolute bottom-0 right-0 text-white w-[12px] h-[12px]" /></span>
                                                            </>
                                                        )}
                                                    </li>
                                                );
                                            }
                                        )}
                                </ul>
                            </Fragment>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default OptionVariant;

// ta có object

// test = {
//     "1": "1-2"
// }

// giờ làm sao lấy ra "1-2"
