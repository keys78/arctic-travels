import React from 'react'
import Image from 'next/image';
import Button from './Button';
import { countryList, personsList } from '../utils/data';

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
    let cities: any = [...countryList];
    const renderList = cities.map(function (item: any, i: number) {
        return <option key={i} value={item}>{item}</option>
    });

    let persons: any[] = [...personsList];
    const renderPersons = persons.map(function (item: any) {
        return <option key={item} value={item}>{item}</option>
    });


    const renderBookingPanel = bookingDetails && bookingDetails.map((val, i) => (
        <div className='bp-single-item' key={i}>
            <div className='flex items-center space-x-3'>
                <Image src={val.icon} height={'18px'} width={'18px'} />
                <h1 className='bp-title'>{val.title}</h1>
            </div>

            {val.title === 'location' &&<select className="ctx-select ctx-arrows"> {renderList} </select>}
            {val.title === 'person' && <select className="ctx-select ctx-arrows" > {renderPersons} </select>}
            {val.title === 'check out' && <input type={'date'} />}
            {val.title === 'check in' && <input type={'date'} />}


        </div>
    ))
    return (
        <div className='gen-wrapper'>
            <div className='bp-wrapper '>
                {renderBookingPanel}
                <Button text='Book Now' icon={'/images/fly_plane.png'} background='primary-blue' color="white" onClick={() => alert('Hello Wworls')} />
            </div >
        </div >
    )
}

export default BookingPanel