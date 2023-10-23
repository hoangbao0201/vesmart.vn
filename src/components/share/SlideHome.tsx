import Image from 'next/image';

import 'swiper/css';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import SwiperButton from '../Features/SwiperButton';
import { Autoplay, Pagination } from 'swiper/modules';


const SlideHome = () => {

    return (
        <div className='bg-white px-4 py-4 mt-3'>
            <Swiper
                loop={true}
                speed={600}
                centeredSlides
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className=''
            >
                <SwiperButton
                    type="prev"
                    styleButton="absolute top-1/2 -translate-y-1/2 z-40 px-3 py-8 bg-slate-900 rounded-sm bg-slate-900/30 left-0"
                    styleIcon="h-4 w-4 fill-white stroke-white"   
                />
                <SwiperButton
                    type="next"
                    styleButton="absolute top-1/2 -translate-y-1/2 z-40 px-3 py-8 bg-slate-900 rounded-sm bg-slate-900/30 right-0"
                    styleIcon="h-4 w-4 fill-white stroke-white"
                />

                <SwiperSlide>
                    <Image
                        width={800}
                        height={500}
                        alt='slide-1'
                        className='mx-auto h-full'
                        src={"/images/slides/slide-1.png"}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        width={800}
                        height={500}
                        alt='slide-1'
                        className='mx-auto h-full'
                        src={"/images/slides/slide-2.png"}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        width={800}
                        height={500}
                        alt='slide-1'
                        className='mx-auto h-full'
                        src={"/images/slides/slide-3.png"}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default SlideHome;