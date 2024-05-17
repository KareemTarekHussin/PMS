import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext<any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthContextProvider(props: any) {
  const [loginUser, setLoginUser] = useState(null);

  let requestHeaders = { Authorization: `Bearer ${localStorage.getItem("token")}` };
  let baseUrl = 'https://upskilling-egypt.com:3003/api/v1';

  const getUserData = () => {
    const encodedToken: any = localStorage.getItem("token");
    const decodedToken: any = jwtDecode(encodedToken);
    setLoginUser(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    }
  }, []);



  return (
    <AuthContext.Provider value={{ getUserData, baseUrl, requestHeaders, loginUser,setLoginUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
