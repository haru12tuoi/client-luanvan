import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import moment from 'moment'
import { Button, UpdatePost } from '../../components'
import { apiDelete } from '../../services'
import Swal from 'sweetalert2'


const ManagerPost = () => {
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const { postOfCurrent, dataEdit } = useSelector(state => state.post)
  const [updateData, setUpdateData] = useState(false)
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('0')

  useEffect(() => {
    !dataEdit && dispatch(actions.getPostsLimitAdmin())
  }, [dataEdit, updateData])

  useEffect(() => {
    setPosts(postOfCurrent)
  }, [postOfCurrent])

  useEffect(() => {
    !dataEdit && setIsEdit(false)
  }, [dataEdit])

  const checkStatus = (dateString) => moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(new Date().toDateString())

  const handleDeletePost = async (postId) => {
    const response = await apiDelete(postId)
    if (response?.data.err === 0) {
      setUpdateData(prev => !prev)
    } else {
      Swal.fire('Oops!', 'Xoá không thành công', 'error')
    }

  }

  useEffect(() => {
    if (status === 1) {
      const activePost = postOfCurrent?.filter(item => checkStatus(item?.overviews?.expired?.split(' ')[3]))
      setPosts(activePost)
    } else if (status === 2) {
      const expiredPost = postOfCurrent?.filter(item => !checkStatus(item?.overviews?.expired?.split(' ')[3]))
      setPosts(expiredPost)
    } else {
      setPosts(postOfCurrent)
    }
  }, [status])

  return (
    <div className='items-center gap-6 '>
      <div className=' py-4 border-b boder-grey-300 flex items-center justify-between'>
        <h1 className='text-2xl font-medium'>Quản lý tin đăng</h1>
        <select onChange={e => setStatus(+e.target.value)} value={status} className='outline-none border p-2 border-gray-400 rounded-md'>
          <option value='0'>Lọc theo trạng thái</option>
          <option value='1'>Đang hoạt động</option>
          <option value='2'>Đã hết hạn</option>
        </select>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className='flex w-full bg-gray-100'>
            <th className='border flex-1 p-2'>Mã tin</th>
            <th className='border flex-1 p-2'>Ảnh đại diện</th>
            <th className='border flex-1 p-2'>Tiêu đề</th>
            <th className='border flex-1 p-2'>Giá</th>
            <th className='border flex-1 p-2'>Ngày bất đầu</th>
            <th className='border flex-1 p-2'>Ngày hết hạn</th>
            <th className='border flex-1 p-2'>Trạng thái</th>
            <th className='border flex-1 p-2'>Chỉnh sửa</th>

          </tr>
        </thead>
        <tbody>
          {!posts ? <tr>
            <td>Xin hãy đăng bài</td>
          </tr>
            : posts?.map(item => {
              return (
                <tr key={item.id} className='h-16 items-center flex'>
                  <td className='border flex-1 h-full flex justify-center items-center p-2'>{item?.overviews?.code}</td>
                  <td className='border flex-1 h-full flex justify-center items-center p-2'><img src={JSON.parse(item?.images?.image)[0] || ''} alt='avatar-post' className='rounded-md w-10 h-10 object-cover' /></td>
                  <td className='border flex-1 h-full text-center p-2 text-ellipsis overflow-hidden'>{item?.title}</td>
                  <td className='border flex-1 h-full flex justify-center items-center p-2'>{item?.attributes?.price}</td>
                  <td className='border flex-1 h-full flex justify-center items-center p-2 text-center'>{item?.overviews?.created}</td>
                  <td className='border flex-1 h-full flex justify-center items-center p-2 text-center'>{item?.overviews?.expired}</td>
                  <td className='border flex-1 h-full flex justify-center items-center p-2'>
                    {checkStatus(item?.overviews?.expired?.split(' ')[3]) ? 'Đang hoạt động' : 'Đã hết hạn'}

                  </td>
                  <td className='border flex-1 h-full flex justify-center items-center p-2 gap-2'>
                    <Button
                      text='Sửa'
                      bgColor='bg-green-600'
                      textColor='text-white'
                      onClick={() => {
                        dispatch(actions.editData(item))
                        setIsEdit(true)
                      }}
                    />
                    <Button
                      text='Xoá'
                      bgColor='bg-red-600'
                      textColor='text-white'
                      onClick={() => handleDeletePost(item.id)}
                    />
                  </td>


                </tr>
              )
            })}
        </tbody>
      </table>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  )
}

export default ManagerPost
