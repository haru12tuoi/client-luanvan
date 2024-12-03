import React, { useState } from 'react'
import { InputFormV2, InputReadOnly, Select } from './'
import { useSelector } from 'react-redux'

const targets = [
  { value: 'Nam', value: 'Nam' },
  { value: 'Nữ', value: 'Nữ' },
  { value: 'Tất cả', value: 'Tất cả' },

]

const Overview = ({ payload, setPayload, invalidFields, setInvalidFiedls }) => {

  const { categories } = useSelector(state => state.app)
  const { currentData } = useSelector(state => state.user)
  const { dataEdit } = useSelector(state => state.post)

  console.log(dataEdit)
  return (
    <div>
      <h2 className='font-semibold text-xl py-4'>Thông tin mô tả</h2>
      <div className='w-full flex flex-col gap-4'>
        <div className='w-1/2'>
          <Select
            invalidFields={invalidFields}
            setInvalidFiedls={setInvalidFiedls}
            value={payload.categoryCode}
            setValue={setPayload}
            name='categoryCode'
            options={categories}
            label='Loại chuyên mục' /></div>
        <InputFormV2
          invalidFields={invalidFields}
          setInvalidFiedls={setInvalidFiedls}
          value={payload.title}
          setValue={setPayload}
          name='title'
          label='Tiêu đề' />
        <div className='flex flex-col gap-2'>
          <label htmlFor='discription'> Nội dung mô tả</label>
          <textarea
            id='desc'
            cols='30'
            rows='10'
            className='w-full rounded-md border border-gray-300 outline-none p-2'
            value={payload.description}
            onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value }))}
            onFocus={() => setInvalidFiedls([])}
          ></textarea>
          <small className='text-red-500 flex flex-col'>
            {invalidFields?.some(item => item.name === 'description') && invalidFields?.find(item => item.name === 'description')?.message}
          </small>
        </div>
        <div className='w-1/2 flex flex-col gap-4'>
          <InputReadOnly label='Thông tin liên hệ' value={currentData?.name || currentData?.username} />
          <InputReadOnly label='Điện thoại' value={currentData?.phone} />
          <InputFormV2
            invalidFields={invalidFields}
            setInvalidFiedls={setInvalidFiedls}
            value={payload.priceNumber}
            setValue={setPayload}
            small='Nhập đầy đủ số, ví dụ 1 triệu thì nhập 1000000'
            label='Giá cho thuê' unit='Đồng'
            name='priceNumber' />
          <InputFormV2
            invalidFields={invalidFields}
            setInvalidFiedls={setInvalidFiedls}
            value={payload.areaNumber}
            setValue={setPayload}
            label='Diện tích'
            unit='m2'
            name='areaNumber' />
          <Select
            value={payload.target}
            invalidFields={invalidFields}
            setInvalidFiedls={setInvalidFiedls}
            setValue={setPayload}
            name='target'
            options={targets}
            label='Đối tượng cho thuê' />
        </div>

      </div>

    </div>
  )
}

export default Overview
