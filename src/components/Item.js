import React, { memo, useState } from 'react'
import icons from '../ultils/icon'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString'
import { path } from '../ultils/constant'

const indexs = [0, 1, 2, 3]
const { MdOutlineStarPurple500, GoHeartFill, GoHeart, RiBookmark3Fill } = icons

const Item = ({ images, user, title, star, description, attributes, address, id, userData }) => {
    const [isHoverHeart, setIsHoverHeart] = useState(false)
    const handleStar = (star) => {
        let stars = []
        for (let i = 1; i <= +star; i++) stars.push(<MdOutlineStarPurple500 className='star-item' size={18} color='yellow' />)
        return stars
    }
    return (
        <div className='w-full flex border-t border-orange-600 py-4  '>
            <Link
                to={`${path.DETAIL}${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`}
                className='w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer'>
                {images.length > 0 && images.filter((i, index) => [...Array(4).keys()].some(i => i === index))?.map((i, index) => {
                    return (
                        // <img key={index} className='w-[110px] h-[120px] object-cover' src={i} alt='preview' />
                        <img key={index} className='w-[47%] h-[120px] object-cover' src={i} alt='preview' />

                    )
                })}

                <span className='bg-overlay-30 text-white px-2 rounded-md absolute left-2 bottom-2'>{`${images.length} ảnh`}</span>
                <span className=' text-white absolute right-3 bottom-1'
                    onMouseEnter={() => setIsHoverHeart(true)}
                    onMouseLeave={() => setIsHoverHeart(false)}
                >
                    {isHoverHeart ? <GoHeartFill size={20} color='pink' /> : <GoHeart size={20} />}
                </span>
            </Link>
            <div className='w-3/5 '>
                <div className='flex justify-between gap-4 w-full'>
                    <Link to={`${path.DETAIL}${formatVietnameseToString(title?.replaceAll('/', ''))}/${id}`} className=' text-red-500 font-medium'>
                        {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                            return (
                                <span key={number}>{star}</span>
                            )
                        })}
                        {title}
                    </Link>
                    <div className='w-[10%] flex justify-end'>
                        <RiBookmark3Fill size={24} color='orange' />
                    </div>
                </div>
                <div className='my-2 flex items-center justify-between gap-2'>
                    <span className='font-bold flex-3 text-green-600 whitespace-nowrap overflow-hidden text-ellipsis'>{attributes?.price}</span>
                    <span className='flex-1'>{attributes?.acreage}</span>
                    <span className='flex-3'>{`${address.split(',')[address.split(',').length - 2]}${address.split(',')[address.split(',').length - 1]}`}</span>
                </div>
                <p className='text-gray-500 w-full h-[50px] text-ellipsis overflow-hidden'>
                    {description}
                </p>
                <div className=' flex items-center my-4 justify-between'>
                    <div className='flex items-center'>
                        <img src='https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-2.jpg' alt='avatar' className='w-[30px] h-[30px] object-cover rounded-full' />
                        <p className='text-[10px] font-bold'>{user?.name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <button
                            type='button'
                            className='bg-blue-500 text-white p-1 rounded-md'
                        > {`Gọi ${user?.phone}`}
                        </button>
                        {/* <button
                            href={`https://zalo.me/${user?.zalo}`}
                            type='button'
                            className='text-blue-700 p-1 rounded-md border border-blue-700'
                        >Nhắn zalo
                        </button> */}
                        <a className='text-blue-700 p-1 rounded-md border border-blue-700 ' href={`https://zalo.me/${user?.zalo}`} target='_blank'>Nhắn zalo</a>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Item)
