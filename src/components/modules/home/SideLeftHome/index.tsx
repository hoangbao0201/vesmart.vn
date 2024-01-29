import Link from "next/link"
import { ReactNode } from "react"
import IconRepair from "../../icons/IconRepair"
import IconEcovacs from "../../icons/IconEcovacs"
import Image from "next/image"

interface DataChildrenSideLeftProps {
    title: string
    url: string
    icon: null | ReactNode
    blank?: boolean
}
type DataSideLeftProps = {
    title: string,
    children: DataChildrenSideLeftProps[]
}

const dataSideLeft: DataSideLeftProps[] = [
    {
        title: "Danh mục sản phẩm",
        children: [
            { title: "Link kiện robot hút bụi", url: "/", icon: "repair.png", blank: false },
            { title: "Phụ kiện ECOVACS", url: "/", icon: "ecovacs-home.png", blank: false },
            { title: "Động cơ và điều khiển", url: "/", icon: "engine-motor.png", blank: false },
            { title: "Pin và phụ kiện", url: "/", icon: "battery.png", blank: false },
        ]
    },
    {
        title: "Kết nối với shop",
        children: [
            { title: "Sửa chữa robot hút bụi VESMART", url: "https://www.facebook.com/suachuarobothutbuidanang", icon: "facebook.png", blank: true },
            { title: "Chuyên gia sửa chữa VESMART", url: "https://zalo.me/0971183153", icon: "zalo.png", blank: true },
        ]
    },
    {
        title: "Khác",
        children: [
            { title: "Hướng dẫn mua hàng", url: "/", icon: null },
            { title: "Tuyển dụng", url: "/", icon: null },
        ]
    }
]

const SideLeftHome = () => {

    return (
        <aside className="py-4 sticky top-[60px]">
            {
                dataSideLeft.map((item, index) => {
                    return (
                        <div key={index} className="mb-3">
                            <h4 className="font-medium uppercase mb-2 text-[17px]">{item?.title}</h4>
                            <ul className="ml-2">
                                {
                                    item.children.map((itemChild, indexChild) => {
                                        return (
                                            <li key={indexChild} className="mb-1 group">
                                                <Link href={`${itemChild?.url}`} target={`${itemChild?.blank ? "_blank" : "_self"}`}>
                                                    <div className="flex items-center p-1 text-[15px] hover:text-blue-600">
                                                        {
                                                            itemChild?.icon && (
                                                                <Image
                                                                    width={30}
                                                                    height={30}
                                                                    alt={`Icon ${itemChild?.title}`}
                                                                    className="w-5 h-5 mr-2"
                                                                    src={`/static/images/icons/${itemChild?.icon}`}
                                                                />
                                                            )
                                                        }
                                                        <span className="group-hover:underline">{itemChild?.title}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </aside>
    )
}

export default SideLeftHome;