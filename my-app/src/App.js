import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Regestier from "./components/Regestier";
import Home from "./components/Home";
import Post from './components/Post'
import Desc from './components/Desc'

function App() {
  return (
    <>
     <Navbar/>
     <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/Regestier' element={<Regestier />}/>
        <Route exact path="/post" element={<Post/>}/>
        <Route exact path="/Desc" element={<Desc/>}/>
      </Routes>
      </>
  );
}

export default App;
