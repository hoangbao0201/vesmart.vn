import { useEffect, useRef, useState } from "react";
import IconArrowDown from "../icons/IconArrowDown";

const ScrollOnTop = () => {
    const buttonRef = useRef<any>(null);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.onscroll = () => {
            if (document.documentElement.scrollTop > 150) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        };
    }, []);

    const eventOnTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="">
            {showButton ? (
                <button
                    ref={buttonRef}
                    onClick={eventOnTop}
                    className="fixed cursor-pointer right-5 bottom-7 z-50 bg-white border border-gray-200 shadow-md rounded-full text-center flex flex-col justify-center items-center p-2"
                >
                    <IconArrowDown className="w-6 h-6 rotate-180 stroke-black" />
                </button>
            ) : null}
        </div>
    );
};

export default ScrollOnTop;