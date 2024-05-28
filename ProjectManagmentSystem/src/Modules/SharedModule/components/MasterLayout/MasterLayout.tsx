import React from 'react'
import Styles from "./MasterLayout.module.css"
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
<>
      <Navbar/>
      <div className="d-flex">
        <div>
          <SideBar/>
        </div>
        <div className='w-100 overflow-aut p-2 p-md-3 bg-body-secondary'>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
