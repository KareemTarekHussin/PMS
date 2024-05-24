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
import Pagination from "../../../SharedModule/components/Pagination/Pagination";
import { Header } from "../../../SharedModule/components/Header/Header";
import projectImg from "../../../../assets/images/projects.jpg";





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
  
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id: number) => {
    setProjectId(id);
    setShowDelete(true);
  };
  const navigate = useNavigate();

  //*==========================> Get ALL Projects API <===============================>> 
  const getProjectsList = async (title='', pageSize=5, pageNumber=1  ) => {
    try {
      let response = await axios.get(`${baseUrl}/Project/manager`, {
        headers: requestHeaders,
        params:{
          'title':title,
          pageSize: pageSize,
          pageNumber: pageNumber
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
  
    //?============================> useEffect <=================================>> 

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 0);
    getProjectsList('',5,1);
  }, []);

  //^=================================> Searching <======================================>> 
  const getNameValue = (input:any)=>{
    setTitle(input.target.value);
    getProjectsList(input.target.value,pageSize,1);
  }
  //&==============================> Functions of Pagination <==============================>> 
  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getProjectsList(title, pageSize, page);
  };

  // Function to handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    getProjectsList(title, size, 1);
  };

  //!=================================> Delete Project API <==============================>> 
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

  const navigateToAdd = () => {
    navigate("/dashboard/projectsdata");
  };

  // *====================================> UI <===============================================>>
  return (
    <>
    <div className='font-main'>
      
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Body>
          <DeleteData deleteItem={"Project"} />
        </Modal.Body>
        <Modal.Footer>
          <Button className="red-btn rounded-pill px-4" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


      

      <Header title='Projects' button='Add New Project' method={navigateToAdd} imgUrl={projectImg} />

      {isLoading ? (
        <Loading />
      ) : (

      <div className='py-4 bg-inf px-lg-5 rounded-3 shadow-s'>
        <div className="col-lg-4">
          <div className="input-group mb-3">
            <span className="input-group-text rounded-5 rounded-end-0" id="basic-addon1">
              <i className="fa fa-search"></i>
            </span>
            <input
              onChange={getNameValue}
              type="text"
              className="form-control rounded-5 rounded-start-0 py-2"
              placeholder="Search By Title"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <div className="categories-body">
          <ul className="responsive-table-categories">
            <li className="table-header">
              <div className="col col-1">#</div>
              <div className="col col-2">Project Name</div>
              <div className="col col-3">Creation Date</div>
              <div className="col col-4">Last Update</div>
              <div className="col col-5">Actions</div>
            </li>
          </ul>
          {projectsList.length > 0 ? (
            projectsList.map((project:any, index) => (
              <ul  className="responsive-table-categories">
                <li key={project.id} className="table-row">
                  <div className="col col-1 fw-semibold" data-label="#">{index + 1}</div>
                  <div className="col col-2" data-label="Category Name :">{project.title}</div>
                  <div className="col col-3" data-label="Creation Date :">{project.creationDate.slice(0, 10)}</div>
                  <div className="col col-4" data-label="Last Update :">{project.modificationDate.slice(0, 10)}</div>
                  <div className="col col-5" data-label="Actions :">
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
                          <a className="dropdown-item text-decoration-none text-black" onClick={() => handleDeleteShow(project.id)}  href="#">
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

  
        <Pagination
        currentPage={currentPage}
        totalPages={arrayOfPages.length}
        pageSize={pageSize}
        totalResults={totalResults}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      </div>
       
      )}
    </div>
    </>
  );
}
