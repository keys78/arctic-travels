import React from 'react'
import Image from 'next/image';
import Button from './Button';

const bookingDetails: { title: string; icon: string }[] = [
    {
        title: 'location',
        icon: '/images/pin.png'
    },
    {
        title: 'person',
        icon: '/images/user.png'
    },
    {
        title: 'check in',
        icon: '/images/calendar.png'
    },
    {
        title: 'check out',
        icon: '/images/calendar.png'
    },
]


const BookingPanel = () => {
    const renderBookingPanel = bookingDetails && bookingDetails.map((val, i) => (
        <div className='bp-single-item' key={i}>
            <div className='flex items-center space-x-3'>
                <Image src={val.icon} height={'18px'} width={'18px'} />
                <h1 className='bp-title'>{val.title}</h1>
            </div>

            <select name="" id="">
                <option value="hellow W">Hello World</option>
                <option value="hellow W">Hello World</option>
            </select>
        </div>
    ))
    return (
        <div className='bp-wrapper flex items-center justify-between'>
            {renderBookingPanel}
            <Button text='Book Now' icon={'/images/fly_plane.png'} background='primary-blue' color="white" onClick={() => alert('Hello Wworls')}/>
        </div>
    )
}

export default BookingPanel