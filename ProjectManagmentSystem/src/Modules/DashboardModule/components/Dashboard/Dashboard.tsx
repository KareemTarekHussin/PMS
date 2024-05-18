import React from 'react'
import Styles from "./Dashboard.module.css"
import HeaderImg from "../../../../assets/images/header-bg-svg.svg"

export default function Dashboard() {
  return (<>
    <div className={`${Styles.headerContainer} container-fluid p-5 my-5 rounded-4`}>
      <div className="row align-items-center my-5">
        <div className="col-md-8 ">
          <div className="content text-white">
            <h1>Welcome <span className={`${Styles.textGold}`}>Upskilling</span></h1>
            <h3 className='my-5'>You can add project and assign tasks to your team lorem</h3>
          </div>
        </div>
       
      </div>
    </div>
    <div className='container-fluid '>
<div className="row mx-2">

  <div className="col-md-5 bg-white rounded-2 p-3">
    <b>Tasks</b>
    <p className='text-muted'>Lorem ipsum dolor sit amet.</p>
    <div className="d-flex">
  <div className="col-md-3">kareem</div>  
  
  <div className="col-md-3">
    kareem
  </div>
  <div className="col-md-3">
    kareem
  </div>
  </div>
    </div>

  <div className="col-md-6 bg-white rounded-2 p-3 mx-5">
  <b>Users</b>
  <p className='text-muted'>Lorem ipsum dolor sit amet.</p>
  <div className="d-flex">
  <div className={`${Styles.bgProgress} col-md-3 rounded-3 p-2 mx-3`}>
    <div className='p-2'>
     <span  className={`${Styles.bgProgressicon} p-2 rounded-4`}><i className="fa fa-chart-simple"></i></span> 
     <p> Active</p>
      <p><b>Number77$</b></p>
      </div>
    </div>  
  <div className={`${Styles.bgProgress} col-md-3 rounded-3 p-2 mx-3`}>
    <div className='p-2'>
     <span  className={`${Styles.bgProgressicon} p-2 rounded-4`}><i className="fa fa-chart-simple"></i></span> 
     <p>Active</p>
      <p><b>Number77$</b></p>
      </div>
    </div>  
  <div className={`${Styles.bgProgress} col-md-3 rounded-3 p-2 mx-3`}>
    <div className='p-2'>
     <span  className={`${Styles.bgProgressicon} p-2 rounded-4`}><i className="fa fa-chart-simple"></i></span> 
     <p> Active</p>
      <p><b>Number77$</b></p>
      </div>
    </div>  
  
 
  </div>
  </div>
</div>
</div>
    </>
  )
}
