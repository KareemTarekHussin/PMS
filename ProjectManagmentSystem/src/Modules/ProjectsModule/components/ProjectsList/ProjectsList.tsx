import React, { useContext, useEffect, useState } from "react";
import Styles from "./ProjectsList.module.css";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import NoData from "../../../SharedModule/components/NoData/NoData";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteData from "./../../../SharedModule/components/DeleteData/DeleteData";
import { useToast } from "../../../Context/ToastContext";
import Loading from "../../../SharedModule/components/Loading/Loading";
import { ProjectInterface } from "../../../../Interfaces/Interface";
export default function ProjectsList() {
  const { requestHeaders, baseUrl,loginUser }: any = useContext(AuthContext);
  const { getToast } = useToast();
  const [projectsList, setProjectsList] = useState([]);
  const [ProjectId, setProjectId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showListSize, setShowListSize] = useState(false);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState<number[]>(
    []
  );
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id: number) => {
    setProjectId(id);
    setShowDelete(true);
  };
  const navigate = useNavigate();

  ////API's

  //Get ALL Projects API
  const getProjectsList = async ( title: string,
    status: string,
    pageSize: number,
    pageNumber: number) => {
      let dataUrl="";
      if(loginUser?.userGroup=='Manager'){
        dataUrl=`${baseUrl}/project/manager/?pageSize=${pageSize}&pageNumber=${pageNumber}`
      }
    else{dataUrl=`${baseUrl}/project/employee/?pageSize=${pageSize}&pageNumber=${pageNumber}`}


    try {
      let {data} = await axios.get(dataUrl,
      {
        headers: requestHeaders,
        params: {
          title,
          status,
        },
      });
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
      setProjectsList(data.data);

      // console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getProjectsList("", "", pageSize, 1);
  }, []);

  const getName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
    getProjectsList(e.target.value, statusValue, pageSize, 1);
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusValue(e.target.value);
    getProjectsList(titleValue, e.target.value, pageSize, 1);
  };

  //Delete Project API
  const onDeleteSubmit = async () => {
    try {
      const response = await axios.delete(
        `${baseUrl}/Project/${ProjectId}`,

        {
          headers: requestHeaders,
        }
      );

      getToast("success", "Successfully deleted project");

      handleDeleteClose();
      getProjectsList("", "", pageSize, 1);
    } catch (error:any) {
      getToast("error", error.response.message);
    }
  };
  //update Project API

  const navigateToAdd = () => {
    navigate("/dashboard/projectsdata");
  };

  return (
    <>
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Body>
          <DeleteData deleteItem={"Project"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="w-100 compTitle d-flex justify-content-between my-5 bg-white p-4">
            <h2>Projects</h2>
            <div>
              {loginUser?.userGroup=='Manager'? <button
                className={`${Styles.btnOrangeColor} text-white btn rounded-5 p-3`}
                onClick={navigateToAdd}
              >
                <i className="fa fa-plus"></i>
                Add New Project
              </button>:''}
             
            </div>
          </div>
      {isLoading ? (
        <Loading />
      ) : (
        
          
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
                  onChange={getName}
                />
              </div>
            </div>

            <ul className="list-group mt-3 ">
              <li
                className={`${Styles.backgroundgreen} list-group-item fw-semibold py-3 text-white d-flex justify-content-between align-items-center`}
              >
                <div className="row w-100">
                  <div className="col-md-2  text-white">Title</div>
                  <div className="col-md-2  text-white">Description</div>
                  <div className="col-md-2  text-white">Modification Date</div>
                  <div className="col-md-2  text-white">Tasks</div>
                  <div className="col-md-2  text-white">Creation Date</div>
                  <div className="col-md-2  text-white">Actions</div>
                </div>
              </li>
              {projectsList.length > 0 ? (
                projectsList.map((project: ProjectInterface) => (
                  <li
                    key={project.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="row w-100">
                      <div className="col-md-2">{project.title}</div>
                      <div className="col-md-2">{project.description}</div>
                      <div className="col-md-2">
                        {project.modificationDate.slice(0, 10)}
                      </div>
                      <div className="col-md-2">{project.task?.length}</div>
                      <div className="col-md-2">
                        {project.creationDate.slice(0, 10)}
                      </div>
                      <div className="col-md-2 bg-body-secondar bg-info-subtl w-fit p-md-0 px-md-3 px-lg- rounded-3 d-flex justify-content-center align-items-center">
                        {loginUser?.userGroup=="Manager"? <div className="dropdown">
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
                              <a
                                onClick={() => handleDeleteShow(project.id)}
                                className="dropdown-item"
                                href="#"
                              >
                                <i className="fa fa-trash text-danger mx-2"></i>
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>:
                        <div>
                            
                                <i className="fa fa-eye text-info mx-2"></i>
                                View
                              
                            </div>}
                       
                        
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
            {/* TODO:implement Pagination */} <div className={`${Styles.pagination} text-muted`}>
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
                      getProjectsList(titleValue, statusValue, n, 1);
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
                    getProjectsList(
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
                    getProjectsList(
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
