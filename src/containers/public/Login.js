import React, { useEffect, useState } from "react";
import { InputForm, Button } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
// import { apiRegister } from "../../services/auth";
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import validate from "../../ultils/Common/validateFields";

const Login = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth)
    const [isRegister, setIsRegister] = useState(location.state?.flag)
    const [invalidFields, setInvalidFiedls] = useState([])
    const [payload, setPayload] = useState({
        phone: '',
        password: '',
        name: ''
    })
    useEffect(() => {
        setIsRegister(location.state?.flag)
    }, [location.state?.flag])

    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn])

    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error')
    }, [msg])

    const handleSubmit = async () => {
        let finalPayload = isRegister ? payload : {
            phone: payload.phone,
            password: payload.password
        }
        let invalids = validate(finalPayload, setInvalidFiedls)
        if (invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
    }

    // const validate = (payload) => {
    //     let invalids = 0
    //     let fields = Object.entries(payload)
    //     fields.forEach(item => {
    //         if (item[1] === '') {
    //             setInvalidFiedls(prev => [...prev, {
    //                 name: item[0],
    //                 message: 'Bạn không được bỏ trống trường này.'
    //             }])
    //             invalids++
    //         }
    //     })
    //     fields.forEach(item => {
    //         switch (item[0]) {
    //             case 'password':
    //                 if (item[1].length < 6) {
    //                     setInvalidFiedls(prev => [...prev, {
    //                         name: item[0],
    //                         message: 'Mật khẩu phải có ít nhất 6 ký tự'
    //                     }])
    //                     invalids++
    //                 }
    //                 break;
    //             case 'phone':
    //                 if (!+item[1]) {
    //                     setInvalidFiedls(prev => [...prev, {
    //                         name: item[0],
    //                         message: 'Số điện thoại không hợp lệ'
    //                     }])
    //                     invalids++
    //                 }
    //                 break


    //             default:
    //                 break;
    //         }
    //     })
    //     return invalids
    // }

    return (
        <div className="bg-white p-[30px] pb-[100px] rounded-md shadow-sm w-[600px] ">
            <h3 className="font-semibold text-2xl mb-3">{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}</h3>
            <div className="w-full flex flex-col gap-5">
                {isRegister &&
                    <InputForm setInvalidFiedls={setInvalidFiedls}
                        invalidFields={invalidFields}
                        label={'Họ Tên'} value={payload.name}
                        setValue={setPayload}
                        keyPayload={'name'} />}
                <InputForm setInvalidFiedls={setInvalidFiedls}
                    invalidFields={invalidFields}
                    label={'Số điện thoại'}
                    value={payload.phone}
                    setValue={setPayload}
                    keyPayload={'phone'} />
                <InputForm setInvalidFiedls={setInvalidFiedls}
                    invalidFields={invalidFields}
                    label={'Mật Khẩu'}
                    value={payload.password}
                    setValue={setPayload}
                    keyPayload={'password'}
                    type='password' />
                <Button
                    text={isRegister ? 'Đăng ký' : 'Đăng nhập'}
                    textColor='text-white'
                    bgColor='bg-[#3961fb]'
                    fullWidth
                    onClick={handleSubmit}
                />
            </div>
            <div className="mt-7 flex items-center justify-between">
                {isRegister
                    ? <small>Bạn đã có tài khoản? <span
                        onClick={() => {
                            setIsRegister(false)
                            setPayload({
                                phone: '',
                                password: '',
                                name: ''
                            })
                        }}
                        className='text-blue-500 hover:underline cursor-pointer'>Đăng nhập ngay</span></small>
                    : <>
                        <small className="text-[blue] hover:text-[red] cursor-pointer">Quên mật khẩu</small>
                        <small
                            onClick={() => {
                                setIsRegister(true)
                                setPayload({
                                    phone: '',
                                    password: '',
                                    name: ''
                                })
                            }}
                            className="text-[blue] hover:text-[red] cursor-pointer">Tạo tài khoản</small>
                    </>}
            </div>
        </div>
    )
}

export default Login
