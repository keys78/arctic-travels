import React from 'react'
import ResortCard from './ResortCard'

const resortDetails: { title: string; image: string, location: string }[] = [
    {
        title: 'Winter landscape Chalet',
        location: 'Cambodia',
        image: "/images/resort_1.png"
    },
    {
        title: 'Frozen Bolov Hut',
        location: 'Ice land',
        image: "/images/resort_2.png"
    },
    {
        title: 'Crystal Freezing Waters',
        location: 'Sychelles',
        image: "/images/resort_3.png"
    },
    {
        title: 'Ice Age Roads',
        location: 'Ausria',
        image: "/images/resort_4.png"
    },

]

const Resorts = () => {
    const renderResorts = resortDetails && resortDetails.map((val, i) => (
        <div key={i}>
            <ResortCard city={val.location} resort_name={val.title} image={val.image} />
        </div>
    ))
    return (
        <div className='gen-wrapper'>
            <h1 className='resort-header'>The best resorts <br /> to chill<br /> and relax</h1>
            <div className='resort-grid'>
                {renderResorts}
            </div>
        </div>

    )
}

export default Resorts
