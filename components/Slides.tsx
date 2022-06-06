import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";



const slides: { id: number; title: string, image: string, sub_title: string }[] = [
    {
        id: 0,
        image: '/images/new_slide_1.jpg',
        title: 'Mountain Resort',
        sub_title: 'This is a place you would love to enjoy natural phenoms anywhere in the world'
    },
    {
        id: 1,
        image: '/images/new_slide_2.jpg',
        title: 'Fuji Mountain',
        sub_title: 'This is a place you would love to enjoy natural phenoms anywhere in the world'
    },
    {
        id: 2,
        image: '/images/new_slide_3.jpg',
        title: 'Freezing WinterLake',
        sub_title: 'This is a place you would love to enjoy natural phenoms anywhere in the world'
    }
]



// import required modules
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper";

const Slides = () => {
    const [activeSlide, setActiveSlide] = useState(0)

    const runChange = (value: any) => { setActiveSlide(value.realIndex) }

    return (
        <section className='slides-container'>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                speed={3000}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false
                }}
                onSlideChange={(e) => runChange(e)}
                modules={[Autoplay, Pagination, Navigation, FreeMode]}
                className="mySwiper"
            >
                {(slides.map((slide, i) => (
                    <SwiperSlide key={i}>
                        <div className='slider-container'>
                            <img src={slide.image} />
                            <div className='slides-overlay'>
                                <div className='gen-wrapper'>
                                    <h1 className={`${i === activeSlide ? 'dropIn' : ''}`}>{slide.title}</h1>
                                    <h2>{slide.sub_title}</h2>
                                    <button className='btn-class'>Book Now</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )))}
            </Swiper>


        </section>
    );
}
export default Slides;