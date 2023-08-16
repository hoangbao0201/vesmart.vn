import { useEffect, useRef, useState } from "react";
import { IconArrowTop } from "../../../public/static/icons/IconSvg";

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
                    className="fixed right-7 bottom-7 z-50 bg-gray-600 rounded-full text-center flex flex-col justify-center items-center p-2"
                >
                    <IconArrowTop className="w-6 h-6 stroke-white" />
                </button>
            ) : null}
        </div>
    );
};

export default ScrollOnTop;