import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PostDataContext = createContext();

const PostContext = ({ children }) => {
  const [postData, setPostData] = useState([]);

  const getAllPost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/posts/",
        {
          withCredentials: true,
        }
      );

      console.log("GET ALL POSTS RESPONSE:", response.data);

      setPostData(response.data.post || []);
    } catch (error) {
      console.log(
        error.response?.data?.message || error.message
      );

      setPostData([]);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const value = {
    postData,
    setPostData,
    getAllPost,
  };

  return (
    <PostDataContext.Provider value={value}>
      {children}
    </PostDataContext.Provider>
  );
};

export default PostContext;