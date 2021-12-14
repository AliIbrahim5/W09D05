import React from "react";
import {  useNavigate } from "react-router-dom";
import GoogleLogin from 'react-google-login'
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Home = () => {
  const navigate = useNavigate();

  const responseGoogle=async(response)=>{
    try{
    console.log(response.profileObj);
    // eslint-disable-next-line
    const result = await axios.post(`${BASE_URL}/login`, {
      email: "alyahya473@gmail.com",
      password: "Ww1234512345",
    }, {withCredentials: true});
    navigate('/posts')
    }catch (err) {
      console.error(err);
    }
  }

  // const postss =()=>{
  //   navigate('/post')
  // }

  return (
    <>
    <article className="home"> 
  <section class="one">
    <div class="img">
      <img src="https://abs.twimg.com/sticky/illustrations/lohp_en_850x623.png" alt="twitter"/>
    </div>
    <div>
      <i class="fab fa-twitter"></i>
    </div>
  </section>
  <section class="two">
    <div class="logo">
      <i class="fab fa-twitter"></i>
    </div>
    <div class="log-in">
    <h1>  Welcome to <h1 ><span >Social</span>Media</h1></h1>
      <div class="ptn">
      
        <div class="fab fa-google">
        <a href=""><i><GoogleLogin
           clientId="834336498641-nqe16c7o3tit8osa5aj8mfl21rulj74r.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          /></i></a>
          </div>
        <a href="login"><i class="fab fa-apple"></i>Login</a>
        <a href="Regestier"> Sign up</a>
      </div>
    </div>
  </section>
</article>

</>
  )

    
    
    
  
};

export default Home;
