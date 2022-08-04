import React, { useState, useEffect, useRef } from 'react'
import { CaretDown } from 'phosphor-react'

interface Props {
    options: any [],
    newSelected: string,
    label: string,
    onClick: any 
}

const SelectBox = ({ options, newSelected, label, onClick }: Props) => {
    const [selected, setSelected] = useState(newSelected)
    const [isDropped, setIsDropped] = useState(false)
    const optionsRef = useRef<HTMLDivElement>(null)

    const renderOptions = options !== null && options.map((val, i) =>
        <h5 key={i} onClick={() => onClick(val, setSelected(val.option), setIsDropped(!isDropped))}>{val.option}</h5>
    )

    useEffect(() => { document.body.addEventListener('mousedown', handleClickOutside) })

    const handleClickOutside = (event: any) => {
        optionsRef.current && !optionsRef.current.contains(event.target) && setSelected(newSelected)
    };

    return (
        <div className='select-box-wrapper' ref={optionsRef}>
            <label className='label-tag'>{label}</label>
            <div className='select-box-container' onClick={() => setIsDropped(!isDropped)}>
                <h5>{selected}</h5>
                <CaretDown size={22} color="#C4C4C4" />
            </div>
            {isDropped && <div className='select-dropdown'>
                {renderOptions}
            </div>
            }
        </div>
    )
}


export default SelectBox