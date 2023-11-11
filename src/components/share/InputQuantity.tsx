import { Dispatch, SetStateAction, useEffect } from "react";
import { IconMinus, IconPlus } from "../../../public/static/icons/IconSvg";


interface InputQuantityProps {
    value: number
    quantity: number
    setValue: Dispatch<SetStateAction<number>>
    setErrorBuy?: Dispatch<SetStateAction<string | null>>
}

const InputQuantity = ({ value = 0, setValue, quantity, setErrorBuy } : InputQuantityProps) => {

    const eventOnchangeValue = (v: any) => {
        if(isNaN(v) || v>quantity) {
            return;
        }

        setValue(Number(v));
    }

    useEffect(() => {
        if(value > quantity) {
            setValue(Number(quantity));
        }
    }, [quantity]);

    return (
        <div className="flex flex-wrap whitespace-nowrap mb-4">
            <p className="sm:w-2/12 w-3/12">Số lượng: </p>
            <div className="sm:flex items-center flex-1 flex-wrap">
                <button
                    onClick={() => eventOnchangeValue(value - 1)}
                    className={`border h-10 px-4 leading-[10px] text-2xl ${value <= 0 ? "bg-gray-200 opacity-90" : "bg-white"}`}
                    disabled={value === 0 ? true : false}
                >
                    <IconMinus className="w-3 h-3"/>
                </button>
                <input
                    value={value}
                    onFocus={() => {
                        setErrorBuy && setErrorBuy(null)
                    }}
                    className="h-10 leading-[10px] outline-none border-t border-b text-center w-20 focus:border-black bg-white"
                    onChange={(e) => eventOnchangeValue(e.target.value)}
                />
                <button
                    onClick={() => eventOnchangeValue(value + 1)}
                    className={`border h-10 px-4 leading-[10px] text-2xl mr-3 ${value >= quantity ? "bg-gray-200 opacity-90" : "bg-white"}`}
                    disabled={value >= quantity ? true : false}
                >
                    <IconPlus className="w-3 h-3"/>
                </button>
    
                <p className="">{quantity} sản phẩm có sẵn</p>
            </div>
        </div>
    )
}

export default InputQuantity;