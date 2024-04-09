import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="w-full border-t bg-slate-900 text-white">
            <div className="w-full max-w-screen-xl mx-auto py-5 md:flex">
                <div className="lg:w-4/12 md:w-6/12 px-3 mb-4">
                    <p className="font-semibold text-lg mb-4">VESMART</p>
                    <div className="max-w-full mb-4">
                        <iframe
                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsuachuarobothutbuidanang&tabs=timeline&width=340&height=230&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=7580406775327227"
                            // width="340"
                            width="100%"
                            height="200"
                            style={{ border: "none", overflow: "hidden" }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            className="w-full"
                        ></iframe>
                    </div>
                </div>
                <div className="lg:w-8/12 md:w-6/12 lg:flex px-3">
                    <div className="lg:w-1/3 mb-4">
                        <p className="mb-4 font-semibold">Thông tin liên hệ</p>
                        <ul>
                            <li className="mb-2">
                                <Link
                                    href={`https://www.facebook.com/suachuarobothutbuidanang`}
                                    target="_blank"
                                >
                                    <div className="flex items-center hover:underline">
                                        <Image
                                            unoptimized
                                            width={50}
                                            height={50}
                                            alt="image"
                                            src={`/static/images/icons/facebook.png`}
                                            className="w-5 h-5 block"
                                        />
                                        <span className="ml-2 line-clamp-1">
                                            Sửa chữa robot hút bụi Đà Nẵng
                                        </span>
                                    </div>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href={`https://zalo.me/0971183153`}
                                    target="_blank"
                                >
                                    <div className="flex items-center hover:underline">
                                        <Image
                                            unoptimized
                                            width={50}
                                            height={50}
                                            alt="image"
                                            src={`/static/images/icons/zalo.png`}
                                            className="w-5 h-5 block"
                                        />
                                        <span className="ml-2 line-clamp-1">
                                            Chuyên viên sửa chửa VESMART
                                        </span>
                                    </div>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href={`mailto:vesmart98@gmail.com`}
                                    target="_blank"
                                >
                                    <div className="flex items-center hover:underline">
                                        <Image
                                            unoptimized
                                            width={50}
                                            height={50}
                                            alt="image"
                                            src={`/static/images/icons/gmail.png`}
                                            className="w-5 h-5 block"
                                        />
                                        <span className="ml-2 line-clamp-1">
                                            VESMART mail
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:w-1/3 mb-4">
                        <p className="mb-4 font-semibold">Các dịch vụ</p>
                        <ul>
                            <li className="mb-2">
                                <Link href={`/`}>
                                    <span className="line-clamp-1">
                                        Sửa chữa robot hút bụi
                                    </span>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href={`/`}>
                                    <span className="line-clamp-1">
                                        Bán linh kiện điện tử
                                    </span>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href={`/`}>
                                    <span className="line-clamp-1">
                                        Tư vấn, cố vấn sửa chữa
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:w-1/3 mb-4">
                        <p className="mb-4 font-semibold">Khác</p>
                        <ul>
                            <li className="mb-2">
                                <Link href={`/`}>
                                    <span className="line-clamp-1">
                                        Hướng dẫn mua hàng
                                    </span>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href={`/`}>
                                    <span className="line-clamp-1">
                                        Chính sách bảo mật
                                    </span>
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href={`/`}>
                                    <span className="line-clamp-1">
                                        Tuyển dụng
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
