import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUnVerifiedUsers, getAllVerifiedUsers, deleteUser, resetUsers } from '../../features/admin/adminSlice'
import Tabs from '../../components/CustomTabs/Tabs'
import { Trash } from 'phosphor-react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

const ForAdmin = () => {
    const dispatch = useDispatch();
    const { verifiedUsers, unVerifiedUsers, isError, message } = useSelector((state: any) => state.admin)

    useEffect(() => {
        if (!isError && message !== "") {
            toast.success(message, { autoClose: 1000 });
        }

        dispatch(getAllVerifiedUsers())
        dispatch(getAllUnVerifiedUsers())

        return () => {
            dispatch(resetUsers())
        };

    }, [dispatch, message])

    const renderUnVerified = unVerifiedUsers && unVerifiedUsers.map((val: any) => (
        <motion.div className="single-user" key={val._id}
        >
            <p>{val.username}</p>
            <p>{val.email}</p>
            <p className='flex items-center space-x-3 text-sm'><span>2FA:</span>  {val.two_fa_status === "off" ? <span className="off-i">off</span> : <span className='on-i'>on</span>}</p>
            <button onClick={() => dispatch(deleteUser(val._id))} className='close'>
                <Trash size={16} color="#e71818" weight="thin" />
            </button>
        </motion.div>
    ))
    const renderVerified = verifiedUsers && verifiedUsers.map((val: any) => (
        <motion.div className="single-user" key={val._id}
        >
            <p>{val.username}</p>
            <p>{val.email}</p>
            <p className='flex items-center space-x-3 text-sm'><span>2FA:</span>  {val.two_fa_status === "off" ? <span className="off-i">off</span> : <span className='on-i'>on</span>}</p>
            <button onClick={() => dispatch(deleteUser(val._id))} className='close'>
                <Trash size={16} color="#e71818" weight="thin" />
            </button>
        </motion.div>
    ))

    const allUsers = [...verifiedUsers, ...unVerifiedUsers]
    const renderAllUsers = allUsers && allUsers.map((val: any) => (
        <motion.div className="single-user" key={val._id}
        >
            <p>{val.username}</p>
            <p>{val.email}</p>
            <p className='flex items-center space-x-3 text-sm'><span>2FA:</span>  {val.two_fa_status === "off" ? <span className="off-i">off</span> : <span className='on-i'>on</span>}</p>
            <button onClick={() => dispatch(deleteUser(val._id))} className='close'>
                <Trash size={16} color="#e71818" weight="thin" />
            </button>
        </motion.div>
    ))



    return (
        <div className='data-users'>
            <Tabs>
                <span className="tab-alone" title="Verified">{renderVerified}</span>
                <span title="Unverified">{renderUnVerified}</span>
                <span title="All Users">{renderAllUsers}</span>
            </Tabs>
        </div>
    )
}

export default ForAdmin