import React from 'react'
import Link from 'next/link';
import { navLinks } from '../utils/data';


const NavLinks = () => {
    const renderNavLinks = navLinks && navLinks.map((navlink, i) => (
        <h1 key={i}>
            <Link href={navlink.href}><a>{navlink.title}</a></Link>
        </h1>
    ))
  return (
    <div className='navlinks hidden sv:flex items-center justify-between gap-8 text-white'>
        { renderNavLinks }
    </div>
  )
}

export default NavLinks