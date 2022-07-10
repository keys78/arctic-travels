import React, { useState, useEffect } from 'react'
import Input from '../components/Input'
import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { variants } from '../utils/data';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice';


interface loaderProps {
  src: string,
  width: number,
  height: number,
  quality: string
}

const signin = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [activePanel, setActivePanel] = useState(true)
  const { user: welcomeMessage, isLoading, isError, isSuccess, message } = useSelector(
    (state:any) => state.auth
  )

  
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

  };

  
  useEffect(() => {
    if (isError) {
      alert(message)
    }

    if (isSuccess || welcomeMessage) {
      alert(welcomeMessage)
    }

    dispatch(reset())
  }, [welcomeMessage, isError, isSuccess, message, router, dispatch])



  // useEffect(() => {
  //   console.log(values);
  // }, [values]); 
  const registerUsers = async (value: any) => {
    value.preventDefault()
    // const config: any = {
    //   header: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // }
    // try {
    //   const { data } = await axios.post("http://localhost:4000/auth/register", { ...values, }, config);
    //   console.log(values, data)
    //   alert(data.message)
    // } catch (error) {
    //   console.log(error)
    // }

    if (values.password !== values.confirmPassword) {
      alert('Passwords do not match')
    } else {
      const userData = { ...values, }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return "loading"
  }
  
  // const myLoader = ({ src, width, quality }: loaderProps ) => {
  //   return `https://example.com/${src}?w=${width}&q=${quality || 75}`
  // }
  
  const loader = () => {
    return (
      <Image
        src="/plano_loader.gif"
        alt="Picture of the author"
        width={500}
        height={500}
      />
    )
  }


  return (
    <>


      {/* <motion.div
      variants={variants} 
      initial="hidden" 
      animate="enter" 
      exit="exit"
      transition={{ type: 'linear' }} 
      className='form-group-wrapper'>
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
        <form onSubmit={(e) => registerUsers(e)}>
          <Input name={'username'} value={values.username} label='username' type='text' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
          <Input name={'email'} value={values.email} label='email' type='email' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
          <Input name={'password'} value={values.password} label='password' type='password' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
          <Input name={'confirmPassword'} value={values.confirmPassword} label='confirm password' type='password' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />

          <button className='btn-class-form'>Sign In</button>
          <span className='ready-span'>Already have an account? <Link href={'/login'}><a><span>Login</span></a></Link></span>
        </form>
      </div>
    </motion.div> */}



      <div className='auth-page-wrapper'>
        <div className={`containerr ${activePanel ? 'right-panel-active' : ''} `} >
          <div className="form-containerr sign-up-containerr">
            <form onSubmit={(e) => registerUsers(e)}>
            <h1>Create Account</h1>
              <Input name={'username'} value={values.username} label='username' type='text' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
              <Input name={'email'} value={values.email} label='email' type='email' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
              <Input name={'password'} value={values.password} label='password' type='password' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
              <Input name={'confirmPassword'} value={values.confirmPassword} label='confirm password' type='password' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
              <button className='btn-class-form new-btn'>Sign In <span>{loader()}</span></button>
              <span className='ready-span'>Already have an account?  <span onClick={() => setActivePanel(!activePanel)}>Login</span></span>
            </form>
          </div>
          <div className="form-containerr sign-in-containerr">
            <form>
            <h1>Log In</h1>
              <Input name={'email'} value={values.email} label='email' type='email' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
              <Input name={'password'} value={values.password} label='password' type='password' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
              <button className='btn-class-form new-btn'>Login In</button>
              <span className='ready-span'>Don't have an account?  <span onClick={() => setActivePanel(!activePanel)}>Sign Up</span></span>
            </form>
          </div>
          <div className="overlay-containerr">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Hi Champ!</h1>
                <p>We've missed you. <br /> Log in let see what's up.</p>
                <button onClick={() => setActivePanel(!activePanel)}>Log In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hi Champ!</h1>
                <p>Its misty and cool out there,<br /> why not sign up lets take you on a ride 😉</p>
                <button onClick={() => setActivePanel(!activePanel)}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>







    </>
  )
}

export default signin