import React, { useState } from 'react'
import { InputReadOnly, InputFormV2, Button } from '../../components'
import anonAvatar from '../../assest/anonavatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { apiUpdateUser } from '../../services'
import { fileToBase64 } from '../../ultils/Common/toBase64'
import { blobToBase64 } from '../../ultils/Common/toBase64'
import { getCurrent } from '../../store/actions'
import Swal from 'sweetalert2'


const EditAccount = () => {
    const { currentData } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        // name: currentData?.name || '',
        // avatar: blobToBase64(currentData?.avatar) || '',
        fbUrl: currentData?.fbUrl || '',
        zalo: currentData?.zalo || '',
    })
    const handleSubmit = async () => {
        const response = await apiUpdateUser(payload)
        if (response?.data.err === 0) {
            Swal.fire('Thành công', 'Chỉnh sửa thành công', 'success').then(() => {
                dispatch(getCurrent())
            })
        } else {
            Swal.fire('Oops!', 'Chỉnh sửa không thành công', 'error')
        }
    }

    const handleUploadFile = async (e) => {
        const imageBase64 = await fileToBase64(e.target.files[0])
        setPayload(prev => ({
            ...prev,
            avatar: imageBase64,
        }))
    }
    return (
        <div className='flex flex-col h-full items-center'>
            <h1 className='text-2xl w-full text-start font-medium py-4 border-b boder-grey-200'>Sửa thông tin cá nhân</h1>
            <div className='w-full flex items-center justify-center flex-auto'>
                <div className='w-3/5 py-6 flex flex-col gap-4'>
                    <InputReadOnly value={currentData?.id?.match(/\d/g).join('')?.slice(0, 6) || ''} direction='flex-row' label='Mã thành viên' />
                    <InputReadOnly value={currentData?.phone || ''} editPhone direction='flex-row' label='Số điện thoại' />
                    <InputFormV2 name='name' setValue={setPayload} value={currentData.name} direction='flex-row' label='Tên hiển thị' />
                    <InputFormV2 name='zalo' setValue={setPayload} value={payload.zalo} direction='flex-row' label='Zalo' />
                    <InputFormV2 name='fbUrl' setValue={setPayload} value={payload.fbUrl} direction='flex-row' label='Facebook' />
                    {/* <div className='flex'>
                        <label className='w-48 flex-none' htmlFor='password'>Mật khẩu</label>
                        <small className='flex-auto text-blue-500 h-12 cursor-pointer '>Đổi mật khẩu</small>
                    </div> */}
                    <div className='flex mb-5'>
                        <label className='w-48 flex-none' htmlFor='avatar'>Ảnh đại diện</label>
                        <div>
                            <img src={currentData?.avatar && blobToBase64(currentData?.avatar) || anonAvatar} alt='avatar' className='w-28 h-28 rounded-full object-cover' />
                            <input onChange={handleUploadFile} type='file' id='avatar' className='appearance-none my-4' />
                        </div>
                    </div>
                    <Button
                        text='Cập nhật'
                        bgColor='bg-blue-500'
                        textColor='text-white'
                        onClick={handleSubmit}
                    />
                </div>
            </div>


        </div>
    )
}

export default EditAccount
