import React, { useState, useEffect } from 'react'
import { getUser, resetUser } from '../../features/private/privateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import PrivateNav from '../../components/PrivateNav'
import UserInfo from '../../components/UserInfo'
import ForAdmin from './ForAdmin'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../app/hooks'




const Dashboard = () => {
  // const dispatch = useDispatch()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isPasswordModal, setIsPasswordModal] = useState(false)
  const { user } = useSelector((state: any) => state.auth)
  const { user: userData, isLoading, isError, message } = useSelector((state: any) => state.private)
  const { verifiedUsers, unVerifiedUsers } = useSelector((state: any) => state.admin)




  useEffect(() => {
    if (isError) {
      toast(message)
    }

    if (!user && (user && !user.token)) {
      router.push('/signin')
    }

    dispatch(getUser())

    return () => {
      dispatch(resetUser())
    }
  }, [user, router, isError, message, dispatch])




return user ? (
  <section className={userData.role === "admin"? "private-wrapper-admin" : "private-wrapper"} >
    {isLoading && <Loader />}
    <PrivateNav isPasswordModal={isPasswordModal} setIsPasswordModal={setIsPasswordModal} userData={userData && userData}/>
    <UserInfo isPasswordModal={isPasswordModal} setIsPasswordModal={setIsPasswordModal} userData={userData && userData} />
    {userData.role === "admin" && verifiedUsers && unVerifiedUsers && <ForAdmin />}
  </section>
) : isError
}

export default Dashboard