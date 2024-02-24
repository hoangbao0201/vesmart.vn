import Image from "next/image";
import { Dispatch, SetStateAction, useRef } from "react";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { ImageTypes } from "@/types";
import SwiperButton from "@/components/share/SwiperButton";

interface GalleryProps {
    images: ImageTypes[];
    thumbsSwiper: number;
    setThumbsSwiper: Dispatch<SetStateAction<number>>;
}

const Gallery = ({ images, thumbsSwiper, setThumbsSwiper }: GalleryProps) => {


    const thumbRef = useRef<SwiperRef>(null);

    console.log(thumbRef)

    return (
        <>
            <div className="mb-4">
                <Swiper
                    ref={thumbRef}
                    slidesPerView={1}
                    modules={[Navigation]}
                    onSlideChange={(swiper) => setThumbsSwiper(swiper.activeIndex)}
                    className="mySwiper select-none block"
                >
                    <div className="absolute top-0 bottom-0 left-0 w-[30px] z-[1] bg-white"></div>
                    <div className="absolute top-0 bottom-0 right-0 w-[30px] z-[1] bg-white"></div>
                    <SwiperButton
                        type="prev"
                        styleButton="absolute top-1/2 -translate-y-1/2 z-40 px-3 py-8 bg-black/40  rounded-md border left-0"
                        styleIcon="h-4 w-4 fill-white stroke-white"   
                    />
                    <SwiperButton
                        type="next"
                        styleButton="absolute top-1/2 -translate-y-1/2 z-40 px-3 py-8 bg-black/40  rounded-md border right-0"
                        styleIcon="h-4 w-4 fill-white stroke-white"   
                    />
                    {images?.length > 0 &&
                        images.map((image, index) => {
                            return (
                                <SwiperSlide
                                    key={image.publicId}
                                >
                                    <Image
                                        unoptimized
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
            </div>
            <div className="grid grid-cols-4 gap-2">
                {images?.length > 0 &&
                    images.map((image, index) => {
                        return (
                            <div
                                key={image.publicId}
                                className={`border-[2px] rounded-md overflow-hidden cursor-pointer ${thumbRef.current?.swiper.activeIndex === index ? "border-red-700" : ""}`}
                                onClick={() => thumbRef.current?.swiper.slideTo(index)}
                            >
                                <Image
                                    unoptimized
                                    width={500}
                                    height={500}
                                    alt="Image Product"
                                    src={image.url}
                                    className=""
                                />
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Gallery;
