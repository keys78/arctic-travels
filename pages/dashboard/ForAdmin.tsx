import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllUnVerifiedUsers, getAllVerifiedUsers, deleteUser, resetUsers } from '../../features/admin/adminSlice'
import Tabs from '../../components/CustomTabs/Tabs'
import { Trash } from 'phosphor-react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../app/hooks'
import SearchBar from '../../components/SearchBar'
import SortByOrder from '../../components/SortByOrder'

const ForAdmin = () => {
    const dispatch = useAppDispatch()
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

    const errorSearch = [
        <span className='text-white text-center mt-3' >no data found..</span>
    ]



    return (
        <div className='data-users'>
            <div className="sort-filter">
                <SearchBar />
                <SortByOrder />
            </div>
            <Tabs>
                <span className="tab-alone" title={`Verified (${renderVerified.length})`}> {renderVerified.length > 0 ? renderVerified : errorSearch} </span>
                <span title={`Unverified (${renderUnVerified.length})`}>{renderUnVerified.length > 0 ? renderUnVerified : errorSearch}</span>
                <span title={`All Users (${renderAllUsers.length})`}>{renderAllUsers.length > 0 ? renderAllUsers : errorSearch}</span>
            </Tabs>
        </div>
    )
}

export default ForAdmin