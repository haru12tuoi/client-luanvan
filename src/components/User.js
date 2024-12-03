import React from 'react'
import { useSelector } from 'react-redux'
import anonAvatar from '../assest/anonavatar.png'
import { blobToBase64 } from '../ultils/Common/toBase64'


const User = () => {
  const { currentData } = useSelector(state => state.user)
  return (
    <>
      {currentData && Object.keys(currentData).length > 0 && <div className='flex items-center gap-2'>
        <img src={currentData?.avatar && blobToBase64(currentData?.avatar) || anonAvatar} alt='avatar' className='w-9 object-cover rounded-full h-9 border-3 border-white' />
        <div className='flex flex-col'>
          <span>Xin Chào, <span className='font-semibold'>{currentData?.name}</span></span>
          <span>Mã tài khoản: <span className='font-medium'>{currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}</span></span>
        </div>
      </div>}
    </>
  )
}

export default User
