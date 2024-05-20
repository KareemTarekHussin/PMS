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




export default function ProjectsList() {
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const { getToast } = useToast();
  const [projectsList, setProjectsList] = useState([]);
  const [ProjectId, setProjectId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); 
  const [title, setTitle] = useState('');
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [showDelete, setShowDelete] = useState(false);
  const [transitionClass, setTransitionClass] = useState('');
  
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id: number) => {
    setProjectId(id);
    setShowDelete(true);
  };
  const navigate = useNavigate();

  



  //*=========================================================>> Get ALL Projects API
  const getProjectsList = async (title='', pageSize=5, pageNumber=1  ) => {
    try {
      let response = await axios.get(`${baseUrl}/Project/manager?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
        headers: requestHeaders,
        params:{
          'title':title,
        }
      });
      setProjectsList(response.data.data);
      setArrayOfPages(Array.from({ length: response.data.totalNumberOfPages }, (_, i) => i + 1));
      setTotalResults(response.data.totalNumberOfRecords);
      console.log(arrayOfPages);


    } catch (error) {
      console.log(error);
    }
  };
  
    //*=============================================================>> useEffect

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getProjectsList('',5,1);
  }, []);

  //^=======================================================================>> Searching
  const getNameValue = (input:any)=>{
    setTitle(input.target.value);
    getProjectsList(input.target.value,pageSize,1);
  }
  //&======================================================================>> Pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      getProjectsList(title, pageSize, currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < arrayOfPages.length) {
      setCurrentPage(currentPage + 1);
      getProjectsList(title, pageSize, currentPage + 1);
    }
  };

  //!===============================================================>> Delete Project API
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
      getProjectsList();
    } catch (error:any) {
      getToast("error", error.response.message);
    }
  };
  //update Project API

  const navigateToAdd = () => {
    navigate("/dashboard/projectsdata");
  };

  // ?===================================================================================>>JSX
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
          <div className="w-100 compTitle d-flex flex-column align-items-center flex-md-row justify-content-md-between my-5 bg-white p-4 gap-2 gap-md-0">

            <h2>Projects</h2>
            <div>
              <button
                className={`${Styles.btnOrangeColor} text-white btn rounded-5 px-3 fw-light`}
                onClick={navigateToAdd}
              >
                <i className="fa fa-plus me-2 fw-lighter"></i>
                Add New Project
              </button>
            </div>

          </div>
      {isLoading ? (
        <Loading />
      ) : (
        
          
          <div className='listContainer bg-white p-5 rounded-3'>
            {/* //TODO: implement Search*/}
            <div className="col-lg-5">
              <div className="input-group mb-3">
                <span className="input-group-text rounded-4 rounded-end-0" id="basic-addon1">
                  <i className="fa fa-search"></i>
                </span>
                <input
                  onChange={getNameValue}
                  type="text"
                  className="form-control rounded-4 rounded-start-0"
                  placeholder="Search By Title"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
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
                projectsList.map((project: any) => (
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
            <div className="bg-inf container my-3 pt-lg-3 pagination-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex justify-content-center justify-content-lg-end">
                    <div className="d-flex bg-warnin flex-column flex-lg-row gap-4">
                      
                      <div className="d-flex flex-column justify-content-center align-items-center flex-lg-row gap-3 bg-primar me-lg-3">
                        <div className="position-relative d-flex align-items-lg-center">
                          <span className="me-3">Showing</span>
                          <select 
                          className="form-control rounded-5 custom-select"
                          name="" 
                          id=""
                          value={pageSize} 
                          onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            getProjectsList(title, Number(e.target.value), 1);
                          }}
                          >
                            {[...Array(totalResults).keys()].map((num) => (
                              <option key={num + 1} value={num + 1}>
                                {num + 1}
                              </option>
                            ))}
                          </select>
                          <i className="fa-solid fa-chevron-down text-muted position-absolute select-icon"></i>
                        </div>
                        <div>of {totalResults} Results</div>
                      </div>

                      
                      <div className=" d-flex flex-column gap-4 align-items-center flex-lg-row">
                        <span className="me-lg-3">{`Page ${currentPage} of ${arrayOfPages.length}`}</span>
                        <div className="d-flex gap-4 text-muted">  
                          <i onClick={handlePreviousPage} className="fa-solid fa-chevron-left border border-1 p-2 rounded-3 select-page"></i>
                          <i onClick={handleNextPage} className=" fa-solid fa-chevron-right border border-1 p-2 rounded-3 select-page"></i>
                        </div>
                      </div>

                      

                    </div>

                  </div>


                </div>


              </div>

            </div>
          </div>
       
      )}
    </>
  );
}
