import React from "react";
import Styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={`${Styles.sidebar} bg-dark text-white`}>
      <div className={`${Styles.logo} p-3`}>
        <h2>Dashboard</h2>
      </div>
      <ul className={`${Styles.navList} list-unstyled`}>
        <li className={`${Styles.navItem} p-3`}>
          <Link to="/home" className="text-white">
            <i className="fa fa-home me-2"></i> Home
          </Link>
        </li>
        <li className={`${Styles.navItem} p-3`}>
          <Link to="/projects" className="text-white">
            <i className="fa fa-folder me-2"></i> Projects
          </Link>
        </li>
        <li className={`${Styles.navItem} p-3`}>
          <Link to="/tasks" className="text-white">
            <i className="fa fa-tasks me-2"></i> Tasks
          </Link>
        </li>
        <li className={`${Styles.navItem} p-3`}>
          <Link to="/users" className="text-white">
            <i className="fa fa-users me-2"></i> Users
          </Link>
        </li>
      </ul>
    </div>
  );
} 