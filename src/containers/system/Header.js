import React from 'react'
import { Navigation } from '../public'

const Header = () => {
    return (
        <div className='w-full flex flex-none h-[40px]'>
            <div className='flex justify-center items-center font-bold bg-[#0056b3] text-white w-[256px] flex-none'>
                Hoang Phuc
            </div>
            <div className='flex-auto'>
                <Navigation isAdmin={true} />
            </div>
        </div>
    )
}

export default Header
