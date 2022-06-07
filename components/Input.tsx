import React from 'react'

interface inputProps {
    type: string
    label: string
    required?: boolean
    name: string
    onHandleInputChange: any
    value: any
}

const Input = ({type, label, required, name, onHandleInputChange, value}: inputProps) => {
    return (
        <div className="wrapper">
            <div className="input-data">
                <input type={type} required={required} value={value} onChange={onHandleInputChange} name={name}/>
                <div className="underline"></div>
                <label>{label}</label>
            </div>
        </div>
    )
}

export default Input