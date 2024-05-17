import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import Styles from "./TasksData.module.css"
export default function TasksData() {
  
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const [projectsList, setProjectsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const navigate = useNavigate();

  const navigatetoTasks = () => {
    navigate("/dashboard/tasks");
  };

  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  /////////////API's

  //SubmitProjectAPI for Task
  const onSubmit = async (data: any) => {
    try {
      let response = await axios.post(`${baseUrl}/Task`, data, {
        headers: requestHeaders,
      });

      console.log(response.data);
      navigate("/dashboard/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  //Get ALL Projects API
  const getProjectsList = async () => {
    try {
      let response = await axios.get(`${baseUrl}/Project/manager`, {
        headers: requestHeaders,
      });
      setProjectsList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //Get ALL Users API
  const getUsersList = async () => {
    try {
      let response = await axios.get(`${baseUrl}/Users/manager`, {
        headers: requestHeaders,
      });
      setUsersList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    getProjectsList();
    getUsersList();
  }, []);
  return (
    <>
      <div className="compTitle  my-5 bg-white p-4 shadow-lg">
        <span>
          <i onClick={navigatetoTasks} className="fa fa-chevron-left"></i>
          View all Tasks
        </span>

        <h2 className="mt-4">Add a New Task</h2>
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
          <div className="row my-3">
            <div className="col-md-6">
              <h4 className="text-muted">User</h4>
              <select className="form-control rounded-4 p-3" {...register("employeeId")}>
              {usersList.map((user:any)=> <option value={user.id}>{user.userName}</option>)}
               
              </select>
            </div>
            <div className="col-md-6">
              <h4>Project</h4>
              <select className="form-control rounded-4 p-3" {...register("projectId")}>
                {projectsList.map((project:any)=> <option value={project.id}>{project.title}</option>)}
               
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between my-4">
            <button onClick={navigatetoTasks} className="btn bg-light rounded-pill p-4 text-black border-black">
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
