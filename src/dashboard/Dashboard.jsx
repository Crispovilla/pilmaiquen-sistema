import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AiFillMedicineBox, AiFillHome, AiFillFolderAdd } from "react-icons/ai";
import { FaBookMedical, FaUserPlus, FaBoxOpen, FaUsers } from "react-icons/fa";
import { MdOutlineHistoryEdu } from "react-icons/md";
import LogoDashboard from "../assets/logo-borde.png";
import "./DashboardStyles.css";

const Dashboard = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={LogoDashboard} alt="" />
        <h6>Panel de administrador</h6>
        <hr />
      </div>

      <ul>
        <li>
          <NavLink
            exact
            className="sidebar-links py-2 w-100 d-inline-block px-3 rounded"
            to="/"
          >
            <AiFillHome className="me-2" />
            Inicio
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            exact
            className="sidebar-links py-2 w-100 d-inline-block px-3 rounded"
            to="/listar-productos"
          >
            <FaBoxOpen className="me-2" />
            Listar productos
          </NavLink>
        </li>

        <li>
          <NavLink
            exact
            className="sidebar-links py-2 w-100 d-inline-block px-3 rounded"
            to="/ingresar-producto"
          >
            <AiFillMedicineBox className="me-2" />
            Ingresar productos
          </NavLink>
        </li>

        {/* <li>
          <NavLink
            exact
            className="sidebar-links py-2 w-100 d-inline-block px-3 rounded"
            to="/crear-noticia"
          >
            <MdOutlineHistoryEdu className="me-2" />
            Crear noticia
          </NavLink>
        </li> */}
        <hr />
        <li>
          <NavLink
            exact
            className="sidebar-links py-2 w-100 d-inline-block px-3 rounded"
            to="/listar-moderadores"
          >
            <FaUsers className="me-2" />
            Moderadores
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            className="sidebar-links py-2 w-100 d-inline-block px-3 rounded"
            to="/ingresar-moderador"
          >
            <FaUserPlus className="me-2" />
            Ingresar moderador
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
