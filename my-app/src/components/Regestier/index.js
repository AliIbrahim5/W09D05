import React from 'react'
import './style.css'
import {Link} from "react-router-dom";


const REGISTER = () => {
    return (
        <section className="section-login vvv">
        <div className="login-box">
          <form  className={"form"}>
            <div className="input-field">
              <p>username</p>
              <input type="text" name="username" placeholder="ex.AliAlyahya"
                     onChange={(e) => (e.target.value)}/>
            </div>
            <div className="input-field">
              <p>Email</p>
              <input type="text" name="email" placeholder="example@gmail.com"
                     onChange={(e) => (e.target.value)}/>
            </div>
            <div className="input-field">
              <p>password</p>
              <input type="password" name="password" placeholder="ex.12345"
                     onChange={(e) => (e.target.value)}/>
            </div>
            <input type="submit" value="Login" className={"btn"}/>
            <p><Link to="/login" className={"register"}>Already have an account ?</Link></p>
          </form>
        </div>
      </section>
    )
}

export default REGISTER
