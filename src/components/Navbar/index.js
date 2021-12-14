import { React } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import {GrLogin} from 'react-icons/gr'

const NAVBAR = () => {
  return (
    <header className="navbar-header">
      <div className="container">
        <div className="grid-nav">
          <h1 className="logo">
            <span>social</span>media
          </h1>
          <div className="routes">
            <ul className="route-list">
              <li className="list-nav">
                <Link to="/Post">Post</Link>
              </li>
           
              <li>
                <Link to="/posts">Posts</Link>
              </li>
            </ul>
          </div>
          <div className="account-icons">
            <ul className="icons-list">
              {localStorage.getItem("newUser") ? (
                <button className="logout-btn">logout</button>
              ) : (
                <li>
                  <Link to={"/login"}> <GrLogin/></Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NAVBAR;
