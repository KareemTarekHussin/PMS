import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Styles from "./UsersList.module.css";
import { useToast } from "../../../Context/ToastContext";
import Loading from "../../../SharedModule/components/Loading/Loading";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const { getToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { requestHeaders, baseUrl }: any = useContext(AuthContext);

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
  const toggleUserActivate = async (id:number)=>{
    try {
      let response = await axios.put(`${baseUrl}/Users/${id}`, {}, {
        headers: requestHeaders,
      });
   
      getUsersList()

    } catch (error:any) {
      getToast('error', error.response.error);
    }
  }
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getUsersList();
  }, []);
  
  return (
    <>
      <div className="w-100 compTitle d-flex justify-content-between my-5 bg-white p-4">
        <h2>Users</h2>
      </div>
      {isLoading? (<Loading/>) : (<div className="listContainer bg-white p-5 rounded-3 ">
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
          <li
            className={`${Styles.backgroundgreen} list-group-item fw-semibold py-3 text-white d-flex justify-content-between align-items-center`}
          >
            <div className="row w-100">
              <div className="col-md-2  text-white">Username</div>
              <div className="col-md-3  text-white">Status</div>
              <div className="col-md-2  text-white">Phone Number</div>
              <div className="col-md-3  text-white">Email</div>
              <div className="col-md-2  text-white">Actions</div>
            </div>
          </li>
          {usersList.length > 0 ? (
            usersList.map((user: any) => (
              <li
                key={user.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="row w-100">
                  <div className="col-md-2">{user.userName}</div>
                  <div className="col-md-3">
                    {user.status}
                    {user.isActivated ? (
                      <i onClick={()=>toggleUserActivate(user.id)} className="fa fa-toggle-on fa-2xl text-success"></i>
                    ) : (
                      <i onClick={()=>toggleUserActivate(user.id)} className="fa fa-toggle-off fa-2xl text-danger"></i>
                    )}
                  </div>
                  <div className="col-md-2">{user.phoneNumber}</div>
                  <div className="col-md-3">{user.email}</div>

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
                            <i className="fa fa-ban text-warning mx-2"></i>
                            Block
                            {/* TODO:implement Update */}
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
      </div>) }
      
    </>
  );
}
