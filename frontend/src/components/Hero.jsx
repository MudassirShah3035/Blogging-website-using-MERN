import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <section className="min-h-[70vh] flex flex-col justify-center items-center px-6 text-center bg-gradient-to-b from-white to-gray-50/50">
      <div className="w-full max-w-4xl flex flex-col gap-8">

        <div className="flex flex-col gap-6">
          <span className="mx-auto w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            Discover • Write • Share
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Your own{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              blogging
            </span>{" "}
            platform.
          </h1>
        </div>

        <div className="mx-auto max-w-2xl">
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Share your ideas, discover interesting stories, and connect with
            writers from around the world. Your story starts right here.
          </p>
        </div>

        <div className="mx-auto mt-4 w-full max-w-xl">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-gray-100 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100"
          >
            <div className="flex flex-1 items-center pl-3">
              <svg
                className="h-5 w-5 shrink-0 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for blogs..."
                className="w-full bg-transparent py-3 pl-3 pr-2 text-base text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md shadow-blue-600/10 transition-colors hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
          <span>Try:</span>

          <button
            onClick={() => navigate("/search?q=technology")}
            className="font-medium text-blue-600 hover:underline"
          >
            Technology
          </button>

          <button
            onClick={() => navigate("/search?q=business")}
            className="font-medium text-blue-600 hover:underline"
          >
            Business
          </button>

          <button
            onClick={() => navigate("/search?q=lifestyle")}
            className="font-medium text-blue-600 hover:underline"
          >
            Lifestyle
          </button>

          <button
            onClick={() => navigate("/search?q=design")}
            className="font-medium text-blue-600 hover:underline"
          >
            Design
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;