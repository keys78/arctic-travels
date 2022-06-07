import React, { FC, useState, useRef, useEffect } from "react";

interface Props { }


let currentOTPIndex: number = 0

const OTPField = ({ }: Props) => {
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

    const verifyOTP = () => {
        console.log(otp)
    }


    return (
        <div className="otp-wrapper">
            <div>
                <h1>Please enter OTP to verify account</h1>
                <h1>OTP has been sent to your email</h1>
            </div>
            <form onSubmit={verifyOTP}>
                <div className="otp-form">
                    {otp.map((_, index) => {
                        return (
                            <div>
                                <React.Fragment key={index}>
                                    <input
                                        ref={index === activeOTPIndex ? inputRef : null}
                                        type="number"
                                        className="otp-input"
                                        onChange={handleOnChange}
                                        value={otp[index]}
                                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                                    />
                                </React.Fragment>
                            </div>
                        );
                    })}
                </div>
                <button type="submit">Verify Otp</button>
            </form>
        </div>
    );
};


export default OTPField;