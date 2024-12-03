import React, { useEffect, useState, memo } from 'react'
import Select from './Select'
import { apiGetPublicProvinces, apiGetPublicDistrict, apiGetPublicWard } from '../services/app'
import InputReadOnly from './InputReadOnly'
import { useSelector } from 'react-redux'
import InputFormV2 from './InputFormV2'

const Address = ({ payload, setPayload, invalidFields, setInvalidFiedls, onAddressChange }) => {

    const { dataEdit } = useSelector(state => state.post)
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    //
    const [wards, setWards] = useState([])
    const [ward, setWard] = useState('')
    const [reset, setReset] = useState(false)


    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundProvince = provinces?.length && provinces?.find(item => item.province_name === addressArr[addressArr?.length - 1]?.trim())
            setProvince(foundProvince ? foundProvince.province_id : '')
        }
    }, [provinces, dataEdit])

    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundDistrict = districts?.length > 0 && districts?.find(item => item.district_name === addressArr[addressArr.length - 2]?.trim())
            setDistrict(foundDistrict ? foundDistrict.district_id : '')
        }
    }, [districts, dataEdit])

    //
    useEffect(() => {
        if (dataEdit) {
            let addressArr = dataEdit?.address?.split(',')
            let foundWard = wards?.length > 0 && wards?.find(item => item.ward_name === addressArr[addressArr.length - 3]?.trim())
            setWard(foundWard ? foundWard.ward_id : '')
        }
    }, [wards, dataEdit])
    // //

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces()
            if (response.status === 200) {

                setProvinces(response?.data.results)
            }
        }
        fetchPublicProvince()
    }, [])

    useEffect(() => {
        setDistrict('')
        const fectchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province)
            if (response.status === 200) {

                setDistricts(response?.data.results)
            }
            console.log(response)
        }
        province && fectchPublicDistrict()
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])

    //
    useEffect(() => {
        setWard('')
        const fectchPublicWard = async () => {
            const response = await apiGetPublicWard(district)
            if (response.status === 200) {

                setWards(response?.data.results)
            }
            console.log(response)
        }
        district && fectchPublicWard()
        !district ? setReset(true) : setReset(false)
        !district && setWards([])
    }, [district])
    //
    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name}, ` : ''}${district ? `${districts?.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,
            // address: `${district ? `${districts?.find(item => item.district_id === district)?.district_name}, ` : ''}${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`,
            province: province ? provinces?.find(item => item.province_id === province)?.province_name : ''

        }))
    }, [province, district, ward])
    // console.log(payload.address)
    //
    useEffect(() => {
        if (onAddressChange) {
            onAddressChange(payload?.address); // Gửi giá trị address ra ngoài
        }
    }, [payload?.address]);

    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select setInvalidFiedls={setInvalidFiedls} invalidFields={invalidFields} type='province' value={province} setValue={setProvince} options={provinces} label='Tỉnh/Thành phố ' />
                    <Select setInvalidFiedls={setInvalidFiedls} invalidFields={invalidFields} reset={reset} type='district' value={district} setValue={setDistrict} options={districts} label='Quận/Huyện' />
                    <Select setInvalidFiedls={setInvalidFiedls} invalidFields={invalidFields} reset={reset} type='ward' value={ward} setValue={setWard} options={wards} label='Thị trấn/ Xã' />
                </div>
                <InputReadOnly
                    label='Địa chỉ chính xác'
                    // value={`${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`} />
                    value={`${payload?.houseNumber || ''} ${ward ? `${wards?.find(item => item.ward_id === ward)?.ward_name},` : ''} ${district ? `${districts?.find(item => item.district_id === district)?.district_name},` : ''} ${province ? provinces?.find(item => item.province_id === province)?.province_name : ''}`} />
            </div>
        </div>
    )
}

export default memo(Address)


