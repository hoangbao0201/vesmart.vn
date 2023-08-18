import cn from "clsx"
import { IconStar } from "../../../public/static/icons/IconSvg";

interface ListStarProps {
    numb?: number | 5
    size?: number
    className?: string
}

export const ListStar = (props : ListStarProps) => {
    return (
        <div className={`relative w-[120px] flex items-center my-3 mr-4`}>
            <IconStar className={`w-6 h-6 fill-gray-300`} />
            <IconStar className={`w-6 h-6 fill-gray-300`} />
            <IconStar className={`w-6 h-6 fill-gray-300`} />
            <IconStar className={`w-6 h-6 fill-gray-300`} />
            <IconStar className={`w-6 h-6 fill-gray-300`} />

            <div
                style={{
                    width: `${props.numb ? ( ( Math.round(props.numb * 2) /2 )/5 )*100 : 100}%`, 
                }}
                className="absolute top-0 left-0 overflow-hidden flex items-center"
            >
                <IconStar className={`w-6 h-6 flex-shrink-0 fill-yellow-400`} />
                <IconStar className={`w-6 h-6 flex-shrink-0 fill-yellow-400`} />
                <IconStar className={`w-6 h-6 flex-shrink-0 fill-yellow-400`} />
                <IconStar className={`w-6 h-6 flex-shrink-0 fill-yellow-400`} />
                <IconStar className={`w-6 h-6 flex-shrink-0 fill-yellow-400`} />
            </div>
        </div>
    );
};