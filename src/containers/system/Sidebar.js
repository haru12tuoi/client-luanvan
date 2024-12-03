import React from 'react'
import anonAvatar from '../../assest/anonavatar.png'
import { useDispatch, useSelector } from 'react-redux'
import menuSidebar from '../../ultils/menuSidebar'
import { NavLink } from 'react-router-dom'
import * as actions from '../../store/actions'
import icons from '../../ultils/icon'
import { blobToBase64 } from '../../ultils/Common/toBase64'

const { IoLogOutSharp } = icons

const activeStyle = 'hover:bg-gray-200 flex  rounded-md items-center gap-2 py-2 font-bold bg-gray-200'
const notActiceStyle = 'hover:bg-gray-200 flex  rounded-md items-center gap-2 py-2 cursor-pointer'


const Sidebar = () => {
    const { currentData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    return (
        <div className='w-[256px] flex-none '>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <img src={currentData?.avatar && blobToBase64(currentData?.avatar) || ''} alt='avatar' className='w-11 h-11 object-cover rounded-full border-2 border-white' />
                    <div className='flex flex-col justify-center'>
                        <span className='font-semibold items-center'>
                            {currentData?.name}
                        </span>
                        <small>{currentData?.phone}</small>
                    </div>
                </div>
                <span>
                    Mã thành viên: <small className='font-medium'>{currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}</small>
                </span>
            </div>
            <div>
                {menuSidebar.map(item => {
                    return (
                        <NavLink
                            key={item.id}
                            to={item?.path}
                            className={({ isActive }) => isActive ? activeStyle : notActiceStyle}
                        >
                            {item?.icon}
                            {item.text}
                        </NavLink>
                    )
                })}
                <span onClick={() => dispatch(actions.logout())} className={notActiceStyle} ><IoLogOutSharp />Thoát</span>
            </div>
        </div>
    )
}

export default Sidebar
