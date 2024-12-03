import React from "react";
import { Header } from './'
import { Outlet, useLocation } from "react-router-dom";
import { Navigation, Search } from './'
import { Intro, Contact } from "../../components";
import { useSelector } from "react-redux";
import { path } from "../../ultils/constant";



const Home = () => {

  const { isLoggedIn } = useSelector(state => state.auth)
  const location = useLocation()
  console.log(location)




  return (
    <div className="w-full gap-6 flex flex-col items-center h-full  ">
      <Header />
      <div className="w-full">
        <Navigation />
      </div>
      {isLoggedIn && location.pathname !== `/${path.CONTACT}` && !location.pathname?.includes(path.DETAIL) && <Search />}
      <div className=' w-4/5 lg:w-3/5 flex flex-col items-center justify-center'>
        <Outlet />
      </div>
      <Intro />
      <Contact />
      <div className="h-[500px]">

      </div>
    </div>
  )
}

export default Home