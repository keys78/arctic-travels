import React from 'react'
import Link from 'next/link';


const navLinks: { title: string; href: string }[] = [
    {
        title: 'About Us',
        href: '/'
    },
    {
        title: 'Support',
        href: '/'
    },
    {
        title: 'FAQ',
        href: '/'
    },
    {
        title: 'Sign In',
        href: '/signin'
    },
]

const NavLinks = () => {
    const renderNavLinks = navLinks && navLinks.map((navlink, i) => (
        <h1 key={i}>
            <Link href={navlink.href}><a>{navlink.title}</a></Link>
        </h1>
    ))
  return (
    <div className='navlinks flex items-center justify-between gap-8 text-white'>
        { renderNavLinks }
    </div>
  )
}

export default NavLinks