import React, { useContext, useEffect, useState } from 'react'
import Styles from "./TasksList.module.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import NoData from '../../../SharedModule/components/NoData/NoData';

export default function TasksList() {
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const [tasksList, setTasksList] = useState([]);

  const navigate = useNavigate();

  ////API's

//Get ALL Projects API

const getTasksList = async () => {
  try {
    let response = await axios.get(`${baseUrl}/Task/manager`, {
      headers: requestHeaders,
    });
    setTasksList(response.data.data);
    console.log(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  getTasksList();
}, []);

const navigateToAddTask = () => {
  navigate("/dashboard/tasksdata");
};
  return (
    <>
      <div className="w-100 compTitle d-flex justify-content-between my-5 bg-white p-4">
        <h2>Tasks</h2>
        <div>
          <button
            className={`${Styles.btnOrangeColor} text-white btn rounded-5 p-3`}
            onClick={navigateToAddTask}
          >
            <i className="fa fa-plus"></i>
            Add New Task
          </button>
        </div>
      </div>
      <div className="listContainer bg-white p-5 rounded-3 ">
        {/* //TODO: implement Search*/}
        <div className="col-md-2">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search By Title"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        
        <ul className="list-group mt-3 ">
            <li className={`${Styles.backgroundgreen} list-group-item fw-semibold py-3 text-white d-flex justify-content-between align-items-center`}>
              <div className="row w-100">
                <div className="col-md-2  text-white">Title</div>
                <div className="col-md-2  text-white">Status</div>
                <div className="col-md-2  text-white">User</div>
                <div className="col-md-2  text-white">Project</div>
                <div className="col-md-2  text-white">Date Created</div>
                <div className="col-md-2  text-white">Actions</div>
              </div>
          </li>
          {tasksList.length > 0 ? (
              tasksList.map((task: any) => (
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="row w-100">
                  <div className="col-md-2">{task.title}</div>
                  <div className="col-md-2">{task.status}</div>
                  <div className="col-md-2">{task.employee?.userName}</div>
                  <div className="col-md-2">{task.project?.title}</div>
                  <div className="col-md-2">{task.creationDate.slice(0, 10)}</div>
                  <div className='col-md-2 bg-body-secondar bg-info-subtl w-fit p-md-0 px-md-3 px-lg- rounded-3 d-flex justify-content-center align-items-center'>
                    <div className="dropdown">
                      <button
                        className="btn"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                      <i className="fa fa-ellipsis-vertical"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="fa fa-eye text-info mx-2"></i>
                            View
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                         
                            <i className="fa fa-edit text-warning mx-2"></i>
                            Edit
                            {/* TODO:implement Update */}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <i className="fa fa-trash text-danger mx-2"></i>
                            Delete{/* TODO:implement Delete */}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item">
              <NoData />
            </li>
          )}
        </ul>
        {/* TODO:implement Pagination */}
      </div>
    </>
  )
}
