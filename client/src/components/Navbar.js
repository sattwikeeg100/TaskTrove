import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import logo from './images/logo.png'

import { UserContext } from '../App';

const Navbar = () => {

  const {state, dispatch} = useContext(UserContext);

  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li className="nav-item me-2">
            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item me-2">
            <NavLink className="nav-link" to="/about">About</NavLink>
          </li>
          <li className="nav-item me-2">
            <NavLink className="nav-link" to="/contact">Contact</NavLink>
          </li>
          <li className="nav-item me-2">
            <NavLink className="nav-link" to="/profile">Profile</NavLink>
          </li>
          <li className="nav-item me-2">
            <NavLink className="nav-link" to="/logout">Logout</NavLink>
          </li>
        </>
      )
    }
    else {
      return (
        <>
          <li className="nav-item me-2">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item me-2">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item me-2">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item me-2">
              <NavLink className="nav-link" to="/signin">SignIn</NavLink>
            </li>
            <li className="nav-item me-2">
              <NavLink className="nav-link" to="/signup">SignUp</NavLink>
            </li>
        </>
      )
    }
  }


  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="#"><img src={logo} alt="TextTrove Logo" width="150" height="37"/></NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <RenderMenu/>        
            </ul>
            </div>
        </div>
        </nav>
    </>
  )
}

export default Navbar
