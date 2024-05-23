import React, { useContext, useEffect, useState } from "react";
import Styles from "./TasksList.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import NoData from "../../../SharedModule/components/NoData/NoData";
import { useToast } from "../../../Context/ToastContext";

import Loading from "../../../SharedModule/components/Loading/Loading";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function TasksList() {
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const { getToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showListSize, setShowListSize] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState(0);

  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id: number) => {
    setTaskId(id);
    setShowDelete(true);
  };

  const [titleValue, setTitleValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState<number[]>(
    []
  );

  const navigate = useNavigate();

  ////API's
  const onDeleteSubmit = async () => {
    try {
      const response = await axios.delete(
        `${baseUrl}/Task/${taskId}`,

        {
          headers: requestHeaders,
        }
      );

      getToast("success", "Successfully deleted task");

      handleDeleteClose();
      getTasksList("", "", pageSize, 1);
    } catch (error: any) {
      getToast("error", error.response.message);
    }
  };

  //Get ALL Projects API

  const getTasksList = async (
    title: string,
    status: string,
    pageSize: number,
    pageNumber: number
  ) => {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `${baseUrl}/Task/manager/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: requestHeaders,
          params: {
            title,
            status,
          },
        }
      );
      setLoading(false);
      setTotalNumberOfRecords(
        Array(data.totalNumberOfRecords)
          .fill(0)
          .map((_, i) => i + 1)
      );
      setCurrentPage(data.pageNumber);
      setArrayOfPages(
        Array(data.totalNumberOfPages)
          .fill(0)
          .map((_, i) => i + 1)
      );
      setTasksList(data.data);
    } catch (error: any) {
      setLoading(false);
      getToast("error", error.response.data.message);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getTasksList("", "", pageSize, 1);
  }, []);

  const getName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
    getTasksList(e.target.value, statusValue, pageSize, 1);
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusValue(e.target.value);
    getTasksList(titleValue, e.target.value, pageSize, 1);
  };

  const navigateToAddTask = () => {
    navigate("/dashboard/tasksdata");
  };
  return (
    <>
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Body>
          <DeleteData deleteItem={"task"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="listContainer bg-white p-5 rounded-3 ">
          {/* //TODO: implement Search*/}
          <div className="container fuild">
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className={`${Styles.inputGroup}`}>
                  <i className="fa fa-search"></i>

                  <input
                    type="text"
                    className={Styles.searchInput}
                    placeholder="Search By Title"
                    onChange={getName}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className={Styles.filterContianer}>
                  <select onChange={handleSelect}>
                    <option value="">Filter</option>
                    <option value="ToDo">ToDo</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <ul className="list-group mt-3 ">
            <li
              className={`${Styles.backgroundgreen} list-group-item fw-semibold py-3 text-white d-flex justify-content-between align-items-center`}
            >
              <div className="row w-100">
                <div className="col-md-2  text-white">Title</div>
                <div className="col-md-2  text-white">Status</div>
                <div className="col-md-2  text-white">User</div>
                <div className="col-md-2  text-white">Project</div>
                <div className="col-md-2  text-white">Date Created</div>
                <div className="col-md-2  text-white">Actions</div>
              </div>
            </li>

            <>
              {tasksList.length > 0 ? (
                tasksList.map((task: any) => (
                  <li
                    key={task.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="row w-100">
                      <div className="col-md-2">{task.title}</div>
                      <div className="col-md-2">{task.status}</div>
                      <div className="col-md-2">{task.employee?.userName}</div>
                      <div className="col-md-2">{task.project?.title}</div>
                      <div className="col-md-2">
                        {task.creationDate.slice(0, 10)}
                      </div>
                      <div className="col-md-2 bg-body-secondar bg-info-subtl w-fit p-md-0 px-md-3 px-lg- rounded-3 d-flex justify-content-center align-items-center">
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
                              <Link
                                className="dropdown-item"
                                to={`/dashboard/tasksedit/${task.id}`}
                                state={{ taskData: task, type: "edit" }}
                              >
                                <i className="fa fa-edit text-warning mx-2"></i>
                                Edit
                                {/* TODO:implement Update */}
                              </Link>
                            </li>
                            <li>
                              <a
                                onClick={() => handleDeleteShow(task.id)}
                                className="dropdown-item"
                                href="#"
                              >
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
            </>
          </ul>
          <div className={`${Styles.pagination} text-muted`}>
            <span>Showing</span>
            <div className={Styles.contentSize}>
              <div
                className={Styles.pageSize}
                onClick={() => setShowListSize(!showListSize)}
              >
                <span>{pageSize}</span>
                <span>
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </div>
              {showListSize && (
                <div className={`${Styles.listsPage} text-muted`}>
                  {totalNumberOfRecords.map((n) => (
                    <span
                      key={n}
                      onClick={() => {
                        getTasksList(titleValue, statusValue, n, 1);
                        setPageSize(n);
                      }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span>of {totalNumberOfRecords.length} Results</span>

            <div className={Styles.pageNum}>
              <span>
                Page {currentPage} of {arrayOfPages.length}
              </span>
              <div className={Styles.arrows}>
                <span
                  onClick={() => {
                    if (currentPage > 1) {
                      getTasksList(
                        titleValue,
                        statusValue,
                        pageSize,
                        currentPage - 1
                      );
                    }
                  }}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </span>
                <span
                  onClick={() => {
                    if (currentPage < arrayOfPages.length) {
                      getTasksList(
                        titleValue,
                        statusValue,
                        pageSize,
                        currentPage + 1
                      );
                    }
                  }}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
