import React from "react";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const { setLoginUser } = useAuth();

  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    setLoginUser(null);
    navigate("/login");
  }
  return (
    <div>
      SideBar <button onClick={logout}>logout</button>
    </div>
  );
}
