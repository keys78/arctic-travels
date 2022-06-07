import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import Link from 'next/link'
import { useRouter } from 'next/router';

const signin = () => {
  const router = useRouter()
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initialValues);
  const onHandleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(values)
  };

  // useEffect(() => {
  //   console.log(values);
  // }, [values]); 

  return (
    <div className='form-group-wrapper'>
      <div className='form-group'>
        <div className='form-logo'>
          <div onClick={() => router.push('/')} className="logo-wrapper cursor-default flex items-center justify-center space-x-3">
            <div className='el-wrap'>
              <img className='el-logo' src="/images/dotted_circle.png" height={'40px'} width={'40px'} />
              <img className='el-plane' src="/images/angular_plane.png" height={'40px'} width={'40px'} />
            </div>
            <span className='font-bold text-white'>Arctic Travels</span>
          </div>
        </div>
        <form>
          <Input name={'username'} value={values.username} label='username' type='text' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
          <Input name={'email'} value={values.email} label='email' type='email' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
          <Input name={'password'} value={values.password} label='password' type='password' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
          <Input name={'confirmPassword'} value={values.confirmPassword} label='confirm password' type='password' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />

          <button className='btn-class-form'>Sign In</button>
          <span className='ready-span'>Already have an account? <Link href={'/login'}><a><span>Login</span></a></Link></span>
        </form>
      </div>
    </div>
  ) 
}

export default signin