import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { verify2FA, resendOTP, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { XCircle } from 'phosphor-react'
import { useAppDispatch } from '../app/hooks'


interface Props {
    isOtpModal: any,
    setIsOtpModal: any
    handleStart: any,
    secondsRemaining: number,
    setSecondsRemaining: any,
    isError: boolean,
    isSuccess: boolean,
}


let currentOTPIndex: number = 0

const OTPField = ({ isOtpModal, setIsOtpModal, handleStart, secondsRemaining, setSecondsRemaining }: Props) => {
    const router = useRouter()
    // const dispatch = useDispatch()
    const dispatch = useAppDispatch()
    const [isLocked, setIsLocked] = useState(false)
    const [animate, setAnimate] = useState(false)
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null)

    const { user, isError } = useSelector((state: any) => state.auth)
    const [expirationTime, setExpirationTime] = useState(false)


    const handleOnChange = (
        { target }: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const { value } = target;
        const newOTP: string[] = [...otp]
        newOTP[currentOTPIndex] = value.substring(value.length - 1)

        if (!value) setActiveOTPIndex(currentOTPIndex - 1)
        else setActiveOTPIndex(currentOTPIndex + 1)

        setOtp(newOTP)
    }

    const handleOnKeyDown = (
        { key }: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        currentOTPIndex = index
        if (key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1)
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOTPIndex])

    const emptyCount = otp.filter(val => val.length === 0).length;
    function otp_length() {
        if (emptyCount === 0) return 'Verify OTP'
        if (emptyCount === 1) return emptyCount + " " + `Digit left`
        if (emptyCount !== 0) return emptyCount + " " + `Digits left`
    }

    const resendOTPHandler = (value: any) => {
        value.preventDefault();

        const userData = {}
        const resendData = { id: user.id, userData: userData }
        dispatch(resendOTP(resendData))

        if (!isError) {
            toast.success(user.message, { autoClose: 2000 })
        }

        setSecondsRemaining(10)
        setExpirationTime(false)
        handleStart()

    }


    const verifyOTP = (value: any) => {
        value.preventDefault();

        const formatOTP = otp.join('')
        const otpx = { otp: `${formatOTP}` }
        const verifyData = { id: user.id, otp: otpx }

        dispatch(verify2FA (verifyData))


        setIsLocked(isLocked)
        setAnimate(true)

        setTimeout(() => {
            setAnimate(false)
        }, 500)


        // fun animation
        // const allEqual = otp.every(v => v === otp[0])
        // if (allEqual === true) return setIsLocked(!isLocked)
        // else setIsLocked(false)
        // setAnimate(true)
        // setTimeout(() => {
        //     setAnimate(false)
        // }, 1000)
    }

    const secondsToDisplay = secondsRemaining % 60

    useEffect(() => {
        handleStart()

        secondsRemaining === 0 && setExpirationTime(!expirationTime)

    }, [secondsRemaining])

    const twoDigits = (num: number) => String(num).padStart(2, '0')





    return (
        <div className="otp-wrapper">

            <div className="otp-container relative">
                <button className="absolute top-2 right-2" onClick={() => setIsOtpModal(!isOtpModal)}><XCircle size={20} color="#e71818" weight="thin" /></button>
                <div className={`container-lock ${!isLocked ? 'otp-null' : 'unlocked otp-success'}`}>
                    <span className={`lock ${!isLocked ? (animate && 'lock-shake') : 'unlocked'}`}></span>
                </div>
                <div>
                    <h1 className="text-lg sm:text-sm truncate">Please enter OTP to verify your account</h1>
                    <h2 className="text-sm sm:text-xs opacity-70 pb-6">OTP has been sent to your email</h2>
                </div>
                <form onSubmit={(e) => verifyOTP(e)}>
                    <div className="otp-form space-x-4">
                        {otp.map((_:any, index:any) => {
                            return (
                                <div key={index}>
                                    <input
                                        ref={index === activeOTPIndex ? inputRef : null}
                                        type="number"
                                        className="otp-input"
                                        onChange={handleOnChange}
                                        value={otp[index]}
                                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="resend-otp">
                        <p>Didn't recieve OTP?</p>
                        <button
                            className={`${expirationTime ? "resend-cta" : "resend-disabled"}`}
                            disabled={!expirationTime} onClick={(e) => resendOTPHandler(e)}> Resend OTP </button>
                        <div className="countdown-wrapper">in <span className={`${expirationTime ? "text-green-500" : "text-red-500"}`}>{twoDigits(secondsToDisplay)}</span> </div>
                    </div>
                    <button disabled={emptyCount === 0 ? false : true} className={`otp-button ${emptyCount === 0 ? 'otp-button-ok' : 'otp-button-disabled'}`} type="submit">{otp_length()}</button>
                </form>
            </div>
        </div>
    );
};






export default OTPField;