import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Style from './sidebar.module.css'
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { FieldError } from 'react-hook-form';

export default function SideBar() {

  const [placeholder, setPlaceholder] = useState('Enter your old password');
  const [placeholderr, setPlaceholderr] = useState('Enter your old password');
  const [placeholderrr, setPlaceholderrr] = useState('Enter your old password');

  let { register, handleSubmit, formState: { errors }, watch  } = useForm();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPassword, setShowPassword] = useState(true)
  let togglePassword = () => {
    setShowPassword(!showPassword);
  }


  let [isCollapse, setIsCollapse] = useState(true);
  const handleCollapse = () => {
    setIsCollapse(!isCollapse)
  }

  const onSubmit = async (data: any) => {
    try{
      
      // let response = await axios.put('https://upskilling-egypt.com:3003/api/v1/Users/ChangePassword', data,
      //   {
      //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      //   });
      // console.log(response);
      // toast.success(response.data.message, {
      //   position: "bottom-right",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      //   transition: Bounce,
      // });
      
      console.log(data);
      
    }
    catch(error){
      console.log(error);
      
    }
  }
  
  return (
    <>
      <div className='sidebar-container'>
        <Sidebar collapsed={isCollapse}>
          <Menu className='my-5'>

            <MenuItem
              onClick={handleCollapse}
              icon={<i className="fa-solid fa-arrow-right-arrow-left"></i>}
            >
            </MenuItem>
            
            <MenuItem 
              className='mt-4'
              component={<Link to="" />} 
              icon={<i className="fa-solid fa-house"></i>}
            >
              Dashboard
            </MenuItem>

            <MenuItem 
              component={<Link to="projects" />} 
              icon={<i className="fa-solid fa-users"></i>}
            >
              Users
            </MenuItem>

            <MenuItem 
              onClick={handleShow}
              component={<Link to="projects" />} 
              icon={<i className="fa-solid fa-unlock"></i>}
            >
              Change Password
            </MenuItem>

          </Menu>
        </Sidebar>

        <Modal className='pt-4' show={show} onHide={handleClose}>
  
          <Modal.Body className='form-container p-5 bg-main rounded-2'>
            <p className='text-white pt-md-3'>welcome to APP</p>
            <h3 className='fw-bold mb-5 text-main position-relative'>Change Password</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column gap-3'>

              <div>
                <div className={`mb- ${Style.inputContainer} ${errors.oldPassword && Style.inputError}`}>
                  <label htmlFor="oldpass" className="me-1">
                      Old Password
                  </label>
                  <div className="d-flex align-items-end">
                      <input 
                          type={showPassword ? 'text' : 'password'} 
                          className={`text-white flex-grow-1 pb-2 bg-transparent border-0 `}
                          placeholder={placeholder}
                          id="oldpass"
                          {...register('oldPassword', {
                              required: '* Old Password is required',
                              pattern: {
                                  value: /.{3,}/,
                                  message:'* Invalid Password'
                              }
                          })}
                          onFocus={() => setPlaceholder('')}
                          onBlur={() => setPlaceholder('Enter your old password')}
                      />
                      <span
                          onClick={togglePassword}
                          className={`text-white bg-inf ${Style.icon}`}>
                          {showPassword ?
                              <i className="fa-regular fa-eye"></i> :
                              <i className="fa-regular fa-eye-slash"></i>
                            }
                      </span>
                  </div>
                </div>
                {errors.oldPassword && <p className='text-warning mt-1'>{(errors.oldPassword as FieldError).message}</p>}
                {/* {errors.oldPassword && <p className='text-warning'>{errors.oldPassword.message}</p>} */}
              </div>

              <div>
                <div className={`mb- ${Style.inputContainer} ${errors.newPassword && Style.inputError}`}>
                  <label htmlFor="new" className="me-1">
                      New Password
                  </label>
                  <div className="d-flex align-items-end">
                      <input 
                          type={showPassword ? 'text' : 'password'} 
                          className={`text-white flex-grow-1 pb-2 bg-transparent border-0 `}
                          placeholder={placeholderr}
                          id="new"
                          {...register('newPassword', {
                              required: '* New Password is required',
                              pattern: {
                                  value: /.{3,}/,
                                  message:'* Invalid Password'
                              }
                          })}
                          onFocus={() => setPlaceholderr('')}
                          onBlur={() => setPlaceholderr('Enter your old password')}
                      />
                      <span
                          onClick={togglePassword}
                          className={`text-white bg-inf ${Style.icon}`}>
                          {showPassword ?
                              <i className="fa-regular fa-eye"></i> :
                              <i className="fa-regular fa-eye-slash"></i>
                            }
                      </span>
                  </div>
                </div>
                {errors.newPassword && <p className='text-warning mt-1'>{(errors.newPassword as FieldError).message}</p>}
                {/* {errors.oldPassword && <p className='text-warning'>{errors.newPassword.message}</p>} */}
              </div>

              <div>
                <div className={`mb- ${Style.inputContainer} ${errors.confirmNewPassword && Style.inputError}`}>
                  <label htmlFor="confirm" className="me-1">
                      Confirm New Password
                  </label>
                  <div className="d-flex align-items-end">
                      <input 
                          type={showPassword ? 'text' : 'password'} 
                          className={`text-white flex-grow-1 pb-2 bg-transparent border-0 `}
                          placeholder={placeholderrr}
                          id="confirm"
                          {...register('confirmNewPassword', {
                              required: '* Please confirm your password',
                              validate: (value) =>
                                value === watch('newPassword') ||
                                "* Password isn't a match"
                          })}
                          onFocus={() => setPlaceholderrr('')}
                          onBlur={() => setPlaceholderrr('Enter your old password')}
                      />
                      <span
                          onClick={togglePassword}
                          className={`text-white bg-inf ${Style.icon}`}>
                          {showPassword ?
                              <i className="fa-regular fa-eye"></i> :
                              <i className="fa-regular fa-eye-slash"></i>
                            }
                      </span>
                  </div>
                </div>
                {/* {errors.confirmNewPassword && <p className='text-warning'>{errors.confirmNewPassword.message}</p>} */}
                {errors.confirmNewPassword && <p className='text-warning mt-1'>{(errors.confirmNewPassword as FieldError).message}</p>}

              </div>



              <div className='mt-3 pb-md-3'>
                <button className="btn btn-warning w-100 mt-5">Save</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        
      </div>
    </>
  )
}
