import React from 'react'
import Image from 'next/image'
import FooterLinks from './FooterLinks'
import { footerLinksDetails } from '../utils/data'



const Footer = () => {
    const renderFooterLinks = footerLinksDetails && footerLinksDetails.map(({ title, links }, i) =>
        <FooterLinks key={i} header={title} links={links} />
    )

    return (
        <footer>
            <section className='gen-wrapper footer-align bg-white'>
                <div className='gridicon'>
                    <div>
                        <Image src="/images/footer-logo.png" height={'40px'} width={'40px'} />
                        <h1 className='font-bold text-lg pb-5'>Arctic Travels</h1>
                        <p className='text-xs opacity-70'>Book your trip in minutes, get full<br /> control for much longer.</p>
                    </div>
                    <div className='links-container'>
                        {renderFooterLinks}
                    </div>
                </div>
                <div className='flex items-center space-x-4 w-full'>
                    <span><Image src="/images/fb.png" height={'40px'} width={'40px'} /></span>
                    <span><Image src="/images/ig.png" height={'40px'} width={'40px'} /></span>
                    <span><Image src="/images/twitter.png" height={'40px'} width={'40px'} /></span>
                </div>

                <div className='legal'>
                    <div className="copyright">© 2022 {new Date().getFullYear()} Arctic Travels - All right reserved.</div>
                    <div>Privacy policy</div>
                    <div>Terms of use</div>
                </div>
            </section>

        </footer>
    )
}

export default Footer