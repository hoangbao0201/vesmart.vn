'use client';

import Link from "next/link";
import Image from "next/image";

import BrandCarousel from "./BrandCarousel";
import classNames from "@/utils/classNames";
import { SITE_CONFIG } from "@/configs/site.config";

interface HomeBannerProps {
    className?: string;
}

interface BannerSlideItemProps {
    imageUrls: string[];
    imageAlt: string;
    title: string;
    description: string;
    className?: string;
    /** Ưu tiên tải ảnh đầu (LCP trang chủ) */
    priorityFirstImage?: boolean;
}

export default function HomeBanner({ }: HomeBannerProps) {

    return (
        <>
            <div className={`pt-4 mx-auto container`}>
                <div className="flex lg:flex-row flex-col items-center justify-center gap-2">
                    <BannerSlideItem
                        imageUrls={[
                            "/static/images/banners/banner-1.jpg"
                        ]}
                        title="VESMART"
                        imageAlt="Robot hút bụi và dịch vụ sửa chữa VESMART"
                        className="lg:w-1/3 w-full relative md:rounded-lg"
                        description="Chuyên sửa chữa robot hút bụi, máy hút bụi cầm tay, máy lọc không khí và các thiết bị smart home. Đội ngũ kỹ thuật viên giàu kinh nghiệm, cam kết chất lượng dịch vụ tốt nhất với giá cả hợp lý."
                        priorityFirstImage
                    />

                    <BannerSlideItem
                        imageUrls={[
                            "/static/images/banners/banner-7.jpg",
                            "/static/images/banners/banner-2.jpg",
                            "/static/images/banners/banner-8.jpg",
                            "/static/images/banners/banner-9.jpg",
                        ]}
                        imageAlt="Dịch vụ sửa chữa robot hút bụi tại VESMART"
                        title="Sửa chữa nhanh chóng"
                        className="hidden md:block lg:w-2/3 w-full relative md:rounded-lg"
                        description="Trải nghiệm dịch vụ chuyên nghiệp và hiệu quả. Chúng tôi cam kết sửa chữa nhanh chóng trong 24-48h, bảo hành dài hạn, hỗ trợ tư vấn miễn phí và không thu phí nếu không sửa được. Liên hệ ngay để được phục vụ tốt nhất!"
                    />
                </div>
            </div>

            <div className="pt-4">
                <BrandCarousel />
            </div>

            <div className="pt-4">
                <div className="bg-white flex flex-col justify-center items-center py-6 md:py-12 text-center">
                    <h2 className="uppercase font-extrabold mb-4 leading-tight drop-shadow-2xl animate-slide-up">
                        <span className="block mb-5 text-red-700 lg:text-2xl text-lg">VESMART có thể sửa chữa</span>
                        <span className="block lg:text-xl text-black">
                            những thiết bị nào?
                        </span>
                    </h2>

                    {/* Product Cards Grid */}
                    <div className="w-full mb-6">
                        <div className="select-none grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
                            {[
                                {
                                    title: "Robot hút bụi",
                                    image: "/static/images/banners/banner-12.png",
                                },
                                {
                                    title: "Máy lau nhà cầm tay",
                                    image: "/static/images/banners/banner-11.png",
                                },
                                {
                                    title: "Máy hút bụi cầm tay",
                                    image: "/static/images/banners/banner-13.png",
                                },
                                {
                                    title: "Máy lọc không khí",
                                    image: "/static/images/banners/banner-14.png",
                                },
                            ].map((item, index) => (
                                <div
                                    key={item.image}
                                    className="group/card relative bg-gray-100 rounded-lg transition-all duration-300 overflow-hidden animate-slide-up-delay"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="relative overflow-hidden aspect-square rounded-t-lg">
                                        <Image
                                            alt={`${item.title} - hình minh họa dịch vụ VESMART`}
                                            width={1000}
                                            height={1000}
                                            src={item.image}
                                            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                            quality={80}
                                            className="p-3 w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="p-2 text-center font-bold text-gray-800 leading-tight line-clamp-2 text-sm md:text-base">
                                        {item.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full max-w-7xl px-4 py-7 relative bg-slate-900 lg:rounded-lg">
                        <div className="relative text-center space-y-2">
                            <h2 className="lg:text-2xl text-xl font-bold text-white uppercase tracking-wide">Dịch vụ cao cấp</h2>

                            <div className="mb-4 flex items-center justify-center gap-1">
                                {
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <svg key={index} className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))
                                }
                            </div>

                            <p className="text-lg uppercase font-bold text-white leading-relaxed">
                                Ngoài ra, <span className="text-sky-500">Vesmart</span> còn chuyên sửa chữa các thiết bị SMART HOME giá trị cao
                            </p>
                            <p className="text-lg uppercase text-white/95 font-bold">
                                phục vụ quý khách hàng yêu cầu sự <span className="text-sky-500 underline underline-offset-2 hover:text-sky-600 transition-all duration-300">hoàn mỹ</span> trong sửa chữa
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const BannerSlideItem = ({
    imageUrls,
    imageAlt,
    title,
    description,
    className = "w-full",
    priorityFirstImage = false,
}: BannerSlideItemProps) => {

    return (
        <div
            className={`${className} md:h-[490px] bg-white relative group overflow-hidden`}
        >
            {
                imageUrls && (
                    <div
                        className="p-1 md:h-[370px] md:group-hover:h-[325px] transition-all duration-200 object-cover transition-height relative"
                    >
                        <div
                            className="w-full h-full relative rounded-lg lg:px-6 px-3 py-4 overflow-hidden bg-gradient-to-b from-transparent to-[#085eba2d]"
                        >
                            <div className="z-1 gap-2 flex items-center justify-center md:group-hover:translate-y-[-8px] transition-all duration-200">
                                {
                                    imageUrls.map((imgUrl, index) => (
                                        <div
                                            key={imgUrl}
                                            className={classNames('relative flex-1',
                                                index % 2 === 0 && imageUrls.length > 1 ? "mb-4" : "",
                                                index % 2 === 1 && imageUrls.length > 1 ? "mt-4" : "",
                                                index >= 1 ? "hidden lg:block" : "",
                                            )}
                                        >
                                            <Image
                                                unoptimized
                                                alt={`${imageAlt} - ảnh ${index + 1}`}
                                                width={1000}
                                                height={1000}
                                                src={imgUrl}
                                                priority={priorityFirstImage && index === 0}
                                                loading={priorityFirstImage && index === 0 ? "eager" : "lazy"}
                                                className="w-full h-[320px] object-cover rounded-lg shadow-xl shadow-gray-300"
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                )
            }
            <div className="bg-white w-full pt-4 md:pb-0 pb-5 px-6 relative">
                <h2 className="text-xl font-extrabold mb-3 line-clamp-2 leading-tight">
                    {title}
                </h2>
                <p className="mb-2 text-black text-base line-clamp-2 leading-relaxed">
                    {description}
                </p>

                <Link
                    target="_blank"
                    href={`https://zalo.me/${SITE_CONFIG.phone}`}
                    className="md:group-hover:opacity-100 md:opacity-0 hover:bg-blue-900 transition-all duration-200 font-semibold text-center bg-blue-800 text-white px-4 py-2 rounded-md w-full flex items-center justify-center justify-self-center"
                >
                    Liên hệ qua Zalo
                </Link>
            </div>
        </div>
    );
};
