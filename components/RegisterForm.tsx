import React, { useContext, useEffect, useState } from 'react'
import Message from './icons/Message';
import User from './icons/User';

import Lock from '../components/icons/Lock'
import RevealEye from '../components/icons/RevealEye'
import ShowEye from '../components/icons/ShowEye'
import { AuthContext } from '../features/authentication/contex/AuthContext';
import { AuthContextValue } from '../features/models/Interface';
import { link } from 'fs';

function RegisterForm() {
    const {
        userDetails,
        validPassword,
        handleInputChange,
        handleValidPassword
    } = useContext<AuthContextValue>(AuthContext);
    const [passwordConfirmed, setPasswordConfirmed] = useState<boolean>(true);
    const [revealPassword, setRevealPassword] = useState<boolean>(false);
    const [revealConfirmPassword, setRevealConfirmPassword] = useState<boolean>(false);

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value == userDetails.password ? setPasswordConfirmed(true) : setPasswordConfirmed(false);
    }

    useEffect(() => {
        handleValidPassword()
    }, [userDetails.password])

    return (
        <div className='register-form'>
            <div className="email">
                <div className="label pb-[11px]">
                    <label htmlFor="email" className="text-placeholder text-[13px] font-md leading-5 md:border-black">
                        Email
                    </label>
                </div>
                <div className="input-field flex items-center gap-[7.42px] pb-[7px] border-b-2 border-black">
                    <span className='invert'>
                        <Message />
                    </span>
                    <input required type="email" name="email" onChange={handleInputChange} className="email-input bg-transparent outline-none w-full text-black" placeholder="Enter your email address" />
                </div>
            </div>
            <div className="username pt-[42px]">
                <div className="label pb-[11px]">
                    <label htmlFor="username" className="text-placeholder text-[13px] font-md leading-5">
                        Username
                    </label>
                </div>
                <div className="input-field flex items-center gap-[7.42px] pb-[7px] border-b-2 border-black">
                    <span className='invert'>
                        <User />
                    </span>
                    <input required type="text" name="username" onChange={handleInputChange} className="email-input bg-transparent w-full outline-none text-black" placeholder="Enter your User name" />
                </div>
            </div>
            <div className="password mt-[49px]">
                <div className="label pb-[11px]">
                    <label htmlFor="password" className="text-placeholder text-[13px] font-md leading-5">
                        Password
                    </label>
                </div>
                <div className={`input-field flex items-center gap-[7.42px] pb-[7px] border-b-2 border-black`}>
                    <span className='invert'>
                        <Lock />
                    </span>
                    <input type={revealPassword ? "text" : "password"} name="password" onChange={handleInputChange} className="email-input bg-transparent w-full outline-none text-black" placeholder="Enter your Password" />
                    <span className='invert' onClick={() => setRevealPassword(!revealPassword)}>
                        {revealPassword ? <ShowEye /> : <RevealEye />}
                    </span>
                </div>
                <ul className='text-red-500 text-[10px] font-medium'>
                    {!validPassword.tenCharPattern && <li>A minimum of 10 chararcters</li>}
                    {!validPassword.lowerCasePattern && <li>At least 1 lowercase letter </li>}
                    {!validPassword.digitPattern && <li>At least 1 number </li>}
                    {!validPassword.upperCasePattern && <li>At least 1 uppercase letter </li>}
                </ul>
            </div>
            <div className="password mt-[49px]">
                <div className="label pb-[11px]">
                    <label htmlFor="confirm-password" className="text-placeholder text-[13px] font-md leading-5">
                        Confirm Password
                    </label>
                </div>
                <div className={`input-field flex items-center gap-[7.42px] pb-[7px] border-b-2 ${passwordConfirmed ? "border-black" : "border-red-500"} `}>
                    <span className='invert'>
                        <Lock />
                    </span>
                    <input required type={revealConfirmPassword ? "text" : "password"} name="confirm-password" onChange={handleConfirmPassword} className="email-input bg-transparent outline-none w-[100%] text-black" placeholder="Confirm your Password" />
                    <span className='invert' onClick={() => setRevealConfirmPassword(!revealConfirmPassword)}>
                        {revealConfirmPassword ? <ShowEye /> : <RevealEye />}
                    </span>
                </div>
                {passwordConfirmed ? null : <p className="text-red-500 text-[10px] font-medium">*Password does not match</p>}
            </div>
        </div>
    )
}

export default RegisterForm;