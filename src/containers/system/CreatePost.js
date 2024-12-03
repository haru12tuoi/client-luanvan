import React, { useEffect, useState } from 'react'
import { Overview, Address, Loading, Button } from '../../components'
import icons from '../../ultils/icon'
import { apiUploadImages } from '../../services'
import { getCodes, getCodesArea } from '../../ultils/Common/getCode'
import { useDispatch, useSelector } from 'react-redux'
import { apiCreatePost, apiUpdate } from '../../services'
import Swal from 'sweetalert2'
import validate from '../../ultils/Common/validateFields'
import { getPostsLimit, resetDataEdit } from '../../store/actions'
import { MapStreet } from '../../components'
import { useParams } from 'react-router-dom'
import { Nominatim } from 'nominatim-geocoder'

const geocoder = new Nominatim();
const { FaCameraRetro, RiDeleteBin6Line } = icons


const CreatePost = ({ isEdit }) => {

  const dispatch = useDispatch()
  const { dataEdit } = useSelector(state => state.post)
  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || '',
      title: dataEdit?.title || '',
      // star: '',
      priceNumber: dataEdit?.priceNumber * 1000000 || 0,
      areaNumber: dataEdit?.areaNumber || 0,
      // images: dataEdit?.images?.image ? JSON.parse(dataEdit?.images?.image) : '',
      images: dataEdit?.images || '',
      address: dataEdit?.address || '',
      priceCode: dataEdit?.priceCode || '',
      areaCode: dataEdit?.areaCode || '',
      description: dataEdit?.description ? JSON.parse(dataEdit?.description) : '',
      target: dataEdit?.overviews?.target || '',
      province: dataEdit?.province || ''
    }
    return initData

  })
  const [imagesPreivew, setImagesPreview] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { prices, areas, categories, provinces } = useSelector(state => state.app)
  const { currentData } = useSelector(state => state.user)
  const [invalidFields, setInvalidFiedls] = useState([])
  const [coords, setCoords] = useState({ lat: 10.762622, lng: 106.660172 });
  const { postId } = useParams()
  const { posts } = useSelector(state => state.post)
  const [address, setAddress] = useState('')


  useEffect(() => {
    if (dataEdit) {
      let images = JSON.parse(dataEdit?.images?.image)
      images && setImagesPreview(images)
    }
  }, [dataEdit])
  //
  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }))
  }, [postId])

  useEffect(() => {
    const getCoords = async () => {
      try {
        // const address = posts?.[0]?.address?.replace("Địa chỉ: ", "");
        const address = payload?.address
        if (address) {
          console.log("Đang tìm tọa độ cho địa chỉ:", address);
          const geocoder = new Nominatim();
          const result = await geocoder.search({ q: address });
          if (result.length > 0) {
            const { lat, lon } = result[0];
            setCoords({ lat: parseFloat(lat), lng: parseFloat(lon) });
          } else {
            console.warn("Không tìm thấy tọa độ.");
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy tọa độ:", error);
      }
    };
    // if (posts?.length > 0) {
    if (address) {
      getCoords();
    } else {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude })
      })
    }
  }, [address]);


  const handleFiles = async (e) => {
    e.stopPropagation()
    setIsLoading(true)
    let images = []
    let files = e.target.files
    let formData = new FormData()
    for (let i of files) {
      formData.append('file', i)
      formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)
      const response = await apiUploadImages(formData)
      if (response.status === 200) images = [...images, response.data?.secure_url]
    }
    setIsLoading(false)
    setImagesPreview(prev => [...prev, ...images])
    setPayload(prev => ({ ...prev, images: [...prev.images, images] }))
  }

  const handleDeleteImage = (image) => {
    setImagesPreview(prev => prev?.filter(item => item !== image))
    setPayload(prev => ({
      ...prev,
      images: prev.images?.filter(item => item !== image)
    }))


  }
  const handleSubmit = async () => {
    let priceCodeArr = getCodes(+payload.priceNumber / Math.pow(10, 6), prices, 1, 15)
    let priceCode = priceCodeArr[0]?.code
    let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 0, 90)
    let areaCode = areaCodeArr[0]?.code
    console.log(payload)
    let finalPayload = {
      ...payload,
      priceCode,
      areaCode,
      userId: currentData.id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      target: payload.target || 'Tất cả',
      label: `${categories?.find(item => item.code === payload?.categoryCode)?.value} ${payload?.address?.split(','[0])}`

    }
    const result = validate(finalPayload, setInvalidFiedls)
    if (result === 0) {
      if (dataEdit) {
        finalPayload.postId = dataEdit?.id
        finalPayload.attributesId = dataEdit?.attributesId
        finalPayload.imagesId = dataEdit?.imagesId
        finalPayload.overviewId = dataEdit?.overviewId

        console.log(finalPayload)
        const response = await apiUpdate(finalPayload)
        if (response?.data.error === 0) {
          Swal.fire('Thành công ', 'Đã thêm cập nhật bài đăng', 'success').then(() => {
            resetPayload()
            dispatch(resetDataEdit())
          })
        } else {
          Swal.fire('Oops!', 'Có lỗi rồi', 'error')
        }
      } else {
        const response = await apiCreatePost(finalPayload)
        if (response?.data.error === 0) {
          Swal.fire('Thành công ', 'Đã thêm thêm', 'success').then(() => {
            resetPayload()
          })
        } else {
          Swal.fire('Oops!', 'Có lỗi rồi', 'error')
        }
      }
    }
  }
  const resetPayload = () => {
    setPayload({
      categoryCode: '',
      title: '',
      // star: '',
      priceNumber: 0,
      areaNumber: 0,
      images: '',
      address: '',
      priceCode: '',
      areaCode: '',
      description: '',
      target: '',
      province: '',
      numberHouser: '',
    })
  }
  //
  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };
  console.log(payload.address)
  return (
    <div className='px-6 '>
      <h1 className='text-2xl font-medium py-4 border-b boder-grey-300'>{isEdit ? 'Chỉnh sửa tin Đăng' : 'Đăng tin mới'}</h1>
      <div className='flex gap-4'>
        <div className='py-4 flex flex-col gap-8 flex-auto'>
          <Address invalidFields={invalidFields} setInvalidFiedls={setInvalidFiedls} payload={payload} setPayload={setPayload} onAddressChange={handleAddressChange} />
          <Overview invalidFields={invalidFields} setInvalidFiedls={setInvalidFiedls} payload={payload} setPayload={setPayload} />
          <div className='w-full'>
            <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div>
              <label className='w-full border-2 h-[300px] gap-4 my-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md' htmlFor='file'>
                {isLoading
                  ? <Loading />
                  : <div className='flex flex-col items-center justify-center'>
                    <FaCameraRetro size={60} color='blue' />
                    Thêm ảnh
                  </div>}
              </label>
              <input onChange={handleFiles} hidden type='file' id='file' multiple />
              <small className='text-red-500 flex flex-col'>
                {invalidFields?.some(item => item.name === 'images') && invalidFields?.find(item => item.name === 'images')?.message}
              </small>
              <div className='w-full mb-6'>
                <h3 className='font-medium py-4'>Ảnh đã chọn</h3>
                <div className='flex gap-4 items-center'>
                  {imagesPreivew?.map(item => {
                    return (
                      <div key={item} className='relative w-40 h-40'>
                        <img key={item} src={item} alt='preview' className=' w-full h-full object-cover rounded-md' />
                        <span
                          title='Xoá'
                          onClick={(e) => handleDeleteImage(item)}
                          className='absolute top-0 right-0 p-1 cursor-pointer'>
                          <RiDeleteBin6Line size={20} />
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            text={isEdit ? 'Cập nhật' : 'Thêm bài đăng'}
            bgColor='bg-green-600'
            textColor='text-white' />
          <div className='h-[500px]'>
            {/*  */}
          </div>
        </div>
        <div className='w-[30%] flex-none pt-12'>
          {posts && <div className='mt-8'>
            {/* {coords ? (
              <MapStreet address={address} coords={coords} />
            ) : (
              <p>Đang tải bản đồ...</p>
            )} */}
            <MapStreet address={address} coords={coords} />
          </div>}
        </div>
      </div>
    </div>
  )
}

export default CreatePost
