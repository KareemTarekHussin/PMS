import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
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
      <div className="compTitle  my-5 bg-white p-4 shadow-md">
        <button className="btn" onClick={navigatetoTasks}>
        <span>
          <i  className="fa fa-chevron-left"></i>
          View all Tasks
        </span></button>

        <h2 className="mt-4">Add a New Task</h2>
      </div>
      <div className={`${Styles.formContainer} bg-white p-5 rounded-4`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h6>Title</h6>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
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

          <h6>Description</h6>
          <textarea
            rows={4}
            className="form-control"
            placeholder="Description"
            defaultValue={state ? taskData?.title : null}
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <div className="p-1 alert alert-danger">
              {errors.description.message}
            </div>
          )}
          <div className="row my-3">
            <div className="col-md-6">
              <h6 className="text-muted">User</h6>

              <select
                className="form-control rounded-4 p-3"
                {...register("employeeId", {
                  required: "User is required",
                })}
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              >
                <option value="">select</option>
                {usersList.map((user: any) => (
                  <option value={user.id}>{user.userName}</option>
                ))}
              </select>
              {errors.employeeId && (
                <div className="p-1 alert alert-danger">
                  {errors.employeeId.message}
                </div>
              )}
            </div>
            <div className="col-md-6">
              <h6>Project</h6>
              <select
                className="form-control rounded-4 p-3"
                {...register("projectId", {
                  required: "Project is required",
                })}
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                <option value="">select</option>
                {projectsList.map((project: any) => (
                  <option value={project.id}>{project.title}</option>
                ))}
              </select>
              {errors.projectId && (
                <div className="p-1 alert alert-danger">
                  {errors.projectId.message}
                </div>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-between my-4">
            <button
              onClick={navigatetoTasks}
              className="btn bg-light px-4 py-2 rounded-5 text-black border-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${Styles.btnOrangeColor} btn  px-4 py-2 rounded-5  text-white`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
