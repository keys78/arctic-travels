import React from 'react'
import Image from 'next/image'

interface ButtonProps {
    text: string
    icon: any
    background: string
    color: string
    onClick: any
}

const Button = ({ icon, text, background, color, onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} className={`flex items-center space-x-5 py-5 px-12  rounded-lg ${background} ${color}`}>
            {text} &nbsp; &nbsp;
            <Image src={icon} height={'20px'} width={'20px'} />
        </button>
    )
}

export default Button