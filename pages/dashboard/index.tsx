import React, { useState, useEffect } from 'react'
import { User, GlobeStand, SignOut } from 'phosphor-react'
import Input from '../../components/Input'
import { logout, reset } from '../../features/auth/authSlice'
import { getUser, activate2FA, deActivate2FA, resetUser } from '../../features/private/privateSlice'
import { getAllUnVerifiedUsers, getAllVerifiedUsers, deleteUser } from '../../features/admin/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'



const Dashboard = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [showDrop, setShowDrop] = useState(false)
  const [showConfirmPasswordModal, setShowConfirmPasswordModal] = useState(false)
  const [greetings, setGreetings] = useState('')

  const { user } = useSelector((state: any) => state.auth)
  const { user: userData, isLoading, isSuccess, isError, message } = useSelector((state: any) => state.private)
  const { verifiedUsers, unVerifiedUsers, isSuccess: issuccess, isError: iserror } = useSelector((state: any) => state.admin)
  console.log(verifiedUsers, unVerifiedUsers)
  const initialValues = { password: "", };
  const [value, setValue] = useState(initialValues);
  const onHandleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValue({
      ...value,
      [name]: value,
    })
  };

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    router.push('/signin')
  }



  useEffect(() => {
    // if (isError) {
    //   alert(message)
    // }
    console.log(!isError && message)

    if (!user) {
      router.push('/signin')
    }

    dispatch(getUser())

    // if (userData.role === "admin") {
    dispatch(getAllVerifiedUsers())
    dispatch(getAllUnVerifiedUsers())
    // }

    return () => {
      dispatch(resetUser())
    };

  }, [user, router, iserror, issuccess, message, dispatch])



  useEffect(() => {
    const hour = new Date().getHours();
    const welcomeTypes = ["Good morning", "Good afternoon", "Good evening"];
    let welcomeText = "";

    if (hour < 12) welcomeText = welcomeTypes[0];
    else if (hour < 16) welcomeText = welcomeTypes[1];
    else welcomeText = welcomeTypes[2];

    setGreetings(welcomeText)

  }, []);


  const handleToggleIs2FA = () => {
    setShowConfirmPasswordModal(val => !showConfirmPasswordModal)
  }

  const confirmPasswordFor2FA = (e: any) => {
    e.preventDefault()
    const thunkData = { id: userData._id, password: value.password }

    { userData.two_fa_status === "off" && dispatch(activate2FA(thunkData)) }
    { userData.two_fa_status === "on" && dispatch(deActivate2FA(thunkData)) }


    setShowConfirmPasswordModal(val => !showConfirmPasswordModal)

  }

  const renderPasswordConfirmModal = [
    <div className='password-confirm-modal'>
      <form onSubmit={(e) => confirmPasswordFor2FA(e)}>
        <span className='close-modal-p' onClick={() => setShowConfirmPasswordModal(prev => !showConfirmPasswordModal)}>close</span>
        <Input name={'password'} value={value.password} label='password' type='password' required={true} onHandleInputChange={(e: any) => onHandleInputChange(e)} />
        <button className='btn-class-form new-btn'>Confirm</button>
      </form>
    </div>
  ]

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
          <span className='cursor-pointer'><User size={30} onClick={() => setShowDrop(!showDrop)} color="#302b63" weight="duotone" /></span>
          {showDrop &&
            <div className='panel-dropdown'>
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
              <div onClick={onLogout} className='logout'> <SignOut size={20} color="#fff" weight="bold" /> Logout </div>
            </div>
          }
        </div>
      </div>
      <div className='data-spec'>
        <h1>{greetings} {userData.username} {userData.role}</h1>
        <p>{userData._id}</p>
        {/* <div>
          My Info
          <div>
            <p>{userData.username}</p>
            <p>{userData.email}</p>
            <p>email status: {userData.verified ? 'verified' : 'not verified'}</p>
            <p>2FA status: {userData.two_fa_status}</p>
            </div>
        </div> */}
        {/* <h1>{greetings} {'Emmanuel'}</h1> */}
        <p>Your 2FA Authentication is {userData.two_fa_status === "on" ? "active" : "inactive"}</p>
        {showConfirmPasswordModal && renderPasswordConfirmModal}

        {userData.role === "admin" &&
          <div>
            {unVerifiedUsers ? unVerifiedUsers.map((val: any) => (
              <div key={userData._id}>
                <p>{val.username}</p>
                <p>{val.email}</p>
                <button onClick={() => dispatch(deleteUser(val._id))} className='close'>
                  X
                </button>
              </div>
            )) : 'loading...'
            }
          </div>
        }
      </div>
    </>
  )
}

export default Dashboard