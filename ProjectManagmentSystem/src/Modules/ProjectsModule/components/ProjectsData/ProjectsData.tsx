import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import Styles from "./ProjectsData.module.css"
import { useToast } from "../../../Context/ToastContext";
export default function ProjectsData() {
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const {getToast} = useToast()

  const navigate = useNavigate();

  const navigatetoProjects = () => {
    navigate("/dashboard/projects");
  };

  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

////API's

//SubmitProjectAPI
  const onSubmit = async (data: any) => {
    try {
      let response = await axios.post(`${baseUrl}/Project`, data, {
        headers: requestHeaders,
      });

      getToast("success", "Successfully created project");
      navigate("/dashboard/projects")
    } catch (error:any) {
      getToast("error", error.response.message);
    }
  };

  
  return (
    <>
      <div className="compTitle  my-5 bg-white p-4 shadow-lg">
        <span>
          <i onClick={navigatetoProjects} className="fa fa-chevron-left"></i>
          View all Projects
        </span>

        <h2 className="mt-4">Add a New Project</h2>
      </div>
      <div className="formContainer w-75 m-auto bg-white p-5 rounded-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4>Title</h4>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              {...register("title")}
            />
          </div>

          <h4>Description</h4>
          <textarea
            rows={4}
            className="form-control"
            placeholder="Description"
            {...register("description")}
          >
          
          </textarea>

          <div className="d-flex justify-content-between my-4">
            <button onClick={navigatetoProjects} className="btn bg-light rounded-pill p-4 text-black border-black">
              Cancel
            </button>
            <button type="submit" className={`${Styles.btnOrangeColor} btn rounded-pill p-4 text-white`}>
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
