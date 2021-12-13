import React from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./style.css"
import { useNavigate } from "react-router-dom";
const POST = () => {
  const navigate = useNavigate();

    const state = useSelector((state) => {
        return state;
      });
    
      //
      const [img, setImg] = useState("");
      const [desc, setDesc] = useState("");
    
      // Create new post
      const newPost = async (e) => {
        e.preventDefault();
                let res = await axios.get( `${process.env.REACT_APP_BASE_URL}/user`, {withCredentials: true})
               console.log(res.data);
      if (res.data._id) {
        // console.log('dsdsds');
        // eslint-disable-next-line
        // console.log(state.signIn.user._id);
        let rres = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/newpost/${res.data._id}`,
          {

            desc: desc,
            img: img,
          },{withCredentials: true},
        );
        console.log(rres.data);
        // setPost(false);
        e.target[0].value = "";
        e.target[1].value = "";
        // getPost();
      }
        // // eslint-disable-next-line
        // console.log(state.signIn.user._id);
        // let res = await axios.post(
        //   `${process.env.REACT_APP_BASE_URL}/newpost/${state.signIn.user._id}`,
        //   {

        //     desc: desc,
        //     img: img,
        //   },
        //   {
        //     headers: { Authorization: `Bearer ${state.signIn.token}` },
        //   }
        // );
        // setPost(false);
        // e.target[0].value = "";
        // e.target[1].value = "";
        // getPost();
      };
    
      return (
        <div className="home">
          <form className="formm"
            onSubmit={(e) => {
              newPost(e);
            }}
          >
            <input
              type="text"
              name="img"
              placeholder="Image URL"
              onChange={(e) => setImg(e.target.value)}
            />
            <input
              type="text"
              name="desc"
              placeholder="Descriopn"
              onChange={(e) => setDesc(e.target.value)}
              required
            />
            <input type="submit" name="submit" value="Post"  />
            <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
          </form>
        </div>
      );
    };

export default POST
