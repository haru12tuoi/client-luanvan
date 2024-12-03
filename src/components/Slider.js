import React, { memo } from 'react'
import Slider from "react-slick";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
const SliderCustom = ({ images }) => {
    return (
        <div className='w-full'>
            <Slider {...settings}>
                {images?.length > 0 && images?.map((item, index) => {
                    return (
                        <div key={index} className='bg-black flex justify-center h-[320px] '>
                            <img
                                src={item}
                                alt='slider'
                                className='object-cover m-auto h-full'
                            />
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}

export default memo(SliderCustom)
// import React, { memo } from 'react'
// import Slider from "react-slick";

// const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1
// };
// const SliderCustom = ({ images }) => {
//     return (
//         <div className='w-full'>
//             <Slider {...settings}>
//                 <img
//                     src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2024/11/19/z3321954406696-c40386471328f77af63de569290d3541_1731985665.jpg"
//                     alt='slider'
//                 />
//             </Slider>
//         </div>
//     )
// }

// export default memo(SliderCustom)
