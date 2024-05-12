import React from "react";
import logo from "../../../../assets/images/PMS 3.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function VerifyAccount() {
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        "https://upskilling-egypt.com:3003/api/v1/Users/verify",
        data
      );
      console.log(response);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="auth-container p-5 vh-100">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center  ">
            <div className="col-md-5 my-5 ">
              <div className="text-center">
                <img className="" src={logo} alt="" />
              </div>
              <div className="bg-form-container p-4 px-5 pt-5">
                <h6 className="text-white">welcome to PMS</h6>
                <h2 className="text-gold">
                  <span className="text-decoration-underline">V</span>erify
                  Account
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                  <div className="col md-6">
                    <label className="text-gold">OTP Verification</label>
                    <div>
                      <input
                        type="text"
                        className="input p-1 text-white w-100"
                        placeholder="Enter Verification"
                        {...register("code", {
                          required: "code is required",
                        })}
                      />
                    </div>
                    {errors.code && (
                      <p className="alert alert-danger p-0">
                        {errors.code.message}
                      </p>
                    )}
                  </div>
                  <div className="text-center">
                    <button className="btn btn-gold px-5 w-100 my-3">
                      Save
                    </button>
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
