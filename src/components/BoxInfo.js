import React, { memo } from 'react'
import anonAvatar from '../assest/anonavatar.png'
import { LuDot } from "react-icons/lu";
import { FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
const BoxInfo = ({ userData }) => {
    return (
        <div className='w-full bg-white rounded-md flex flex-col items-center p-4'>
            <img src={anonAvatar} alt='avatar' className='w-16 h-16 object-contain rounded-full' />
            <h3 className='font-medium text-xl py-2'>{userData?.name}</h3>
            <span className='flex items-center'>
                <LuDot color='green' size={20} />
                <span>Đang hoạt động</span>

            </span>
            <a className='bg-[#057c05] mb-3 py-2 text-white text-lg flex justify-center items-center gap-2 rounded-md w-full font-bold ' href={`tel:${userData?.phone}`}><FaPhoneAlt size={20} />{userData?.phone}</a>
            <a className='bg-[#0d6efd] py-2 text-white text-lg flex justify-center items-center gap-2 rounded-md w-full font-bold ' href={`https://zalo.me/${userData?.zalo}`}><SiZalo size={33} /></a>
        </div>
    )
}

export default memo(BoxInfo)
