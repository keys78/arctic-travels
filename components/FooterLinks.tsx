import React from 'react'

interface footerProps {
    header: string,
    links: any
}

const FooterLinks = ({header, links }: footerProps) => {
    const renderLinks = links && links.map((val:any, i:number) => (
        <p key={i}><a href='#'> {val.link} </a></p>
    ))
    return (
        <div>
            <div className='footer-links'>
                <h1>{header}</h1>
                {renderLinks}
            </div>
        </div>
    )
}

export default FooterLinks