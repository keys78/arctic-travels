import React from 'react'
import Input from '../components/Input'
import Link from 'next/link'

const signin = () => {
  return (
    <div className='form-group-wrapper'>
      <div className='form-group'>
        <div className='form-logo'>
          <div className="logo-wrapper flex items-center justify-center space-x-3">
            <div className='el-wrap'>
              <img className='el-logo' src="/images/dotted_circle.png" height={'40px'} width={'40px'} />
              <img className='el-plane' src="/images/angular_plane.png" height={'40px'} width={'40px'} />
            </div>
            <span className='font-bold text-white'>Arctic Travels</span>
          </div>
        </div>
        <form>
          <Input label='username' type='text' required={true} />
          <Input label='email' type='email' required={true} />
          <Input label='password' type='password' required={true} />
          <Input label='confirm password' type='password' required={true} />

          <button className='btn-class-form'>Sign In</button>
          <span>Already have an account? <Link href={'/login'}><a><span>Login</span></a></Link></span>
        </form>
      </div>
    </div>
  ) 
}

export default signin