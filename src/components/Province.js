import React from 'react'
import { location } from '../ultils/constant'
import ProvinceBtn from './ProvinceBtn'

const Province = () => {
  return (
    <div className='flex justify-center gap-5 py-5'>
      {location.map(item => {
        return (
          <ProvinceBtn
            key={item.id}
            image={item.image}
            name={item.name}
            provinceCode={item.provinceCode}
          />
        )
      })}
    </div>
  )
}

export default Province
