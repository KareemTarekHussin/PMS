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
        <div className={`${Styles.greybackground}  w-100  p-2 p-md-3 bg-info-subtl`}>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
