import Image from "next/image";
import { Dispatch, SetStateAction, useRef } from "react";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SwiperButton from "./ButtonGallery";
import { IGetProductDetail } from "@/services/product/product.type";

interface ProductGalleryProps {
    thumbsSwiper: number;
    images: IGetProductDetail["images"];
    productName: string;
    setThumbsSwiper: Dispatch<SetStateAction<number>>;
}

const ProductGallery = ({ images, thumbsSwiper, setThumbsSwiper, productName }: ProductGalleryProps) => {
    const thumbRef = useRef<SwiperRef>(null);

    return (
        <>
            <div className="mb-4 relative">
                <Swiper
                    ref={thumbRef}
                    slidesPerView={1}
                    modules={[Navigation]}
                    onSlideChange={(swiper) => setThumbsSwiper(swiper.activeIndex)}
                    className="mySwiper select-none block"
                >
                    {images?.length > 0 &&
                        images.map((image, index) => {
                            return (
                                <SwiperSlide
                                    key={index}
                                    className="relative w-full h-full aspect-square"
                                >
                                    <Image
                                        unoptimized
                                        fill
                                        alt={`${productName} - ảnh ${index + 1}`}
                                        src={image?.image?.url || ""}
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                        loading={index === 0 ? "eager" : "lazy"}
                                        className="w-full h-full object-cover"
                                    />
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
                <SwiperButton
                    type="prev"
                    isDisabled={images?.length === 1}
                    styleIcon="h-4 w-4 stroke-gray-700"
                    handleClickButton={() => thumbRef.current?.swiper.activeIndex === 0 ? thumbRef.current?.swiper.slideTo(images.length - 1) : thumbRef.current?.swiper.slidePrev()}
                    styleButton="absolute cursor-pointer top-1/2 -translate-y-1/2 -translate-x-1/8 z-1 px-4 py-4 rounded-full bg-black/10 hover:bg-black/20 active:bg-black/30 left-0"
                />
                <SwiperButton
                    type="next"
                    isDisabled={images?.length === 1}
                    styleIcon="h-4 w-4 stroke-gray-700"
                    handleClickButton={() => thumbRef.current?.swiper.activeIndex === images.length - 1 ? thumbRef.current?.swiper.slideTo(0) : thumbRef.current?.swiper.slideNext()}
                    styleButton="absolute cursor-pointer top-1/2 -translate-y-1/2 translate-x-1/8 z-1 px-4 py-4 rounded-full bg-black/10 hover:bg-black/20 active:bg-black/30 right-0"
                />
            </div>
            <div className="grid grid-cols-4 gap-2">
                {images?.length > 0 &&
                    images.map((image, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => thumbRef.current?.swiper.slideTo(index)}
                                className={`border-2 border-gray-200 relative w-full h-full overflow-hidden cursor-pointer aspect-square ${thumbRef.current?.swiper.activeIndex === index ? "border-sky-500" : ""}`}
                            >
                                <Image
                                    unoptimized
                                    fill
                                    alt={`${productName} - ảnh nhỏ ${index + 1}`}
                                    src={image?.image?.url || ""}
                                    sizes="(max-width: 1024px) 25vw, 10vw"
                                    loading="lazy"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default ProductGallery;

