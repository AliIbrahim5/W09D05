import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
          result.data.like?.map((like) => {
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
      console.log(resp.data.length,);
      console.log(resp.data,'dsdsdsdsdsd');
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
      console.log(resp.data,'aliasssssss');
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
      if(resp.data.result=='removeLike'){
          setcurrentUserLiked(false)
      }else if(resp.data.result=='newLike'){
        setcurrentUserLiked(true)
      }
      getPosts();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(async () => {
    const user = await axios.get(`${BASE_URL}/user`, {
      withCredentials: true,
    });
//  console.log(user.data.user._id,'shatha');

    setUser(user.data.user._id);
    getPosts();
    getComments();
    console.log(data,'dddddddddddddd');

  }, []);
  return (
    <div>
      <div className="home">
        <div className="blog">
          {/* <h1>{data?.title}</h1> */}
          <img
            src={data?.img}
            alt="suppose to be picture here"
            width="400"
            height="400"
          />
{/* {  console.log(data,'slo')
} */}
          <p>{data.desc}</p>
          <h4>
            Like:
            {currentUserLiked ? (
              <span id="heart" onClick={likePost}>
                ❤️
              </span>
            ) : (
              <span onClick={likePost}>🤍</span>
            )}
            | {likes}
          </h4>
        </div>
        
        <form className="comments_form" onSubmit={sendComment}>
          <div className="commentHead">
            <h3>New Comment</h3>
            <button type="submit">Submit</button>
          </div>
          <div className="commentTail">
            <img
              src="https://proplayers.eu/media/cache/avatar_profile/avatars/024027-20210517185321.jpeg"
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
          
          {commments ?.map((desc, index) => {
              return (
                <div className="realComment" key={index}>
                  <hr />
                  <div className="realcommentRow">
                    <img
                      src="https://proplayers.eu/media/cache/avatar_profile/avatars/024027-20210517185321.jpeg"
                      alt=""
                    />
                    <div className="realcommentData">
                      <h3>{desc.user.username}</h3>
                      <p>{desc.desc}</p>
                      <p className="dateP">
                        {/* {desc.createdAt.slice(0, 10)}
                        {desc.createdAt.slice(11, 16)} */}
                      </p>
                    </div>
                    {console.log(desc)}
                    {desc.user._id == User ? (
                      <p
                        className="del"
                        onClick={() => DeleteComment(desc._id)}
                      >
                        ❌
                      </p>
                    ) : (
                      <></>
                    )}
                    {desc.user._id == User ? (
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