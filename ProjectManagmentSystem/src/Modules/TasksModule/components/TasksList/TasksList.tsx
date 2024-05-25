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
import { Header } from '../../../SharedModule/components/Header/Header';
import Pagination from '../../../SharedModule/components/Pagination/Pagination';
import { TaksInterface } from "../../../../Interfaces/Interface";

export default function TasksList() {
  const { requestHeaders, baseUrl,loginUser }: any = useContext(AuthContext);
  const { getToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showListSize, setShowListSize] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [totalResults, setTotalResults] = useState(0);
  const [title, setTitle] = useState(''); // Add title state
  const [status, setStatus] = useState(''); // Add status state

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

  const { getToast } = useToast();
  const navigate = useNavigate();

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
  //*=============================================GET TaskList==============================================//
  
  const getTasksList = async (title= '', status= '', pageSize= 5, pageNumber= 1) => {
    try {
      let response = await axios.get(`${baseUrl}/Task/manager`, {
        headers: requestHeaders,
        params: {
          'title': title,
          'status': status,
          pageSize: pageSize,
          pageNumber: pageNumber
        },
      });
      setTasksList(response.data.data);
      setTotalResults(response.data.totalNumberOfRecords);
      setArrayOfPages(Array.from({ length: response.data.totalNumberOfPages }, (_, i) => i + 1));
      console.log(arrayOfPages);
      
    } 
    
    catch (error:any) {
      getToast('error', error.response.message);
    }
  };
  

  const navigateToAddTask = () => {
    navigate("/dashboard/tasksdata");
  };

  //&==============================> Functions of Pagination <==============================>> 
  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getTasksList(title, status, pageSize, page); 
  };

  // Function to handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page on page size change
    getTasksList(title, "", size, 1);
  };
  
  //?=================================>> UseEffect <<==========================================// 
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
    getTasksList(title,status,5,1);
  }, []);


  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    getTasksList(event.target.value, status, pageSize, 1);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    getTasksList(title, event.target.value, pageSize, 1);
  };

  return (
    <>
    <div className='font-main'>

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
      
      <Header title='Tasks' button='Add New Task' method={navigateToAddTask}/>

      {isLoading ? <Loading/> :   
      <div className="py-4 px-lg-5 rounded-3">
        <div className="row justify-content-center justify-content-md-start">
          
        <div className="col-12 col-md-7 col-lg-4">
          <div className="input-group mb-3">
            <span className="input-group-text rounded-5 rounded-end-0" id="basic-addon1">
              <i className="fa fa-search"></i>
            </span>
            <input
              onChange={handleTitleChange}
              type="text"
              className="form-control rounded-5 rounded-start-0 py-2"
              placeholder="Search By Title"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        

        <div className="col-6 col-md-5 col-lg-1 px-lg-2">
          <select 
            onChange={handleSelect} 
            className='form-control border-0 rounded-5 py-2'
            defaultValue=''
            >
            <option value="" disabled>
              Filter
            </option>
            <option value="ToDo">to do</option>
            <option value="InProgress">in progress</option>
            <option value="Done">done</option>
          </select>   
        </div>

        </div>
        
        <div className="categories-body">

          <ul className="responsive-table-categories">
            <li className="table-header">
              <div className="col col-1">Title</div>
              <div className="col col-2">Status</div>
              <div className="col col-3">User</div>
              <div className="col col-4">Project</div>
              <div className="col col-5">Date Created</div>
              <div className="col col-5">Actions</div>
            </li>
          </ul>

          {tasksList.length > 0 ? (
            tasksList.map((task:any) => (
              <ul className="responsive-table-categories">
                <li key={task.id} className="table-row">
                  <div className="col col-1" data-label="Title :"><span className='fw-semibold'>{task.title}</span></div>
                  <div className="col col-2" data-label="Status :">{task.status}</div>
                  <div className="col col-3" data-label="User :">{task.employee?.userName}</div>
                  <div className="col col-4" data-label="Project :">{task.project?.title}</div>
                  <div className="col col-5" data-label="Date Created :">{task.creationDate.slice(0, 10)}</div>
                  <div className="col col-6" data-label="Actions :">
                    <div className="dropdown">
                      <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-ellipsis-vertical"></i>
                      </button>
                      <ul className="dropdown-menu bg-success-subtl border-0 shadow-lg rounded-5 pt-2">
                        <div>

                        <li>
                          <a className="dropdown-item text-decoration-none text-black" href="#">
                            <i className="fa fa-eye text-info me-2"></i>
                            <span>View</span>
                          </a>
                        </li>
                        
                        <li>
                          <a className="dropdown-item text-decoration-none text-black" href="#">
                            <i className="fa fa-edit text-warning me-2"></i>
                            <span>Edit</span>
                          </a>
                        </li>

                        <li>
                          <a className="dropdown-item text-decoration-none text-black" onClick={() => handleDeleteShow(task.id)}  href="#">
                            <i className="fa fa-trash text-danger me-2"></i>
                            <span>Delete</span>
                          </a>
                        </li>
                        </div>

                        
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            ))
          ) : (
            <ul className="responsive-table-categories">
              <li className="table-row">
                <div className="col col-1">No data</div>
              </li>
            </ul>
          )}
        </div>


        {/* TODO:implement Pagination */}
        <Pagination
        currentPage={currentPage}
        totalPages={arrayOfPages.length}
        pageSize={pageSize}
        totalResults={totalResults}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      </div> }
    </div>
      
    </>
  )
}
