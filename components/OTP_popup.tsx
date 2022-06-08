import React, { FC, useState, useRef, useEffect } from "react";

interface Props { }


let currentOTPIndex: number = 0

const OTPField = ({ }: Props) => {
    const [isLocked, setIsLocked] = useState(false)
    const [animate, setAnimate] = useState(false)
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null)


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



    const verifyOTP = (value: any) => {
        value.preventDefault();

        const allEqual = otp.every(v => v === otp[0])
        if (allEqual === true) return setIsLocked(!isLocked)
        setAnimate(!animate)
        setTimeout(() => {
            setAnimate(!animate)
        },0.001)
    }



    return (
        <div className="otp-wrapper">
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