import React, { useEffect } from 'react'
import Image from 'next/image';
import NavLinks from './NavLinks';


const Navbar = () => {
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    const isSticky = () => {
        const header:any = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        scrollTop >= 50 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
        scrollTop >= 600 ? header.classList.add('robo') : header.classList.remove('robo');
    };
    return (
        <header className='header-section flex items-center justify-between gen-wrapper'>
            <div className="logo-wrapper flex items-center space-x-3">
                <div className='el-wrap'>
                <img className='el-logo' src="/images/dotted_circle.png" height={'40px'} width={'40px'} />
                <img className='el-plane' src="/images/angular_plane.png" height={'40px'} width={'40px'} />
                
                </div>
                <span className='font-bold text-white'>Arctic Travels</span>
            </div>
            <NavLinks />
        </header>
    )
}

export default Navbar;