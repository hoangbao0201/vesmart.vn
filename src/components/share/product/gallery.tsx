import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { ImageTypes } from "@/types";


interface GalleryProps {
    images: ImageTypes[]
    thumbsSwiper: number
    setThumbsSwiper: Dispatch<SetStateAction<number>>
}

const Gallery = ({ images, thumbsSwiper, setThumbsSwiper }: GalleryProps) => {

    return (
        <>
            <div className="relative w-full bg-red-500 pt-[100%] overflow-hidden mb-4">
                {
                    images?.length > 0 && (
                        <Image
                            width={500}
                            height={500}
                            alt="Ảnh sản phẩm"
                            src={images[thumbsSwiper]?.url}
                            className="absolute w-full object-contain align-bottom top-0 left-0 bg-white opacity-1"
                        />
                    )
                }
            </div>
            <Swiper
                watchSlidesProgress={true}
                slidesPerView={5}
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper select-none block"
            >
                {
                    images?.length > 0 && images.map((image, index) => {
                        return (
                            <SwiperSlide
                                key={image.publicId}
                                className={`cursor-pointer ${index === thumbsSwiper ? "border-[3px] border-orange-600" : "border-[3px] border-transparent"}`}
                                onClick={() => setThumbsSwiper(index)}
                            >
                                <Image
                                    width={500}
                                    height={500}
                                    alt="Image Product"
                                    src={image.url}
                                    className="border"
                                />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </>
    );
};

export default Gallery;