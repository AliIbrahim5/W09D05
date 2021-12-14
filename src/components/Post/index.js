import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import {BsSuitHeart} from "react-icons/bs"
import {FaKissWinkHeart} from "react-icons/fa"
import {RiChatDeleteFill} from "react-icons/ri"
import {FiSend} from "react-icons/fi"

const Post = () => {
  
  const params = useParams();
  const [data, setData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [User, setUser] = useState("");
  const [likes, setlikes] = useState(0);
  const [currentUserLiked, setcurrentUserLiked] = useState(false);

  const getPosts = async () => {
    try {
      await axios
        .get(`${BASE_URL}/post/${params.id}`, { withCredentials: true })
        .then((result) => {
          console.log(result.data);
          setData(result.data);
          setlikes(result.data.like.length);
          console.log(data);
          // eslint-disable-next-line
          result.data.like?.map((like) => {
            // eslint-disable-next-line
            if (like.user == User) {
              setcurrentUserLiked(true);
            }
          });
        });
    } catch (error) {
      // console.log(error);
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      if (User) {
        // eslint-disable-next-line
        const resp = await axios.post(
          `${BASE_URL}/newComment/${params.id}`,
          {
            desc: e.target.comment.value,
            user: User,
          },
          {
            withCredentials: true,
          }
        );
        getComments();
      }
    } catch (err) {
      console.error(err);
    }
    e.target.comment.value = "";
  };

  const [noComment, setNoComment] = useState(0);
  const [commments, setcommments] = useState([]);

  const getComments = async () => {
    try {
      const resp = await axios.post(
        `${BASE_URL}/getComment`,
        {
          post: params.id,
        },
        { withCredentials: true }
      );
      console.log(resp.data.length);
      console.log(resp.data, "dsdsdsdsdsd");
      setcommments(resp.data);
      setNoComment(resp.data.length);
    } catch (err) {
      console.error(err);
    }
  };
  const DeleteComment = async (id) => {
    try {
      const resp = await axios.delete(`${BASE_URL}/deletecomment/${id}`, {
        withCredentials: true,
      });
      console.log(resp.data, "aliasssssss");
      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  const UpdateComment = async (id) => {
    try {
      const new_comment = prompt("Edit comment to:");
      const resp = await axios.put(
        `${BASE_URL}/updatecomment/${id}`,
        {
          desc: new_comment,
        },
        {
          withCredentials: true,
        }
      );
      console.log(resp.data);
      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  const likePost = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/like/${params.id}`, {
        withCredentials: true,
      });
      console.log(resp.data);
      // eslint-disable-next-line
      if (resp.data.result == "removeLike") {
        setcurrentUserLiked(false);
        // eslint-disable-next-line
      } else if (resp.data.result == "newLike") {
        setcurrentUserLiked(true);
      }
      getPosts();
    } catch (err) {
      console.error(err);
    }
  };
  // eslint-disable-next-line
  useEffect(async () => {
    const user = await axios.get(`${BASE_URL}/user`, {
      withCredentials: true,
    });
    

    setUser(user.data.user._id);
    getPosts();
    getComments();
    console.log(data, "dddddddddddddd");
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="home">
        <div className="blog">
          
          <img
            src={data?.img}
            alt=""
            width="400"
            height="400"
          />
          
          <p>{data.desc}</p>
          <h4>
            Like:
            {currentUserLiked ? (
              <span id="heart" onClick={likePost}>
                <FaKissWinkHeart/>
              </span>
            ) : (
              <span onClick={likePost}><BsSuitHeart/></span>
            )}
            | {likes}
          </h4>
        </div>

        <form className="comments_form" onSubmit={sendComment}>
          <div className="commentHead">
            <h3>Comment</h3>
            <button type="submit"><FiSend/></button>
          </div>
          <div className="commentTail">
            <img
              src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
            />
            <textarea
              name="comment"
              placeholder="Your message"
              required
              cols="55"
              rows="8"
            ></textarea>
          </div>
          <div className="numComment">
            <h3>{noComment} Comments</h3>
          </div>

          {commments
            ?.map((desc, index) => {
              return (
                <div className="realComment" key={index}>
                  <hr />
                  <div className="realcommentRow">
                    <img
                      src="https://storyy.cc/wp-content/uploads/2018/05/5386.jpg"
                      alt=""
                    />
                    <div className="realcommentData">
                      <h3>{desc.user.username}</h3>
                      <p>{desc.desc}</p>
                      
                      
                      <p className="dateP"></p></div>{desc.user._id === User ? (
                      
                      <p
                        className="del"
                        onClick={() => DeleteComment(desc._id)}
                      >
                        <RiChatDeleteFill/>
                      </p>
                    ) : (
                      <></>
                      // eslint-disable-next-line
                    )}{desc.user._id == User ? (
                      <p
                        className="del"
                        onClick={() => UpdateComment(desc._id)}
                      >
                        🖊️
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })
            .reverse()}
        </form>
      </div>
    </div>
  );
};

export default Post;
