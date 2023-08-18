import { Dispatch, SetStateAction } from "react";
import { IconMinus, IconPlus } from "../../../public/static/icons/IconSvg";


interface InputQuantityProps {
    value: number
    quantity: number
    setValue: Dispatch<SetStateAction<number>>
}

const InputQuantity = ({ value = 0, setValue, quantity } : InputQuantityProps) => {

    const eventOnchangeValue = (v: any) => {
        if(isNaN(v) || v>=quantity) {
            return;
        }

        setValue(Number(v));
    }

    return (
        <div className="flex items-center mb-4">
            <p className="mr-5">Số lượng: </p>
            <button
                onClick={() => setValue(value => value - 1)}
                className={`border h-10 px-4 leading-[10px] text-2xl ${value <= 0 ? "bg-gray-200 opacity-90" : "bg-white"}`}
                disabled={value === 0 ? true : false}
            >
                <IconMinus className="w-3 h-3"/>
            </button>
            <input
                value={value}
                className="h-10 leading-[10px] outline-none border-t border-b text-center w-20 focus:border-black"
                onChange={(e) => eventOnchangeValue(e.target.value)}
            />
            <button
                onClick={() => setValue(value => value + 1)}
                className={`border h-10 px-4 leading-[10px] text-2xl ${value >= quantity ? "bg-gray-200 opacity-90" : "bg-white"}`}
                disabled={value >= quantity ? true : false}
            >
                <IconPlus className="w-3 h-3"/>
            </button>

            <p className="ml-5">{quantity} sản phẩm có sẵn</p>
        </div>
    )
}

export default InputQuantity;