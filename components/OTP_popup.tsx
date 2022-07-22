import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { verify2FA } from '../features/auth/authSlice'

interface Props { }


let currentOTPIndex: number = 0

const OTPField = ({ }: Props) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isLocked, setIsLocked] = useState(false)
    const [animate, setAnimate] = useState(false)
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null)

    const { user, isSuccess } = useSelector((state: any) => state.auth)



    const handleOnChange = (
        { target }: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const { value } = target;
        const newOTP: string[] = [...otp]
        newOTP[currentOTPIndex] = value.substring(value.length - 1)

        if (!value) setActiveOTPIndex(currentOTPIndex - 1)
        else setActiveOTPIndex(currentOTPIndex + 1)


        setOtp(newOTP)
        console.log(otp)
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

    useEffect(() => {

    })



    const emptyCount = otp.filter(val => val.length === 0).length;
    function otp_length() {
        if (emptyCount === 0) return 'Verify OTP'
        if (emptyCount === 1) return emptyCount + " " + `Digit left`
        if (emptyCount !== 0) return emptyCount + " " + `Digits left`
    }



    const verifyOTP = (value: any) => {
        value.preventDefault();

        const formatOTP = otp.join('')
        const otpx = { otp: `${formatOTP}` }

        // console.log(otpx)

        const verifyData = { id: user.id, otp: otpx }
        dispatch(verify2FA(verifyData))


        if(isSuccess) {
            router.push('/dashboard')
          }


        // const allEqual = otp.every(v => v === otp[0])
        // if (allEqual === true) return setIsLocked(!isLocked)
        // else setIsLocked(false)
        // setAnimate(true)

        // setTimeout(() => {
        //     setAnimate(false)
        // }, 1000)
    }



    return (
        <div className="otp-wrapper">
            {/* <Link href={'/'}><a>Back</a></Link> */}
            <div className="otp-container">
                <div className={`container-lock ${!isLocked ? 'otp-null' : 'unlocked otp-success'}`}>
                    <span className={`lock ${!isLocked ? (animate && 'lock-shake') : 'unlocked'}`}></span>
                </div>
                <div>
                    <h1 className="text-lg truncate">Please enter OTP to verify your account</h1>
                    <h2 className="text-sm opacity-70 pb-6">OTP has been sent to your email</h2>
                </div>
                <form onSubmit={(e) => verifyOTP(e)}>
                    <div className="otp-form space-x-4">
                        {otp.map((_, index) => {
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
                        <div> Resend OTP </div>
                    </div>
                    <button disabled={emptyCount === 0 ? false : true} className={`otp-button ${emptyCount === 0 ? 'otp-button-ok' : 'otp-button-disabled'}`} type="submit">{otp_length()}</button>
                </form>
            </div>
        </div>
    );
};


export default OTPField;