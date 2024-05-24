import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import Styles from "./TasksData.module.css"
import { useToast } from "../../../Context/ToastContext";
export default function TasksData() {
  
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const [projectsList, setProjectsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const { getToast } = useToast();

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

      getToast("success", "Successfully created task");
      navigate("/dashboard/tasks");
    } catch (error:any) {
      getToast('error', error.response.message);
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
      <div className="add-headers rounded-3 my-5 bg-white p-4 shadow-lg">
        <span>
          <i onClick={navigatetoTasks} className="fa fa-chevron-left me-2"></i>
          <span>View all Tasks</span>
        </span>

        <h3 className="mt-4">Add a New Task</h3>
      </div>


      <div className="containe">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9">
            <div className="bg-inf">
      <div className="formContainer container m-auto bg-white p-4 p-lg-5 rounded-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h5 className="text-muted">Title</h5>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control p-2 rounded-3"
              placeholder="Title"
              {...register("title")}
            />
          </div>

          <h5 className=" text-muted">Description</h5>
          <textarea
            rows={4}
            className="form-control rounded-3"
            placeholder="Description"
            {...register("description")}
          >
           
          </textarea>

          <div className="row my-3 gap-4 gap-md-0">
            <div className="col-md-6">
              <h5 className="text-muted">User</h5>
              <select 
                className="form-control rounded-3 p-2" 
                {...register("employeeId")}
                defaultValue=""
                >
              <option value="" disabled>
                Select user
              </option>
              {usersList.map((user:any)=> <option value={user.id}>{user.userName}</option>)}
               
              </select>
            </div>
            <div className="col-md-6">
              <h5 className="text-muted">Project</h5>
              <select 
                className="form-control rounded-3 p-2" 
                {...register("projectId")}
                defaultValue=""
                >
                <option value="" className="text-danger" disabled>
                  Select project
                </option>
                {projectsList.map((project:any)=> <option value={project.id}>{project.title}</option>)}
               
              </select>
            </div>
          </div>

          <div className="d-flex justify-content-between my-5">
            <button onClick={navigatetoTasks} className="white-btn rounded-pill px-4">
              Cancel
            </button>
            <button type="submit" className='orange-btn rounded-pill px-4 py-2'>
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
