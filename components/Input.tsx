// import React from 'react'

// const Input = () => {
//     return (
//         <div className="wrapper">
//             <div className="input-data">
//                 <input type="text" required />
//                     <div className="underline"></div>
//                     <label>Name</label>
//             </div>
//         </div>
//     )
// }

// export default Input

import React from 'react'

interface inputProps {
    type: string
    label: string
    required?: boolean
}

const Input = ({type, label, required}: inputProps) => {
    return (
        <div className="wrapper">
            <div className="input-data">
                <input type={type} required={required} />
                <div className="underline"></div>
                <label>{label}</label>
            </div>
        </div>
    )
}

export default Input