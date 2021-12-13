import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import './style.css'

const Post = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const getPosts = async () => {
    try {
      await axios
        .get(`${BASE_URL}/post/${params.id}`, { withCredentials: true })
        .then((result) => {
          setData(result.data);
          console.log(result.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.get(`${BASE_URL}/user`, {
        withCredentials: true,
      });
      console.log(params.id);
      if (user.data) {
        const resp = await axios.post(
          `${BASE_URL}/newComment/${params.id}`,
          {
            desc: e.target.comment.value,
            user: user.data.user._id,
          },
          {
            withCredentials: true,
          }
        );
        console.log(resp.data);
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
          _id: params.id,
        },
        { withCredentials: true }
      );
      console.log(resp.data);
      setcommments(resp.data);
      setNoComment(resp.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPosts();
    getComments();
  }, []);
  return (
    <div>
      <div className="homedd">
        <div className="blog">
          <h1>{data?.desc} tdrfyhgjbknlm</h1>
          <img
            src={data?.img}
            alt="suppose to be picture here"
            width="400"
            height="400"
          />
          <h1>{data?.desc}</h1>
        </div>

        <form className="comments_form" onSubmit={sendComment}>
          <div className="commentHead">
            <h3>New Comment</h3>
            <button type="submit">Submit</button>
          </div>
          <div className="commentTail">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
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
          {commments.length &&
            commments.map((comment, index) => {
              return (
                <div className="realComment" key={index}>
                  <hr />
                  <div className="realcommentRow">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt=""
                    />
                    <div className="realcommentData">
                      <h3>{comment.user}</h3>
                      <p>{comment.desc}</p>
                      <p className="dateP">
                        {/* {comment.createdAt.slice(0, 10)}{" "}
                        {comment.createdAt.slice(11, 16)} */}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </form>
      </div>
    </div>
  );
};

export default Post;