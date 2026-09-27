import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthDataContext } from "../contexts/AuthContext";
import { PostDataContext } from "../contexts/PostContext";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { serverUrl } = useContext(AuthDataContext);
  const { getAllPost } = useContext(PostDataContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${serverUrl}/api/posts/${id}`,
          {
            withCredentials: true,
          }
        );

        console.log("POST:", response.data);

        const post = response.data.post;

        setTitle(post.title || "");
        setContent(post.content || "");
        setCategory(post.category || "");
        setExistingImage(post.coverImage || "");
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setNewImage(file);

    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);

      if (newImage) {
        formData.append("coverImage", newImage);
      }

      const response = await axios.put(
        `${serverUrl}/api/posts/update/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("UPDATE RESPONSE:", response.data);

      await getAllPost();

      navigate("/admin");
    } catch (error) {
      console.log(
        error.response?.data?.message || error.message
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Blog
          </h1>

          <p className="text-gray-500 mt-2">
            Update your blog post information.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blog Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blog Content
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="10"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Thumbnail
              </label>

              {existingImage ? (
                <img
                  src={existingImage}
                  alt="Current thumbnail"
                  className="w-full max-w-sm h-48 object-cover rounded-xl border border-gray-200"
                />
              ) : (
                <div className="w-full max-w-sm h-48 flex items-center justify-center bg-gray-100 rounded-xl text-gray-400">
                  No thumbnail
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Change Thumbnail
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white"
              />
            </div>

            {imagePreview && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  New Thumbnail Preview
                </p>

                <img
                  src={imagePreview}
                  alt="New thumbnail preview"
                  className="w-full max-w-sm h-48 object-cover rounded-xl border border-blue-200"
                />
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-100">

              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="flex-1 px-5 py-3 border border-gray-300 cursor-pointer rounded-xl text-gray-700 font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default EditBlog;