import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Regestier from "./components/Regestier";
import Home from "./components/Home";
import Post from './components/Post'
import Desc from './components/Desc'
import Forget from './components/Forget'
import Posts from './components/Posts'
import PasswordReset from './components/Passwordrest'
import Activated from './components/Activated'

function App() {
  return (
    <>
     <Navbar/>
     <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/Regestier' element={<Regestier />}/>
        <Route exact path="/post/:id" element={<Post/>}/>
        <Route exact path="/Desc" element={<Desc/>}/>
        <Route exact path="/Posts" element={<Posts/>}/>
        <Route exact path='/forgot/:token' element={<PasswordReset />}/>
        <Route exact path="/forgot" element={<Forget/>}/>
        <Route exact path="/activate/:token" element={<Activated/>}/>
      </Routes>
      </>
  );
}

export default App;
