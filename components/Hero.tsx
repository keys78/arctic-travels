import React from 'react'
import Navbar from './Navbar'

const Hero = () => {
  return (
    <div className='hero py-10'>
        <Navbar />
        <div className='hero-text text-white text-center gen-wrapper'>
            <h1 className='sv:text-5xl smd:text-3xl text-xl smd:pb-5 pb-3 font-bold'>Plan the perfect winter trip</h1>
            <p className='sv:text-xl text-xs'>Easily plan your ideal ski trip from home with<br className='br-1'/> the help of professionals</p>
        </div>
    </div>
  )
}

export default Hero