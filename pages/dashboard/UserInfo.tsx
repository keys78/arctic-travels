import React, { useState, useEffect } from 'react'
import { getUser, activate2FA, deActivate2FA, resetUser } from '../../features/private/privateSlice'
import { useSelector, useDispatch } from 'react-redux'
import Input from '../../components/Input'


interface modalProps {
    setIsPasswordModal: any
    isPasswordModal: boolean
    userData: any
}



const UserInfo = ({ setIsPasswordModal, isPasswordModal, userData }: modalProps) => {
    const dispatch = useDispatch();
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

    // const { user, isLoading, isSuccess, isError, message } = useSelector((state: any) => state.private)
    // const { user: auth } = useSelector((state: any) => state.auth)



    useEffect(() => {
        const hour = new Date().getHours();
        const welcomeTypes = ["Good morning", "Good afternoon", "Good evening"];
        let welcomeText = "";

        if (hour < 12) welcomeText = welcomeTypes[0];
        else if (hour < 16) welcomeText = welcomeTypes[1];
        else welcomeText = welcomeTypes[2];

        setGreetings(welcomeText)

    }, []);

    // useEffect(() => {

    //    dispatch(getUser())

    //     return () => {
    //         dispatch(resetUser())
    //     };

    // }, [ isSuccess, message])

    const confirmPasswordFor2FA = (e: any) => {
        e.preventDefault()
        const thunkData = { id: userData._id, password: value.password }
        { userData.two_fa_status === "off" && dispatch(activate2FA(thunkData)) }
        { userData.two_fa_status === "on" && dispatch(deActivate2FA(thunkData)) }
        setIsPasswordModal(val => !isPasswordModal)

    }

    const renderPasswordConfirmModal = [
        <div className='password-confirm-modal'>
            <form onSubmit={(e) => confirmPasswordFor2FA(e)}>
                <span className='close-modal-p' onClick={() => setIsPasswordModal(prev => !isPasswordModal)}>close</span>
                <Input name={'password'} value={value.password} label='password' type='password' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
                <button className='btn-class-form new-btn'>Confirm</button>
            </form>
        </div>
    ]

    return (
        <div className='data-spec'>
            <h1>{greetings} {userData.username} {userData.role}</h1>
            <p>{userData._id}</p>
            <p>Your 2FA Authentication is {userData.two_fa_status === "on" ? "active" : "inactive"}</p>
            {isPasswordModal && renderPasswordConfirmModal}
        </div>
    )
}

export default UserInfo