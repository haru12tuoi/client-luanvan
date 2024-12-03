import React, { memo } from 'react'
import icons from '../ultils/icon'
import { formatVietnameseToString } from '../ultils/Common/formatVietnameseToString'
import { Link } from 'react-router-dom'
import * as actions from '../store/actions'
import { useDispatch } from 'react-redux'
import { createSearchParams, useNavigate, useLocation } from 'react-router-dom'


const { GrNext } = icons

const ItemSidebar = ({ title, content, isDouble, type }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  // console.log(location)

  const formatCotent = () => {
    const oddEl = content?.filter((item, index) => index % 2 !== 0)
    const evenEl = content?.filter((item, index) => index % 2 === 0)
    const formatCotent = oddEl?.map((item, index) => {
      return {
        right: item,
        left: evenEl?.find((item2, index2) => index2 === index)
      }
    })
    return formatCotent
  }

  const handleFilterPosts = (code) => {
    // dispatch(actions.getPostsLimit({ [type]: code }))
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({
        [type]: code
      }).toString()
    })

  }

  return (
    <div className='p-4 rounded-md bg-white w-full'>
      <h3 className='text-lg font-semibold mb-4'>{title}</h3>
      {!isDouble && <div className='flex flex-col gap-1'>
        {content?.length > 0 && content.map(item => {
          return (
            <Link
              to={`${formatVietnameseToString(item.value)}`}
              key={item.code}
              className='flex items-center gap-2 cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'>
              <GrNext size={8} color='#ccc' />
              <p>{item.value}</p>
            </Link>
          )
        })}
      </div>}
      {isDouble && <div className='flex flex-col gap-1'>
        {content?.length > 0 && formatCotent(content).map((item, index) => {
          return (
            <div key={index} className=''>
              <div className='flex items-center justify-around'>
                <div
                  onClick={() => handleFilterPosts(item.left.code)}
                  className='flex flex-1 items-center gap-2 cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed 
                '>
                  <GrNext size={8} color='#ccc' />
                  <p>{item.left.value}</p>
                </div>
                <div
                  className='flex flex-1 items-center gap-2 cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'
                  onClick={() => handleFilterPosts(item.right.code)}
                >
                  <GrNext size={8} color='#ccc' />
                  <p>{item.right.value}</p>
                </div></div>
            </div>
          )
        })}
      </div>}
    </div>
  )
}

export default memo(ItemSidebar)
