import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../store/actions'
import SliderCustom from '../../components/Slider'
import icons from '../../ultils/icon'
import { MapStreet } from '../../components'
import Nominatim from "nominatim-geocoder";
import { underMap } from '../../ultils/constant'
import { BoxInfo, RelatedPost } from '../../components'

const geocoder = new Nominatim();
const { CiLocationOn, CiMoneyCheck1, PiCropLight, CiTimer, CiHashtag } = icons


const DetailsPost = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.post)
  const [coords, setCoords] = useState({ lat: 10.762622, lng: 106.660172 });

  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }))
  }, [postId])

  useEffect(() => {
    const getCoords = async () => {
      try {
        const address = posts?.[0]?.address?.replace("Địa chỉ: ", "");
        if (address) {
          // console.log("Đang tìm tọa độ cho địa chỉ:", address);
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

    if (posts?.length > 0) {
      getCoords();
    }
  }, [posts]);




  return (
    <div className='w-full flex gap-4'>
      <div className='w-[70%]'>
        <SliderCustom images={posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)} />
        <div className='bg-white rounded-md shadow-md p-4'>
          <div className='flex flex-col gap-2 '>
            <h2 className='text-xl font-semibold text-red-500 my-4'>{posts[0]?.title}</h2>
            <div className='flex items-center gap-2'>
              <span>Chuyên mục:</span>
              <span className='text-blue-600 underline font-medium hover:text-orange-400 cursor-pointer'>{posts[0]?.overviews?.area}</span>
            </div>
            <div className='flex items-center gap-2'>
              <CiLocationOn color='blue' />
              {/* <span>Địa chỉ:</span> */}
              <span>{posts[0]?.address}</span>
            </div>
            <div className='flex items-center justify-between gap-2'>
              <span className='flex items-center gap-1' >
                <CiMoneyCheck1 />
                <span className='font-medium text-lg text-green-500'>{posts[0]?.attributes?.price}</span>
              </span>
              <span className='flex items-center gap-1' >
                <PiCropLight />
                <span>{posts[0]?.attributes?.acreage}</span>
              </span>
              <span className='flex items-center gap-1' >
                <CiTimer />
                <span>{posts[0]?.overviews?.created}</span>
              </span>
              <span className='flex items-center gap-1'>
                <CiHashtag />
                <span>{posts[0]?.attributes?.hashtag?.split('#')}</span>
              </span>
            </div>
          </div>
          <div className='mt-8'>
            <h3 className='font-semibold text-xl my-4'>Thông tin mô tả: </h3>
            <div className='flex flex-col gap-3'>
              {/* {posts[0]?.description && JSON.parse(posts[0]?.description)?.map((item, index) => {
                return (
                  <span key={index}>{item}</span>
                )
              })} */}
              {/* {JSON.parse(posts[0]?.description)} */}
              {/* {posts[0]?.description} */}
              {posts[0]?.description && JSON.parse(posts[0]?.description)}

            </div>
          </div>
          <div className='mt-8'>
            <h3 className='font-semibold text-xl my-4'>Đặc điểm tin đăng</h3>
            <table className='w-full'>
              <tbody className='w-full'>
                <tr className='w-full'>
                  <td className="p-4">Mã tin</td>
                  <td className="p-4">{posts[0]?.overviews?.code}</td>

                </tr>
                <tr className='w-full bg-gray-200'>
                  <td className="p-4">Đối tượng cho thuê</td>
                  <td className="p-4">{posts[0]?.overviews?.target}</td>
                </tr>
                <tr className='w-full'>
                  <td className="p-4">Loại tin rao</td>
                  <td className="p-4">{posts[0]?.overviews?.type}</td>
                </tr>
                <tr className='w-full bg-gray-200'>
                  <td className="p-4">Gói tin</td>
                  <td className="p-4">{posts[0]?.overviews?.bonus}</td>
                </tr>
                <tr className='w-full '>
                  <td className="p-4">Ngày đăng</td>
                  <td className="p-4">{posts[0]?.overviews?.created}</td>
                </tr>
                <tr className='w-full bg-gray-200'>
                  <td className="p-4">Ngày hết hạn</td>
                  <td className="p-4">{posts[0]?.overviews?.expired}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='mt-8'>
            <h3 className='font-semibold text-xl my-4'>Thông tin liên hệ</h3>
            <table className='w-full'>
              <tbody className='w-full'>
                <tr className='w-full bg-gray-200'>
                  <td className="p-4">Tên người dùng</td>
                  <td className="p-4">{posts[0]?.user?.name}</td>
                </tr>
                <tr className='w-full '>
                  <td className="p-4">Điện thoại</td>
                  <td className="p-4">{posts[0]?.user?.phone}</td>
                </tr>
                <tr className='w-full bg-gray-200'>
                  <td className="p-4">Zalo</td>
                  <td className="p-4">{posts[0]?.user?.zalo}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* {posts && <div className='mt-8'> */}
          {/* <div className='mt-8'> */}
          <h3 className='font-semibold text-xl my-4'>Bản đồ</h3>
          {/* <Map address={posts.address} coords={coords} /> */}
          {/* </div>} */}
          {posts && <div className='mt-8'>
            {coords ? (
              <MapStreet address={posts.address} coords={coords} />
            ) : (
              <p>Đang tải bản đồ...</p>
            )}
          </div>}
          {/* </div> */}
          <p className='text-gray-500 text-sm py-1 justify-center'>
            {`${underMap[0]}  `}
            {/* {`${underMap[1]} `} */}
          </p>
          <p className='text-gray-500 text-sm py-1 justify-center'>
            {`${underMap[1]} `}
          </p>

        </div>
      </div>
      <div className='w-[30%] flex flex-col gap-8'>
        <BoxInfo userData={posts[0]?.user} />
        <RelatedPost />
      </div>
    </div>
  )
}

export default DetailsPost

