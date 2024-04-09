import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
import Image from "next/image";

const BannerMain = () => {
    return (
        <div className="flex xl:flex-row flex-col items-center gap-2 bg-white p-3 rounded-lg">
            <div className="xl:h-[410px] xl:w-8/12">
                <Image
                    // unoptimized
                    width={500}
                    height={500}
                    src={`/static/images/banners/banner-1.png`}
                    alt="Ảnh banner sửa chữa robot hút bụi vesmart"
                    className="w-full xl:h-[410px] object-cover rounded-lg"
                />
            </div>
            <div className="xl:h-[410px] xl:w-4/12 w-full">
                <div className="flex flex-col gap-2">

                    <div className="flex xl:flex-col lg:flex-row flex-col gap-2">
                        <div className="bg-blue-400 rounded-lg text-white pl-4 pr-2 py-3 xl:h-[80px] w-full">
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
    
                        <div className="bg-blue-400 rounded-lg text-white pl-4 pr-2 py-3 xl:h-[80px] w-full">
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
    
                        <div className="bg-blue-400 rounded-lg text-white pl-4 pr-2 py-3 xl:h-[80px] w-full">
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
                        width={200}
                        height={200}
                        src={`/static/images/banners/banner-2.png`}
                        alt="Ảnh banner sửa chữa robot hút bụi vesmart"
                        className="w-full h-[146px] object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default BannerMain;
