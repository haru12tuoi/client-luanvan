import icons from "./icon"

const {IoMdCreate, MdOutlineManageAccounts, FaRegUser} = icons

const menuManager = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <IoMdCreate size={15}/>
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <MdOutlineManageAccounts size={17}/>
    },
    {
        id: 4,
        text: 'Thông tin tài khoản',
        path: '/he-thong/thong-tin-tai-khoan',
        icon: <FaRegUser size={15}/>
    },
    
]
export default menuManager