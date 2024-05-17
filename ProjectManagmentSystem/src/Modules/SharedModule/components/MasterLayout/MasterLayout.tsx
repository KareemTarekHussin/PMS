import React from 'react'
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
        <div className='w-100 p-2 p-md-3 bg-info-subtle overflow-y-auto bg-info-subtl'>
          <Outlet/>
        </div>
      </div>
    </>
  )
}
