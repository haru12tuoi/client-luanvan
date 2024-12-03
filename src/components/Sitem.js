import React from 'react'
import moment from 'moment'
import 'moment/locale/vi'
const Sitem = ({ title, price, image, createdAt }) => {

    const formatTime = (createdAt) => {
        return moment(createdAt).fromNow()
    }

    return (
        <div className='w-full flex items-center gap-2 border-gray-200 border-b py-2'>
            <img src={image[0]} alt='anh'
                className='w-[65px] h-[65px] object-cover rounded-md flex-none'
            />
            <div className='w-full flex-auto flex flex-col justify-between gap-1'>
                <h4 className='text-blue-500 text-[13px]'>{`${title?.slice(0, 45)}...`}</h4>
                <div className='flex items-center justify-between w-full '>
                    <span className='text-sm font-medium text-green-400'>{price}</span>
                    <span className='text-sm text-gray-300'>{formatTime(createdAt)}</span>
                </div>
            </div>
        </div>
    )
}

export default Sitem
