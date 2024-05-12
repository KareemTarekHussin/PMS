import React, { useRef, useState } from "react";
import logo from "../../../../assets/images/PMS 3.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import profileImg from "../../../../assets/8550fbcbe60cd242d12760784feff287.jpeg";
export default function Register() {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("profileImage", data.profileImage[0]);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    return formData;
  };
  const onSubmit = async (data) => {
    try {
      const registerFormData = appendToFormData(data);

      const response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Register",
        registerFormData
      );
      console.log(response);

      navigate("/verify");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="auth-container p-5 ">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center  ">
            <div className="col-md-9 ">
              <div className="text-center">
                <img className="" src={logo} alt="" />
              </div>
              <div className="bg-form-container p-4 px-5 pt-5">
                <h6 className="text-white">welcome to PMS</h6>
                <h2 className="text-gold">
                  <span className="text-decoration-underline">C</span>reate New
                  Account
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row py-3">
                    <div className="text-center">
                      <label htmlFor="file">
                        <img
                          className="profileImg"
                          src={profileImg}
                          alt="profileImg"
                        />

                        <i className="fa fa-camera position-absolute text-gold profile-icon"></i>
                      </label>
                      <input
                        type="file"
                        className="file"
                        id="file"
                        {...register("profileImage", {
                          required: "profileImage is required",
                        })}
                      />
                    </div>
                    {errors.profileImage && (
                      <p className="alert alert-danger p-0">
                        {errors.profileImage.message}
                      </p>
                    )}
                    <div className="col-md-6">
                      <label className="text-gold">Username</label>
                      <div>
                        <input
                          type="text"
                          className="input p-1 w-100 text-white"
                          placeholder="Enter your name"
                          {...register("userName", {
                            required: "Username is required",
                          })}
                        />
                      </div>
                      {errors.userName && (
                        <p className="alert alert-danger p-0">
                          {errors.userName.message}
                        </p>
                      )}
                    </div>
                    <div className="col md-6">
                      <label className="text-gold">E-mail</label>
                      <div>
                        <input
                          type="text"
                          className="input p-1 text-white w-100"
                          placeholder="Enter your email"
                          {...register("email", {
                            required: "email is required",
                          })}
                        />
                      </div>
                      {errors.email && (
                        <p className="alert alert-danger p-0">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="text-gold">Country</label>
                      <div>
                        <input
                          type="text"
                          className="input p-1 text-white w-100"
                          placeholder="Enter your Country"
                          {...register("country", {
                            required: "country is required",
                          })}
                        />
                      </div>
                      {errors.country && (
                        <p className="alert alert-danger p-0">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                    <div className="col md-6">
                      <label className="text-gold">Phone Number</label>
                      <div>
                        <input
                          type="number"
                          className="input p-1 text-white w-100"
                          placeholder="Enter your Phone Number"
                          {...register("phoneNumber", {
                            required: "phoneNumber is required",
                          })}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="alert alert-danger p-0">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="text-gold">Password</label>
                      <div>
                        <input
                          type={visible ? "text" : "password"}
                          className="input p-1  text-white w-100 z-0"
                          placeholder="Enter your Password"
                          {...register("password", {
                            required: "password is required",
                          })}
                        />
                        <span
                          onClick={() => setVisible(!visible)}
                          className="pass-eye text-white px-5 position-absolute d-inline-block "
                        >
                          {visible ? (
                            <i className="fa-regular fa-eye  "></i>
                          ) : (
                            <i className="fa-regular fa-eye-slash "></i>
                          )}
                        </span>
                      </div>
                      {errors.password && (
                        <p className="alert alert-danger p-0">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="col md-6">
                      <label className="text-gold">Confirm Password</label>
                      <div>
                        <input
                          type={visible ? "text" : "password"}
                          className="input p-1 text-white w-100"
                          placeholder="Confirm New Password"
                          {...register("confirmPassword", {
                            required: "confirm Password is required",
                            validate: (value) =>
                              value === password.current ||
                              "The passwords do not match",
                          })}
                        />
                        <span
                          onClick={() => setVisible(!visible)}
                          className="pass-eye2 text-white px-3  position-absolute d-inline-block "
                        >
                          {visible ? (
                            <i className="fa-regular fa-eye  "></i>
                          ) : (
                            <i className="fa-regular fa-eye-slash "></i>
                          )}
                        </span>
                      </div>
                      {errors.confirmPassword && (
                        <p className="alert alert-danger p-0">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-gold px-5 w-50">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
