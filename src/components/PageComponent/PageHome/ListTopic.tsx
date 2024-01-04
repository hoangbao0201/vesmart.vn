import Image from "next/image";
import ClientOnly from "@/components/share/ClientOnly";
import Link from "next/link";

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

const ListTopic = () => {
    return (
        <>
            <div className="bg-white mt-4 shadow-sm rounded-sm">
                <div className="px-3 py-3">
                    <ClientOnly>
                        <ul className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                            {dataTopicsAccessories.length > 0 &&
                                dataTopicsAccessories.map((asse, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className="border rounded-sm h-10 flex items-center"
                                        >
                                            {/* {asse.title} */}
                                            <Image
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
                    </ClientOnly>
                </div>
            </div>
            <div className="bg-white mt-4 shadow-sm rounded-sm">
                <nav className="px-3 py-3">
                    {/* <h3 className="font-semibold text-base mb-2">
                        Tư vấn sửa chữa vào báo giá
                    </h3> */}
                    {/* <ul>
                        <li>Sửa chữa robot hút bụi</li>
                        <li>Sửa chữa máy lọc không khí</li>
                        <li>Sửa chữa máy sưởi</li>
                        <li>Sửa chữa lò vi sóng</li>
                    </ul> */}
                    {/* <span className="dot">
                        <span className="ping"></span>
                    </span> */}
                    <table className="w-full">
                        <thead className="">
                            <tr className="text-center font-semibold text-lg">
                                <th className="">
                                    Phụ kiện robot
                                </th>
                                <th className="text-center">
                                    <span className="">Tư vấn sửa chữa và báo giá <span className="dot"><span className="ping"></span></span>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            <tr>
                                <td>Ecovacs</td>
                                <td>
                                    Sửa chữa robot hút bụi
                                </td>
                            </tr>
                            <tr>
                                <td>Dreame</td>
                                <td>Sửa chữa máy lọc không khí</td>
                            </tr>
                            <tr>
                                <td>Roborock</td>
                                <td><span className="">Sửa chữa máy sưởi</span></td>
                            </tr>
                            <tr>
                                <td>IRobot</td>
                                <td><span className="">Sửa chữa lò vi sóng</span></td>
                            </tr>
                        </tbody>
                    </table>
                </nav>
            </div>
        </>
    );
};

export default ListTopic;
