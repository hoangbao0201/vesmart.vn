import Image from "next/image";
import dynamic from "next/dynamic";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const SwiperButton = dynamic(() => import("@/components/share/SwiperButton"), { ssr: false })

const BannerMain = () => {
    return (
        <div className="relative block">
            <div className="grid grid-cols-12 gap-2 bg-white p-3 rounded-lg">
                <div className="xl:h-[410px] xl:col-span-8 col-span-full block relative">
                    <Swiper
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Autoplay]}
                        className="rounded-lg"
                    >
                        {/* <SwiperButton
                            type="prev"
                            styleButton="absolute top-1/2 -translate-y-1/2 z-40 px-3 py-3 bg-white rounded-full border left-0"
                            styleIcon="h-4 w-4"   
                        />
                        <SwiperButton
                            type="next"
                            styleButton="absolute top-1/2 -translate-y-1/2 z-40 px-3 py-3 bg-white rounded-full border right-0"
                            styleIcon="h-4 w-4"   
                        /> */}
                        <SwiperSlide className="lg:w-full xl:h-[410px] xl:object-cover">
                            <Image
                                // unoptimized
                                width={1200}
                                height={700}
                                src={`/static/images/banners/banner-1.png`}
                                alt="Ảnh banner sửa chữa robot hút bụi vesmart"
                                className="w-full"
                                // className="w-full xl:h-[410px] xl:object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide className="lg:w-full xl:h-[410px] xl:object-cover">
                            <Image
                                // unoptimized
                                width={1200}
                                height={700}
                                src={`/static/images/banners/banner-2.png`}
                                alt="Ảnh banner sửa chữa robot hút bụi vesmart"
                                className="w-full"
                                // className="w-full xl:h-[410px] object-cover"
                            />
                        </SwiperSlide>
                    </Swiper>
                    
                </div>
                <div className="xl:h-[410px] xl:col-span-4 col-span-full">
                    <div className="flex flex-col gap-2">
    
                        <div className="flex xl:flex-col lg:flex-row flex-col gap-2">
                            <div className="bg-blue-400 rounded-lg text-white pl-4 pr-2 py-3 xl:h-[80px]">
                                <div className="flex items-center">
                                    <Image
                                        width={50}
                                        height={50}
                                        className="w-[35px]"
                                        src="/static/images/icons/people.svg"
                                        alt="Kỹ thuật viên xuất sắc"
                                    />
                                    <div className="ml-4">
                                        <span className="font-semibold text-2xl">10+</span>
                                        <p>Kỹ thuật viên xuất sắc</p>
                                    </div>
                                </div>
                            </div>
        
                            <div className="bg-blue-400 rounded-lg text-white pl-4 pr-2 py-3 xl:h-[80px]">
                                <div className="flex items-center">
                                    <Image
                                        width={50}
                                        height={50}
                                        className="w-[35px]"
                                        src="/static/images/icons/feedback.svg"
                                        alt="Đánh giá chất lượng tốt"
                                    />
                                    <div className="ml-4">
                                        <span className="font-semibold text-2xl">1500+</span>
                                        <p>Đánh giá chất lượng tốt</p>
                                    </div>
                                </div>
                            </div>
        
                            <div className="bg-blue-400 rounded-lg text-white pl-4 pr-2 py-3 xl:h-[80px]">
                                <div className="flex items-center">
                                    <Image
                                        width={50}
                                        height={50}
                                        className="w-[35px]"
                                        src="/static/images/icons/countProject.svg"
                                        alt="Dự án hoàn thành"
                                    />
                                    <div className="ml-4">
                                        <span className="font-semibold text-2xl">500+</span>
                                        <p>Dự án hoàn thành</p>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <Image
                            // unoptimized
                            width={400}
                            height={400}
                            src={`/static/images/banners/banner-native.png`}
                            alt="Ảnh banner sửa chữa robot hút bụi vesmart"
                            className="w-full h-[146px] object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerMain;
