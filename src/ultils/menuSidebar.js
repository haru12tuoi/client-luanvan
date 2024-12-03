import icons from "./icon"

const { IoMdCreate, MdOutlineManageAccounts, FaRegUser, IoIosCall } = icons

const memuSidebar = [
    {
        id: 1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <IoMdCreate />
    },
    {
        id: 2,
        text: 'Quản lý tin đăng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <MdOutlineManageAccounts />
    },
    {
        id: 4,
        text: 'Sửa thông tin cá nhân',
        path: '/he-thong/thong-tin-tai-khoan',
        icon: <FaRegUser />
    },
    // {
    //     id: 5,
    //     text: 'Liên hệ',
    //     path: '/lien-he',
    //     icon: <IoIosCall />
    // }
]

export default memuSidebar