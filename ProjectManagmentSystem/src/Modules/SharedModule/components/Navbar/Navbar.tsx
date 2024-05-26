import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import navLogo from "../../../../assets/images/nav-logo.png";
import navImg from "../../../../assets/images/8550fbcbe60cd242d12760784feff287.jpeg";
import navStyle from "./Navbar.module.css";
import { AuthContext } from '../../../Context/AuthContext';

export default function CustomNavbar() {
  const { loginUser }: any = useContext(AuthContext);

  return (
    <>
      <Navbar expand="md" className="bg-white p-0 fixed-top shadow-sm">
      <Container>
        <Navbar.Brand href="#home">
            <img src={navLogo} className='w-na bg-dange' alt="" />
        </Navbar.Brand>
          
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
        <Navbar.Collapse id="basic-navbar-nav" className='bg-dange'>
          <Nav className="text-center ms-md-auto d-flex gap-md-4 bg-blac py-3 py-md-0">
              
            <Nav.Link className='d-none d-md-flex d-flex align-items-center justify-content-center justify-content-lg-start p-3 p-md-0 mb-3 mb-md-0 me-md- rounded-4'>
                
              <i className={`fa-solid fa-bell ${navStyle.mainColor}`}></i>

            </Nav.Link>
            
            <div className="line border border-1"></div>

            <Nav.Link className='p-3 p-md-0 d-flex  rounded-4 justify-content-center align-items-center gap-4 gap-md-3'>

              <div className='d-md-none'>
                  <i className={`fa-solid fa-bell ${navStyle.mainColor}`}></i>
              </div>

              <div className={`overflow-hidden rounded-circle ${navStyle.navImg}`}>
                  <img src={navImg} className='w-100' alt="" />
              </div>

              <div className='bg-inf '>
                {/* TODO:change login data to user kareem*/}
                <p className={`${navStyle.fs} text-start text-black fw-semibold`}>{loginUser.userName}</p>
                <p className={`${navStyle.fs} text-muted fst-italic`}>upskilling.eg1@gmail.com</p>
              </div>

              <div>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
          
      </Container>
      </Navbar>
    </>
  )
}
