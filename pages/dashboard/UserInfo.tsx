import React, { useState, useEffect, useRef } from 'react'
import { activate2FA, deActivate2FA } from '../../features/private/privateSlice'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/Input'
import { useOnClickOutside } from 'usehooks-ts'
import { XCircle } from 'phosphor-react'
import { toast } from 'react-toastify'



interface modalProps {
    setIsPasswordModal: any
    isPasswordModal: boolean
    userData: any
}



const UserInfo = ({ setIsPasswordModal, isPasswordModal, userData }: modalProps) => {
    const dispatch = useDispatch();
    const passwordConfirmRef = useRef(null)
    const [greetings, setGreetings] = useState('')
    const initialValues = { password: "", };
    const [value, setValue] = useState(initialValues);
    const onHandleInputChange = (e: any) => {
        const { name, value } = e.target;
        setValue({
            ...value,
            [name]: value,
        })
    };
    const {  isLoading, isError, message } = useSelector((state: any) => state.private)

    useEffect(() => {
        const hour = new Date().getHours();
        const welcomeTypes = ["Good morning", "Good afternoon", "Good evening"];
        let welcomeText = "";
        if (hour < 12) welcomeText = welcomeTypes[0];
        else if (hour < 16) welcomeText = welcomeTypes[1];
        else welcomeText = welcomeTypes[2];
        setGreetings(welcomeText)
    }, []);



    const handleClickOutside = () => { setIsPasswordModal(prev => !isPasswordModal) }
    useOnClickOutside(passwordConfirmRef, handleClickOutside)


    const confirmPasswordFor2FA = (e: any) => {
        e.preventDefault()
        const thunkData = { id: userData._id, password: value.password }
        { userData.two_fa_status === "off" && dispatch(activate2FA(thunkData)) }
        { userData.two_fa_status === "on" && dispatch(deActivate2FA(thunkData)) }
        // toast(message)
        setValue(prev => initialValues)
        setIsPasswordModal(val => !isPasswordModal)

    }

    const renderPasswordConfirmModal = [
        <div className='password-confirm-modal'>
            <form ref={passwordConfirmRef} onSubmit={(e) => confirmPasswordFor2FA(e)}>
                <span className='close-modal-p' onClick={() => setIsPasswordModal(prev => !isPasswordModal)}><XCircle size={26} color="#141f38" weight="thin" /></span>
                <Input name={'password'} value={value.password} label='password' type='password' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
                <button className='btn-class-form new-btn'>Confirm</button>
            </form>
        </div>
    ]

    return (
        <div className='data-spec'>
            <div className="photo-box shimmer">
                <img src="https://source.unsplash.com/random/300x200"  />
            </div>
            <h1>{greetings} {userData.username}</h1>
            <h2>{userData.email}</h2>
            <div className="flex items-center justify-between activity-series">
                <div className="flex items-center space-x-3">
                    <p className="tfa-text">2FA </p>
                    <div className={`status-tfa ${(userData.two_fa_status === "on") ? 'status-active' : 'status-inactive'} `}>
                        <span></span>
                        <h1>{userData.two_fa_status === "on" ? "active" : "inactive"}</h1>
                    </div>
                </div>
                <div className='user-role'>{userData.role}</div>
            </div>
            {isPasswordModal && renderPasswordConfirmModal}
        </div>
    )
}

export default UserInfo