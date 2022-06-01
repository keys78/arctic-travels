import React from 'react'

interface CardProps {
    image: string
    city: string
    resort_name: string
}


const ResortCard = ({image, city, resort_name }:CardProps) => {
  return (
    <div className='card-r'>
        <img src={image} alt="resort" />
        <div className='card-overlay'>
          <h1>{resort_name}</h1>
          <h2>{city}</h2>
          <button className='btn-class'>Book Now</button>
        </div>
    </div>
  )
}

export default ResortCard