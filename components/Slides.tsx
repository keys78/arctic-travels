import React, { useState } from 'react'

const slides: { id: number; title: string, image: string }[] = [
    {
        id: 0,
        image: '/images/new_slide_1.jpg',
        title: 'Mountain Resort'
    },
    {
        id: 1,
        image: '/images/new_slide_2.jpg',
        title:'Fuji Mountain'
    },
    {
        id: 2,
        image: '/images/new_slide_3.jpg',
        title: 'Freezing WinterLake'
    }
]


const Slides = () => {
    const [activeSlide, setActiveSlide] = useState(0)

    const renderSlides = slides && slides.map((val, i) => (
        <div onClick={() => setActiveSlide(i)} key={val.id} className={`slide ${activeSlide === i ? 'slide--expanded' : ''}`}>
            <img src={val.image} alt="slide images" />
            <button className='text-9xl text-red-500' onClick={() => setActiveSlide(-1)}>Close</button>
        </div>
    ))



    return (
        <>
            <div className='slider'>{renderSlides}</div>
        </>
    )
}

export default Slides