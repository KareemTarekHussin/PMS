
import logo from '../../../../Modules/../assets/images/PMS 3.svg'
// import { TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ResetPass() {
  let  navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =  async (data :any) => {
    console.log(data)
    try {
      let response = await axios.post("https://upskilling-egypt.com:3003/api/v1/Users/Reset",data)
          toast.success('password rest successfu')
      console.log(response)
      navigate('/login')
    }
       catch (error) {
      toast.error(error.response.data.message)

    }

  }
  return (
    <div className='auth-container'>
      <div className='container-fluid'>
        <div className="row d-flex vh-100 justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="forgot text-center mb-4">
              <img src={logo} alt="logo" className='w-25' />
            </div>

            <form action="#" onSubmit={handleSubmit(onSubmit)} className='form-auth vh-25' style={{ padding: "30px 30px" }}>
              <span className='welcome-pms'>welcome to PMS</span>
              <h1 className='auth-title'>Reset  Password</h1>
              <div className='auth-standard-basic'>
                <span className='e-mail'>E-mail</span> <br />
                <TextField className='mb-4 w-75' id="standard-basic" label="Enter your E-mail" variant="standard"
                  type="text"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invlid mail"
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="alert alert-danger">{errors.email.message} </p>
              )}
              <div className='auth-standard-basic'>
                <span className='e-mail'>OTP Verification</span> <br />
                <TextField className='mb-4 w-75' id="standard-basic" label="Enter Verification" variant="standard"
                  type="text"
                 {...register("seed", {
                    required: "OTP is required",
                    pattern: {
                      message: "Invlid password"
                    }
                  })}
                />
              </div>
              {errors.seed && (
                <p className="alert alert-danger">{errors.seed.message} </p>
              )}
              <div className='auth-standard-basic'>
                <span className='e-mail'>New Password</span> <br />
                <TextField className='mb-4 w-75' id="standard-basic" label="Enter your New Password" variant="standard"
                  type="password"
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      message: "Invlid password"
                    }
                  })}
                />
              </div>
              {errors.password && (
                <p className="alert alert-danger">{errors.password.message} </p>
              )}
              <div className='auth-standard-basic'>
                <span className='e-mail'>confirm Password</span> <br />
                <TextField className='mb-4 w-75' id="standard-basic" label="Confirm New Password" variant="standard"
                  type="password"
                  {...register("confirmPassword", {
                    required: "confirmPassword is required",
                    pattern: {
                      message: "Invlid confirmPassword"
                    }
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="alert alert-danger">{errors.confirmPassword.message} </p>
              )}

              <div className='text-center mt-5'>
                <button className="btn btn-warning verify">Save</button>
              </div>












              {/* <span className='e-mail'>OTP Verification</span> <br />
              <div className='auth-standard-basic'>
                <TextField className='mb-4 w-75' id="standard-basic" label="Enter Verification" variant="standard" />
              </div>
              <span className='e-mail'>New Password</span> <br />
              <div className='auth-standard-basic'>
                <TextField className='mb-4 w-75' id="standard-basic" type='password' label="Enter your New Password" variant="standard" />
              </div>
              <span className='e-mail'>Confirm Password</span> <br />
              <div className='auth-standard-basic'>
                <TextField className='mb-4 w-75' id="standard-basic" type='password' label="Confirm New Password" variant="standard" />
              </div>
              <div className='text-center mt-5'>
                <button className="btn btn-warning verify">Verify</button>
              </div> */}

            </form>
          </div>
        </div>

      </div>



    </div>
  )
}
