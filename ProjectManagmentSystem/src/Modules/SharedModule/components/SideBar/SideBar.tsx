import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export default function SideBar() {


  let [isCollapse, setIsCollapse] = useState(true);
  const handleCollapse = () => {
    setIsCollapse(!isCollapse)
  }

  
  return (
    <>
      <div className='sidebar-container'>
        <Sidebar collapsed={isCollapse}>
          <Menu className='my-5'>
            <MenuItem
              onClick={handleCollapse}
              icon={<i className="fa-solid fa-arrow-right-arrow-left"></i>}></MenuItem>
            <MenuItem 
              className='mt-4'
              component={<Link to="" />} 
              icon={<i className="fa-solid fa-house"></i>}>
            </MenuItem>
            <MenuItem 
              component={<Link to="projects" />} 
              icon={<i className="fa-solid fa-users"></i>}>
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  )
}
