import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from '../../assest/logo-removebg-preview.png'
import { Button, User } from "../../components";
import icons from "../../ultils/icon";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/actions'
import menuManage from "../../ultils/menuManage";

const { AiOutlinePlusCircle, IoLogOutSharp, IoIosArrowDown } = icons

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const headerRef = useRef()
    const { isLoggedIn } = useSelector(state => state.auth)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } })
    }, [])
    useEffect(() => {
        headerRef.current.scrollIntoView({ behindvior: 'smooth', block: 'start' })
    }, [searchParams])
    return (
        <div ref={headerRef} className="w-3/5">
            <div className='w-full flex items-center justify-between '>
                <Link to={'/'}>
                    <img
                        src={logo}
                        alt="logo"
                        className="w-[240px] h-[70px] object-contain"
                    /></Link>
                <div className='flex items-center gap-1'>
                    {!isLoggedIn && <div className='flex items-center gap-1'>
                        {/* <small>xin chào!</small> */}
                        <Button
                            text={'Đăng Nhập'}
                            textColor='text-white'
                            bgColor='bg-[#3961fb]'
                            onClick={() => goLogin(false)}

                        />
                        <Button
                            text={'Đăng Ký'}
                            textColor='text-white'
                            bgColor='bg-[#3961fb]'
                            onClick={() => goLogin(true)}
                        />
                    </div>}
                    {isLoggedIn && <div className='flex items-center relative gap-3'>
                        <User />
                        <Button
                            text={'Quảng lý tài khoản'}
                            textColor='text-white'
                            bgColor='bg-[#3961fb]'
                            px='px-4'
                            IcAfter={IoIosArrowDown}
                            onClick={() => setIsShowMenu(prev => !prev)}

                        />
                        {isShowMenu && <div className="absolute flex flex-col gap-1 min-w-300 top-full right-0 bg-white shadow-md rounded-md p-4 ">
                            {menuManage.map(item => {
                                return (
                                    <Link key={item.id} to={item?.path} className="hover:text-orange-300 text-blue-600 border-b border-gray-500 py-1 flex items-center gap-1">
                                        {item?.icon}
                                        {item.text}
                                    </Link>
                                )
                            })}
                            <div className="cursor-pointer hover:text-orange-300 text-blue-600  border-gray-300 py-2 flex items-center gap-1">
                                <IoLogOutSharp size={17} />
                                <span onClick={() => {
                                    setIsShowMenu(false)
                                    dispatch(actions.logout())
                                }}
                                >Đăng xuất</span>
                            </div>
                        </div>}
                    </div>}
                    <Button
                        text={'Đăng tin mới'}
                        textColor='text-white'
                        bgColor='bg-secondary2'
                        IcAfter={AiOutlinePlusCircle}
                        onClick={() => navigate('/he-thong/tao-moi-bai-dang')}
                    />
                </div>

            </div>
        </div>
    )
}

export default Header