import Image from "next/image";
import ClientOnly from "@/components/share/ClientOnly";

const dataTopicsAccessories = [
    {
        title: "Encovas",
        image: "/static/images/topics/ecovacs.png",
    },
    {
        title: "Dreame",
        image: "/static/images/topics/dreame.png",
    },
    {
        title: "Roborock",
        image: "/static/images/topics/electrolux.png",
    },
    {
        title: "IRobot",
        image: "/static/images/topics/panasonic.png",
    },
    {
        title: "Xiaomi",
        image: "/static/images/topics/xiaomi.png",
    },
    {
        title: "Irobot",
        image: "/static/images/topics/irobot.png",
    },
    {
        title: "Robotrock",
        image: "/static/images/topics/roborock.png",
    },
    {
        title: "Medion",
        image: "/static/images/topics/medion.png",
    },
];

const NavBrand = () => {
    return (
        <>
            <div className="bg-white mt-4 shadow-sm rounded-md">
                <div className="px-3 py-3">
                    <ul className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                        {dataTopicsAccessories.length > 0 &&
                            dataTopicsAccessories.map((asse, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="border rounded-sm h-10 flex items-center"
                                    >
                                        <Image
                                            unoptimized
                                            width={100}
                                            height={100}
                                            alt={`ảnh ${asse.title}`}
                                            src={asse.image}
                                            className="w-full max-h-7 px-[4px] block object-contain"
                                        />
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavBrand;
