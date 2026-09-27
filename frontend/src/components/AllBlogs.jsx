import React, { useContext, useState } from "react";
import { PostDataContext } from "../contexts/PostContext";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const { postData } = useContext(PostDataContext);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate()

  const categories = [
    "All",
    "Technology",
    "Lifestyle",
    "Business",
    "Design",
  ];

  const handleRead = (id) =>{
    navigate(`/${id}`)
  }

  const filteredPosts =
    activeCategory === "All"
      ? postData
      : postData.filter((post) => post.category === activeCategory);



  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Explore Our Blogs
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Discover stories, ideas, and knowledge shared by our community.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white py-20 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              No blogs found
            </h2>

            <p className="mt-2 text-gray-500">
              There are no blogs available in this category.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {filteredPosts.map((post) => (
              <article
                key={post._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="relative h-56 overflow-hidden bg-gray-100">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm backdrop-blur">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">

                  <h2 className="line-clamp-2 text-xl font-bold leading-snug text-gray-900 transition group-hover:text-blue-600">
                    {post.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                    {post.content}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {post.author?.name || "Unknown Author"}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString()
                          : ""}
                      </p>
                    </div>

                    <button className="text-sm font-semibold cursor-pointer text-blue-600 transition hover:text-blue-800" onClick={()=>handleRead(post._id)}>
                      Read More →
                    </button>

                  </div>
                </div>
              </article>
            ))}

          </div>
        )}
      </div>
    </section>
  );
};

export default AllBlogs;