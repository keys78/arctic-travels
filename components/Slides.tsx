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
    const [activeSlide, setActiveSlide] = useState<any>('')

    const renderSlides = slides && slides.map((val, i) => (

        <div onClick={() => setActiveSlide(i)} key={val.id} className={`slide relative ${activeSlide === i ? 'slide--expanded' : ''}`}>
            <img src={val.image} alt="slide images" />
            <div className='slides-overlay'>
                <div>Back</div>
                <h1>Mountain Resort</h1>
            </div>
            {/* <button className='text-9xl text-red-500 absolute top-0' onClick={() => setActiveSlide(2)}>Close</button> */}
        </div>

    ))



    return (
        <>
            <div className='slider'>{renderSlides}</div>
        </>
    )
}

export default Slides