import React from 'react'

interface CardProps {
    image: string
}


const ResortCard = ({image}:CardProps) => {
  return (
    <div className='card-r'>
        <img src={image} alt="resort" />
    </div>
  )
}

export default ResortCard