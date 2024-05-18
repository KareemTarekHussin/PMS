import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import logo from "../../../../assets/images/PMS 3.png"
export default function VerifyAccount() {
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data:any) => {
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
    
  </>
  )
}
