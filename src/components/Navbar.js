import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Navbar({ fun }) {

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav>
      <div className="nav-header">
        <div className="c-logo">
          <img
            alt="logo"
            src="https://image.flaticon.com/icons/svg/1021/1021097.svg"
          />
        </div>
        <div onClick={fun} className="c-logout" title="CERRAR SESIÓN">
            <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
      <div className="c-user">
        <div className="avatar">
          <img
            alt="avatar"
            src={`https://randomuser.me/api/portraits/men/${user.id + 60}.jpg`}
          ></img>
        </div>
        <h6>{ user.name } { user.lastname }</h6>
      </div>
      <ul>
        <li>
          <NavLink className="link" to="/home" activeClassName="active">Inicio</NavLink>
        </li>
        <span>Mantenimiento</span>
        <li>
          <NavLink className="link" to="/actor" activeClassName="active">Actor</NavLink>
        </li>
        <li>
          <NavLink className="link" to="/director" activeClassName="active">Director</NavLink>
        </li>
        <li>
          <NavLink className="link" to="/film" activeClassName="active">Película</NavLink>
        </li>
        <li>
          <NavLink className="link" to="/filmactor" activeClassName="active">Película Actor</NavLink>
        </li>
      </ul>
    </nav>
  );
}
