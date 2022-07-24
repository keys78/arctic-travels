import React, { useState, useRef } from 'react'
import { User, GlobeStand, SignOut } from 'phosphor-react'
import { logout, reset } from '../features/auth/authSlice'
import { resetUser } from '../features/private/privateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useOnClickOutside } from 'usehooks-ts'

interface modalProps {
    setIsPasswordModal: any
    isPasswordModal: boolean
    userData: any
}

const PrivateNav = ({ setIsPasswordModal, isPasswordModal, userData }: modalProps) => {
    const [showDrop, setShowDrop] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const modalRef = useRef(null)
    const userRef = useRef(null)


    const handleClickOutside = () => { setIsModal(prev => !isModal) }
    const handleClickOutsideUser = () => { setShowDrop(prev => !showDrop) }
    useOnClickOutside(modalRef, handleClickOutside)
    useOnClickOutside(userRef, handleClickOutsideUser)


    const handleToggleIs2FA = () => {
        setIsPasswordModal(val => !isPasswordModal)
    }

    const onLogout = () => {
        dispatch(logout())
        dispatch(resetUser())
        dispatch(reset())
        router.push('/signin')
    }

    return (
        <>
            <div className='dash-area'>
                <div className="circle-wrapper">
                    <div className="success circle"></div>
                    <div className="icon">
                        <GlobeStand size={32} color="#fff" weight='fill' />
                    </div>
                </div>
                <div>
                    <span className='cursor-pointer'><User size={30} onClick={() => setShowDrop(!showDrop)} color="#dfd8d8" weight="thin" /></span>
                    {showDrop &&
                        <div ref={userRef} className='panel-dropdown'>
                            <div className='verify-2fa-group'>
                                <h3>Toggle 2FA Mode</h3>
                                <div className='switch-toggle'>
                                    <h6>Off</h6>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            onChange={handleToggleIs2FA}
                                            checked={userData.two_fa_status === "on" && true}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                    <h6>On</h6>
                                </div>
                            </div>
                            <div className='logout' onClick={() => setIsModal(!isModal)}> <SignOut size={20} color="#fff" weight="thin" /> Logout </div>
                        </div>
                    }
                </div>
            </div>

            {isModal &&
                <section className='gen-modal-wrapper'>
                    <div ref={modalRef} className='gen-modal-content'>
                        Are you sure you want to logout ..?
                        <div>
                            <button onClick={() => setIsModal(!isModal)}>Cancel</button>
                            <button onClick={onLogout} className=''> Logout </button>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default PrivateNav