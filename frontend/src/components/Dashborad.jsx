import React, { useContext } from "react";
import { PostDataContext } from "../contexts/PostContext";
import { AuthDataContext } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { postData, getAllPost } = useContext(PostDataContext);
  const { serverUrl } = useContext(AuthDataContext);
  const navigate = useNavigate('')

  const handleEdit = (id) =>{
    navigate(`edit-blog/${id}`)

  }


  const handleDelete = async(id)=>{
    try {
      const response = await axios.delete(`${serverUrl}/api/posts/delete/${id}`, {withCredentials : true})
      console.log(response.data);

      await getAllPost();
    } catch (error) {
      console.log(
      error.response?.data?.message || error.message
    );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your blog posts
          </p>
        </div>

        <div className="w-full max-w-sm bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase">
            Total Blogs
          </p>

          <p className="text-4xl font-bold text-gray-900 mt-2">
            {Array.isArray(postData) ? postData.length : 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">

          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              All Posts
            </h2>
          </div>

          {Array.isArray(postData) && postData.length > 0 ? (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {postData.map((post) => (
                <div
                  key={post._id}
                  className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition"
                >

                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">
                        No Image
                      </span>
                    </div>
                  )}

                  <div className="p-5">

                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full mb-3">
                      {post.category}
                    </span>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.content}
                    </p>

                    <p className="text-xs text-gray-400 mt-4">
                      Author: {post?.author}
                    </p>

                    <div className="flex gap-3 mt-5">

                      <button
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer" onClick={()=>handleEdit(post._id)}
                      >
                        Edit
                      </button>

                      <button
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600  transition cursor-pointer" onClick={()=>handleDelete(post._id)}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="py-16 text-center">
              <p className="text-gray-500 text-lg">
                No blog posts available
              </p>
            </div>

          )}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;