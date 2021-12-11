import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Regestier from "./components/Regestier";
import Home from "./components/Home";


function App() {
  return (
    <>
     {/* <Navbar/> */}
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/Navbar" element={<Navbar/>} />
        <Route path="/Regestier" element={<Regestier />} />
        <Route path="/" element={<Home />} />
       
      </Routes>
      </>
  );
}

export default App;
