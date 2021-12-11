import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './style.css'
import {Link} from "react-router-dom";
// const URL = "http://localhost:5000";

const BASE_URL = process.env.REACT_APP_BASE_URL
const REGISTER = () => {
  
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [role, setRole] = useState("61a7682c2f32038287f22c4e");

  const getData = async () => {
    const items = await axios.get(`${BASE_URL}/allusers`);
    // console.log(items.data);
    setUsers(items.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const register = async (vil) => {
    vil.preventDefault();
    let check = false;
    // eslint-disable-next-line
    users.map((item) => {
      // eslint-disable-next-line
      if (item.email == email || item.username == username) {
        check = true;
      }
    });
    if (check) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: " email or username alerady exists",
      });
    } else {

      // eslint-disable-next-line
      const res = await axios.post(
        `${BASE_URL}/resgister`,
        {
          email,
          username,
          password,
        }
        
      );
      // navigate("/");
    }
  };

  // eslint-disable-next-line 
  const login = (vil) => {
    vil.preventDefault();
    navigate("/");
  };
    return (
        <section className="section-login vvv">
        <div className="login-box">
          <form  className={"form"}>
            <div className="input-field">
              <p>username</p>
              <input type="text" name="username" placeholder="ex.AliAlyahya"
                     onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div className="input-field">
              <p>Email</p>
              <input type="text" name="email" placeholder="example@gmail.com"
                     onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-field">
              <p>password</p>
              <input type="password" name="password" placeholder="ex.12345"
                     onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input type="submit" value="register" onClick={register} className={"btn"}/>
            <p><Link to="/login" className={"register"}>Already have an account ?</Link></p>
          </form>
        </div>
      </section>
    )
}

export default REGISTER
