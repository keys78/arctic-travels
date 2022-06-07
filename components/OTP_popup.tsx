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

    // useEffect(() => {
    //     window.addEventListener("paste", (e) => {
    //         setOtp(e.clipboardData.getData("text"));
    //       });
    // })


    return (
        <div className="h-screen flex justify-center items-center space-x-2">
            {otp.map((_, index) => {
                return (
                    <React.Fragment key={index}>
                        <input
                            ref={index === activeOTPIndex ? inputRef : null}

                            type="number"
                            className="otp-input"
                            onChange={handleOnChange}
                            value={otp[index]}
                            onKeyDown={(e) => handleOnKeyDown(e, index)}
                            // onPaste={(e) => handleOnPaste(e, index)}
                        />
                        {/* {index === otp.length - 1 ? null : (
                            <span className="w-2 py-0.5 bg-gray-400" />
                        )} */}
                    </React.Fragment>
                );
            })}
        </div>
    );
};


export default OTPField;