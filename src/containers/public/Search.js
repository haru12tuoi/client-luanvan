import React, { useCallback, useEffect, useState } from 'react'
import { Searchitem, Modal } from '../../components'
import icons from '../../ultils/icon'
import { useSelector } from 'react-redux'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { path } from '../../ultils/constant'

const { GrFormNext, VscLocation, CiMoneyCheck1, PiCropLight, FaHouse, FaDeleteLeft, CiSearch } = icons

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isShowModal, setIsShowModal] = useState(false)
    const [content, setContent] = useState([])
    const [name, setName] = useState('')
    const { provinces, areas, prices, categories } = useSelector(state => state.app)
    const [queries, setQueries] = useState({})
    const [arrMinMax, setArrMinMax] = useState({})
    const [defaultText, setDefaultText] = useState('')

    useEffect(() => {
        if (!location?.pathname.includes(path.SEARCH)) {
            setArrMinMax({})
            setQueries({})
        }
    }, [location.pathname])

    const handleShowModal = (content, name, defaultText) => {
        setContent(content)
        setName(name)
        setIsShowModal(true)
        setDefaultText(defaultText)
    }
    const handleSubmit = useCallback((e, query, arrMaxMin) => {
        e.stopPropagation()
        setQueries(prev => ({ ...prev, ...query }))
        setIsShowModal(false)
        arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
    }, [isShowModal, queries])

    const handleSearch = () => {
        const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
        let queryCodesObj = {}
        queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
        const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
        let queryTextObj = {}
        queryText.forEach(item => { queryTextObj[item[0]] = item[1] })
        let titleSearch = `${queryTextObj.category
            ? queryTextObj.category
            : 'Cho thuê tất cả'} ${queryTextObj.province
                ? `tỉnh ${queryTextObj.province}`
                : ''} ${queryTextObj.price
                    ? `giá ${queryTextObj.price}`
                    : ''} ${queryTextObj.area
                        ? `diện tích ${queryTextObj.area}` : ''} `
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams(queryCodesObj).toString(),
        }, { state: { titleSearch } })

    }

    return (
        <>
            <div className=' p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
                <span onClick={() => handleShowModal(categories, 'category', 'Tìm Tất Cả')} className='flex-1 cursor-pointer'>
                    <Searchitem IconBefore={<FaHouse />} IconAfter={<FaDeleteLeft />} fontWeight text={queries.category} defaultText={'Tìm Tất Cả'} />
                </span>
                <span onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc ')} className='flex-1 cursor-pointer'>
                    <Searchitem IconBefore={<VscLocation />} IconAfter={<GrFormNext />} text={queries.province} defaultText={'Toàn quốc '} />
                </span>
                <span onClick={() => handleShowModal(prices, 'price', 'Chọn giá ')} className='flex-1 cursor-pointer'>
                    <Searchitem IconBefore={<CiMoneyCheck1 />} IconAfter={<GrFormNext />} text={queries.price} defaultText={'Chọn giá '} />
                </span>
                <span onClick={() => handleShowModal(areas, 'area', ' Diện tích')} className='flex-1 cursor-pointer'>
                    <Searchitem IconBefore={<PiCropLight />} IconAfter={<GrFormNext />} text={queries.area} defaultText={' Diện tích'} />
                </span>
                <button
                    type='button'
                    onClick={handleSearch}
                    className='outline-none py-2 px-4 flex-1 text-[13px] bg-[#3961FB] flex items-center justify-center gap-2 text-white font-medium rounded-lg'
                >
                    <CiSearch />
                    Tìm kiếm
                </button>
            </div>
            {isShowModal && <Modal handleSubmit={handleSubmit} arrMinMax={arrMinMax} queries={queries} content={content} name={name} setIsShowModal={setIsShowModal} defaultText={defaultText} />}
        </>
    )
}

export default Search
