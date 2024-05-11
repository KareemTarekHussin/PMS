import React from 'react'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    <>
<Navbar/>

<div>
<div><SideBar/></div>
<div><Outlet/></div>
</div>
    </>
  )
}
