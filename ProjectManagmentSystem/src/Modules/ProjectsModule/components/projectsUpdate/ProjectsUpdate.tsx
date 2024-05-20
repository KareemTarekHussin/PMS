import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import Styles from "../ProjectsList/ProjectsList.module.css"
import { useParams } from "react-router-dom";


export default function ProjectsUpdate() {
  const { id } = useParams()
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const [value, setValue] = useState({
    id: id,
    title: '',
    description: ''

  })
  console.log(id)

  const getProjectsList = async () => {
    try {
      let response = await axios.get(`${baseUrl}/Project/${id}`, {
        headers: requestHeaders,
      });
      console.log(response);
      setValue({ ...value, title: response.data.title, description: response.data.description })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectsList()
  }, []);


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
  const onSubmit = async () => {

    try {
      let response = await axios.put(`${baseUrl}/Project/${id}/`, value, {
        headers: requestHeaders,
      });

      console.log(response);
      navigate("/dashboard/projects")
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <>
      <div className="compTitle  my-5 bg-white p-4 shadow-lg">
        <span>
          <i onClick={navigatetoProjects} className="fa fa-chevron-left"></i>
          View all Projects
        </span>

        <h2 className="mt-4">Update Project</h2>
      </div>
      <div className="formContainer w-75 m-auto bg-white p-5 rounded-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4>Title</h4>
          <div className="input-group mb-3">
            <input
              type="text"
              value={value.title}
              className="form-control"
              placeholder="Title"
              {...register("title", {
                required: "title is required",
                pattern: {
                  message: "Invlid title"
                }
              })}
              onChange={e => setValue({ ...value, title: e.target.value })}

            />
          </div>
          {errors.title && (
            <p className="alert alert-danger">{errors.title.message} </p>
          )}

          <h4>Description</h4>
          <textarea
            rows={4}

            value={value.description}
            className="form-control"
            placeholder="Description"
            {...register("description", {
              required: "description is required",
              pattern: {
                message: "Invlid description"
              }
            })}
            onChange={e => setValue({ ...value, description: e.target.value })}
          >
          </textarea>
          {errors.description && (
            <p className="alert alert-danger">{errors.description.message} </p>
          )}

          <div className="d-flex justify-content-between my-4">
            <button onClick={navigatetoProjects} className="btn bg-light rounded-pill p-4 text-black border-black">
              Cancel
            </button>
            <button type="submit" className={`${Styles.btnOrangeColor} btn rounded-pill p-4 text-white`}>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
