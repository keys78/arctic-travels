import React from 'react'
import Navbar from './Navbar'

const Hero = () => {
  return (
    <div className='hero py-10'>
        <Navbar />
        <div className='hero-text text-white text-center'>
            <h1 className='text-5xl pb-5 font-bold'>Plan the perfect winter trip</h1>
            <p className='text-xl'>Easily plan your ideal ski trip from home with the<br/> help of professionals</p>
        </div>
    </div>
  )
}

export default Hero