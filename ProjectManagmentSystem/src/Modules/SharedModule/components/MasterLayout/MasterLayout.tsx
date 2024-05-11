import React from 'react'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div>
          <SideBar/>
        </div>
        <div className='w-100 vh-100 p-2 p-md-3 overflow-y-auto bg-info-subtle'>
          <Navbar/>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
