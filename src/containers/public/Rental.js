import React, { useEffect, useState } from 'react'
import { text } from '../../ultils/constant'
import { Province, ItemSidebar, RelatedPost } from '../../components'
import { List, Pagination } from './index'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString'
import * as actions from '../../store/actions'

const RentalHouse = () => {
  const { prices, areas, categories } = useSelector(state => state.app)
  const [categoryCurrent, setCategoryCurrent] = useState({})
  const [categoryCode, setCategoryCode] = useState('none')
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    const category = categories?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname)
    setCategoryCurrent(category)
    if (category) {
      setCategoryCode(category.code)
    }
  }, [location])

  return (
    <div>
      <div className=' w-full flex flex-col gap-3'>
        <div>
          <h1 className='text-[28px] font-bold '>{categoryCurrent?.header}</h1>
          <p className='text-base text-gray-700'>{categoryCurrent?.subheader}</p>
        </div>
        <Province />
        <div className='w-full flex gap-4'>
          <div className='w-[70%]'>
            <List categoryCode={categoryCode} />
            <Pagination />
          </div>
          <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
            <ItemSidebar type='priceCode' isDouble={true} content={prices} title='Xem theo giá' />
            <ItemSidebar type='areaCode' isDouble={true} content={areas} title='Xem theo diện tích' />
            <RelatedPost />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RentalHouse
