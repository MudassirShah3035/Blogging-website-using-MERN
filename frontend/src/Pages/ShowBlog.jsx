import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthDataContext } from "../contexts/AuthContext";

const ShowBlog = () => {
  const { id } = useParams();
  const { serverUrl } = useContext(AuthDataContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/posts/${id}`
        );

        setPost(response.data.post);
      } catch (error) {
        console.log(
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getPost();
    }
  }, [id, serverUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="text-gray-500">Loading blog...</p>
        </div>

        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Blog not found
            </h1>

            <p className="mt-2 text-gray-500">
              The blog you are looking for does not exist.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl">

          <div className="mb-8 text-center">
            <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-600">
              {post.category}
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
              <span>
                By{" "}
                <span className="font-semibold text-gray-700">
                  {post.author?.name || "Unknown Author"}
                </span>
              </span>

              <span>•</span>

              <span>
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : ""}
              </span>
            </div>
          </div>

          {post.coverImage && (
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-[250px] w-full object-cover sm:h-[400px] lg:h-[500px]"
              />
            </div>
          )}

          <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm sm:p-10">
            <div className="whitespace-pre-line text-base leading-8 text-gray-700 sm:text-lg">
              {post.content}
            </div>
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ShowBlog;