import Image from "next/image";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { ImageTypes } from "@/types";
import SwiperButton from "./SwiperButton";

interface GalleryProps {
    images: ImageTypes[];
    thumbsSwiper: number;
    setThumbsSwiper: Dispatch<SetStateAction<number>>;
}

const Gallery = ({ images, thumbsSwiper, setThumbsSwiper }: GalleryProps) => {
    return (
        <>
            <div className="relative w-full bg-red-500 pt-[100%] overflow-hidden mb-4">
                {images?.length > 0 && (
                    <Image
                        width={500}
                        height={500}
                        alt="Ảnh sản phẩm"
                        src={images[thumbsSwiper]?.url}
                        className="absolute w-full object-contain align-bottom top-0 left-0 bg-white opacity-1"
                    />
                )}
            </div>
            <Swiper
                watchSlidesProgress={true}
                slidesPerView={4}
                spaceBetween={10}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper select-none block"
            >
                <div className="absolute top-0 bottom-0 left-0 w-[30px] z-[1] bg-white"></div>
                <div className="absolute top-0 bottom-0 right-0 w-[30px] z-[1] bg-white"></div>
                <SwiperButton
                    type="prev"
                    styleButton="absolute top-0 bottom-0 z-[2] focus:bg-black/40 bg-black/30 border-[2px] px-[4px] rounded-sm left-0"
                    styleIcon="h-4 w-4 fill-white stroke-white"   
                />
                <SwiperButton
                    type="next"
                    styleButton="absolute top-0 bottom-0 z-[2] focus:bg-black/40 bg-black/30 border-[2px] px-[4px] rounded-sm right-0"
                    styleIcon="h-4 w-4 fill-white stroke-white"   
                />
                {images?.length > 0 &&
                    images.map((image, index) => {
                        return (
                            <SwiperSlide
                                key={image.publicId}
                                className={`cursor-pointer rounded-md overflow-hidden ${
                                    index === thumbsSwiper
                                        ? "border-[2px] border-orange-600"
                                        : "border-[2px] border-gray-200"
                                }`}
                                onClick={() => setThumbsSwiper(index)}
                                onPointerOver={() => setThumbsSwiper(index)}
                            >
                                <Image
                                    width={500}
                                    height={500}
                                    alt="Image Product"
                                    src={image.url}
                                    className=""
                                />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </>
    );
};

export default Gallery;
