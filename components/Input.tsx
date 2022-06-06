import React from 'react'

const Input = () => {
    return (
        <div className="wrapper">
            <div className="input-data">
                <input type="text" required placeholder='Name'/>
                    <div className="underline"></div>
                    <label>Name</label>
            </div>
        </div>
    )
}

export default Input