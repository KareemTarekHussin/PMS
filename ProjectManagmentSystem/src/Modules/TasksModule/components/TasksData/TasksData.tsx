import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import Styles from "./TasksData.module.css";
import { useToast } from "../../../Context/ToastContext";

export default function TasksData() {
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const { getToast } = useToast();

  const [projectsList, setProjectsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
 

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state?.type === "edit";
  const taskData = location.state?.taskData;

  const navigatetoTasks = () => {
    navigate("/dashboard/tasks");
  };
  type Inputs = {
    title: string;
    description: string;
    employeeId: string;
    projectId: string;
  };
  let {
    register,
    handleSubmit,
    formState: { errors },
   
  } = useForm<Inputs>();

  /////////////API's

  //SubmitProjectAPI for Task
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      let response = await axios({
        method: state ? "put" : "post",
        url: state ? `${baseUrl}/Task/${taskData.id}` : `${baseUrl}/Task`,
        data,
        headers: requestHeaders,
      });
      console.log(response);
      getToast("success", state ? "success edit" : "success create");
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectsList();
    getUsersList();

    if (state && taskData) {
      setProjectId(taskData.project.id);
      setEmployeeId(taskData.employee.id);
    }
  }, []);

  return (
    <>
      <div className="add-headers rounded-3 my-5 bg-white p-4 shadow-lg">
        <span>
          <Link to='/dashboard/tasks'>
            <i className="fa fa-chevron-left me-2 text-black"></i>
          </Link>
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
              defaultValue={state ? taskData?.title : null}
              {...register("title", {
                required: "title is required",
              })}
            />
          </div>
          {errors.title && (
            <div className="p-1 alert alert-danger">{errors.title.message}</div>
          )}

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
              {errors.employeeId && (
                <div className="p-1 alert alert-danger">
                  {errors.employeeId.message}
                </div>
              )}
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
              {errors.projectId && (
                <div className="p-1 alert alert-danger">
                  {errors.projectId.message}
                </div>
              )}
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
