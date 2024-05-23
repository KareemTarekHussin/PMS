import React, { useContext, useEffect, useState } from "react";
import Styles from "./Dashboard.module.css";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

interface TaskData {
  toDo: number;
  inProgress: number;
  done: number;
}

interface ActiveUserData {
  activatedEmployeeCount: number;
  deactivatedEmployeeCount: number;
}

export default function Dashboard() {
  const [usersList, setUsersList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);
  const [tasksList, setTasksList] = useState([]);
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const [taskData, setTaskData] = useState<TaskData>({
    toDo: 0,
    inProgress: 0,
    done: 0,
  });

  const [isAciveUser, setActiveUser] = useState<ActiveUserData>({
    activatedEmployeeCount: 0,
    deactivatedEmployeeCount: 0,
  });
  const getUsersList = async () => {
    try {
      let response = await axios.get(`${baseUrl}/Users/manager`, {
        headers: requestHeaders,
      });
      setUsersList(response.data.data);

      console.log("Number try", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
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
  const getTasksList = async () => {
    try {
      let response = await axios.get(`${baseUrl}/Task/manager`, {
        headers: requestHeaders,
      });
      setTasksList(response.data.data);
    } catch (error: any) {}
  };

  const getTaskData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Task/count`, {
        headers: requestHeaders,
      });
      setTaskData(response.data);
    } catch (error: any) {
      console.log(error.response.message);
    }
  };

  const getIsActive = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Users/count`, {
        headers: requestHeaders,
      });
      console.log(response.data);
      setActiveUser(response.data);
    } catch (error: any) {
      console.log(error.response.message);
    }
  };

  const data = {
    lable: ["ToDo", "InProgress", "Done"],
    datasets: [
      {
        label: "My Tasks",
        data: [taskData.toDo, taskData.inProgress, taskData.done],
        backgroundColor: ["#E7C3D7", "#E4E4BC", "#CFD1EC"],
        hoverOffset: 4,
      },
    ],
  };

  const isActive = {
    lable: ["Active", "InActive"],
    datasets: [
      {
        label: "Users",
        data: [
          isAciveUser.activatedEmployeeCount,
          isAciveUser.deactivatedEmployeeCount,
        ],
        backgroundColor: ["#E7C3D7", "#E4E4BC"],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    getUsersList();
    getProjectsList();
    getTasksList();
    getTaskData();
    getIsActive();
  }, []);
  const countUsersByActivation = (users: any) => {
    return users.reduce(
      (counts: any, user: any) => {
        if (user.isActivated) {
          counts.active += 1;
        } else {
          counts.inactive += 1;
        }
        return counts;
      },
      { active: 0, inactive: 0 }
    );
  };
  const { active, inactive } = countUsersByActivation(usersList);
  return (
    <>
      <div
        className={`${Styles.headerContainer} container-fluid p-5 my-5 rounded-4`}
      >
        <div className="row align-items-center my-5">
          <div className="col-md-8 ">
            <div className="content text-white">
              <h1>
                Welcome <span className={`${Styles.textGold}`}>Upskilling</span>
              </h1>
              <h3 className="my-5">
                You can add project and assign tasks to your team lorem
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className={`${Styles.textPadding} container-fluid`}>
        <div className="row  d-flex">
          <div className="col-md-5 bg-white rounded-2 p-3 my-2">
            <b>Tasks</b>
            <p className="text-muted">Lorem ipsum dolor sit amet.</p>
            <div className="d-flex mt-4">
              <div
                className={`${Styles.bgProgress} col-md-3 rounded-4 p-2 mx-3`}
              >
                <div className="p-2">
                  <span className={`${Styles.bgProgressicon} p-2 rounded-3`}>
                    <i className="fa fa-chart-simple"></i>
                  </span>
                  <p className=" mt-3 text-muted"> Progress</p>
                  <p className="my-2">
                    <b>$2271</b>
                  </p>
                </div>
              </div>
              <div className={`${Styles.bgTasks} col-md-3 rounded-4 p-2 mx-3`}>
                <div className="p-2">
                  <span className={`${Styles.bgProjectTaskicon} p-2 rounded-3`}>
                    <i className="fa fa-list-check"></i>
                  </span>
                  <p className=" mt-3 text-muted">Tasks Number</p>
                  <p className="my-2">
                    <b>{tasksList.length}</b>
                  </p>
                </div>
              </div>
              <div
                className={`${Styles.bgProjects} col-md-3 rounded-4 p-2 mx-3`}
              >
                <div className="p-2">
                  <span className={`${Styles.bgProjectNoicon} p-2 rounded-3`}>
                    <i className="fa fa-mobile"></i>
                  </span>
                  <p className=" mt-3 text-muted">Projects Number</p>
                  <p className="my-2">
                    <b>{projectsList.length}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5 bg-white rounded-2 p-3 my-2">
            <b>Users</b>
            <p className="text-muted">Lorem ipsum dolor sit amet.</p>
            <div className="d-flex mt-4">
              <div
                className={`${Styles.bgProgress} col-md-3 rounded-4 p-2 mx-3`}
              >
                <div className="p-2">
                  <span className={`${Styles.bgProgressicon} p-2 rounded-3`}>
                    <i className="fa fa-chart-simple"></i>
                  </span>
                  <p className=" mt-3 text-muted"> Active</p>
                  <p className="my-2">
                    <b>{active}</b>
                  </p>
                </div>
              </div>
              <div className={`${Styles.bgTasks} col-md-3 rounded-4 p-2 mx-3`}>
                <div className="p-2">
                  <span className={`${Styles.bgProjectTaskicon} p-2 rounded-3`}>
                    <i className="fa  fa-list-check"></i>
                  </span>
                  <p className=" mt-3 text-muted">Inactive</p>
                  <p className="my-2">
                    <b>{inactive}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row p-3 justify-content-around">
          <div className="col-md-5 tasks-chart">
            <Pie className="w-50 m-auto" data={data} />
          </div>
          <div className="col-md-5 mx-5">
          <Pie className="w-50 m-auto" data={isActive} />
          </div>
        </div>
      </div>
    </>
  );
}
