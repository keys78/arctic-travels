import React from 'react'

interface CardProps {
    image: string
}


const ResortCard = ({image}:CardProps) => {
  return (
    <div className='card-r'>
        <img src={image} alt="resort" />
        <div className='card-overlay'>
          <h1>Winter landscape Chalet</h1>
          <h2>Cambodia</h2>

          <button className='btn-class'>Book Now</button>
        </div>
    </div>
  )
}

export default ResortCard