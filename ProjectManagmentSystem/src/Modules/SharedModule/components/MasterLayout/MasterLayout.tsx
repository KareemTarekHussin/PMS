import React from 'react'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Styles from  "./MasterLayout.module.css";
export default function MasterLayout() {
  return (
    <>
      <Navbar/>
      <div className="d-flex">
        <div>
          <SideBar/>
        </div>
        <div className={`${Styles.greybackground}  w-100 vh-100 p-2 p-md-3   overflow-y-auto bg-info-subtl darkMood-MasterLayout`}>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
