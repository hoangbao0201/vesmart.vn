import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/configs/site.config";

const Footer = () => {
    return (
        <footer className="w-full border-t bg-slate-900 text-white">
            <div className="w-full max-w-screen-xl mx-auto py-5 md:flex">
                <div className="lg:w-4/12 md:w-6/12 px-3 mb-4">
                    <p className="font-semibold text-lg mb-4">VESMART</p>
                    <div className="max-w-full mb-4">
                        <iframe
                            title="Fanpage Facebook VESMART — Sửa chữa robot hút bụi Đà Nẵng"
                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsuachuarobothutbuidanang&tabs=timeline&width=340&height=230&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=7580406775327227"
                            width="100%"
                            height="200"
                            style={{ border: "none", overflow: "hidden" }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            className="w-full"
                            loading="lazy"
                        />
                    </div>
                </div>
                <div className="lg:w-8/12 md:w-6/12 lg:flex px-3">
                    <div className="mb-4">
                        <p className="mb-4 font-semibold">Thông tin liên hệ</p>
                        <div className="space-y-2">
                            <p>
                                <strong className="text-sm">Địa chỉ:</strong> {SITE_CONFIG.address}
                            </p>
                            <p>
                                <strong className="text-sm">Số điện thoại:</strong> <Link
                                    href={`tel:${SITE_CONFIG.phone}`}
                                    target="_blank"
                                    title={SITE_CONFIG.phone}
                                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                    className="text-blue-600 hover:text-blue-700 break-words whitespace-pre-wrap"
                                >
                                    {SITE_CONFIG.phone}
                                </Link>
                            </p>
                            <p>
                                <strong className="text-sm">Facebook:</strong> <Link href={`${SITE_CONFIG.facebook}`}
                                    target="_blank"
                                    title={SITE_CONFIG.facebook}
                                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                    className="text-blue-600 hover:text-blue-700 break-words whitespace-pre-wrap"
                                >
                                    @suachuarobothutbui
                                </Link>
                            </p>

                            <p>
                                <strong className="text-sm">Website:</strong> <Link
                                    href={`${SITE_CONFIG.url}`}
                                    target="_blank"
                                    title={SITE_CONFIG.url}
                                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                    className="text-blue-600 hover:text-blue-700 break-words whitespace-pre-wrap"
                                >
                                    {SITE_CONFIG.url.replace('https://', '@')}
                                </Link>
                            </p>
                            <p>
                                <strong className="text-sm">Tiktok:</strong> <Link
                                    href={`${SITE_CONFIG.tiktok}`}
                                    target="_blank"
                                    title={SITE_CONFIG.tiktok}
                                    style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                                    className="text-blue-600 hover:text-blue-700 break-words whitespace-pre-wrap"
                                >
                                    {SITE_CONFIG.tiktok.replace('https://tiktok.com/', '')}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
