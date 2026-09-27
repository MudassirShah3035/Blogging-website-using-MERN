import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthDataContext } from '../contexts/AuthContext'

const AddBlog = () => {
  const { serverUrl } = useContext(AuthDataContext)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setThumbnail(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  // Submit blog
  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    // Frontend validation
    if (!title.trim()) {
      setError('Please enter a blog title.')
      return
    }

    if (!content.trim()) {
      setError('Please enter blog content.')
      return
    }

    if (!category) {
      setError('Please select a category.')
      return
    }

    setLoading(true)

    const formData = new FormData()

    formData.append('title', title)
    formData.append('content', content)
    formData.append('category', category)

    // IMPORTANT:
    // This must match upload.single("coverImage") in backend
    if (thumbnail) {
      formData.append('coverImage', thumbnail)
    }

    try {
      const response = await axios.post(
        `${serverUrl}/api/posts/create`,
        formData,
        {
          withCredentials: true
        }
      )

      console.log('CREATE POST RESPONSE:', response.data)

      // Reset form after successful creation
      setTitle('')
      setContent('')
      setCategory('')
      setThumbnail(null)
      setPreviewUrl('')

      alert('Blog published successfully!')

    } catch (err) {
      console.error('CREATE POST ERROR:', err)

      setError(
        err.response?.data?.message ||
        'Failed to create blog post'
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50/50 p-6 sm:p-10 font-sans'>

      <div className='max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-sm'>

        {/* Header */}
        <div className='border-b border-gray-100 pb-5 mb-6'>

          <h1 className='text-2xl font-bold text-gray-900 tracking-tight'>
            Add the Blog
          </h1>

          <p className='text-sm text-gray-500 mt-1'>
            Create and publish a new post to your platform
          </p>

        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium'>
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-6'
        >

          {/* Thumbnail */}
          <div className='flex flex-col gap-2'>

            <label className='text-sm font-semibold text-gray-700'>
              Thumbnail
            </label>

            <div className='flex items-center justify-center w-full'>

              <label className='flex flex-col items-center justify-center w-full h-48 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-colors group overflow-hidden relative'>

                {previewUrl ? (

                  <div className='w-full h-full relative group'>

                    <img
                      src={previewUrl}
                      alt='Preview'
                      className='w-full h-full object-cover'
                    />

                    <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>

                      <p className='text-white font-medium text-sm'>
                        Change Image
                      </p>

                    </div>

                  </div>

                ) : (

                  <div className='flex flex-col items-center justify-center pt-5 pb-6 text-gray-400 group-hover:text-blue-600 transition-colors'>

                    <svg
                      className='w-8 h-8 mb-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>

                    <p className='text-sm font-medium'>
                      Click to upload image
                    </p>

                    <p className='text-xs text-gray-400 mt-0.5'>
                      PNG, JPG or WEBP up to 5MB
                    </p>

                  </div>

                )}

                <input
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageChange}
                />

              </label>

            </div>

          </div>

          {/* Title */}
          <div className='flex flex-col gap-1.5'>

            <label className='text-sm font-semibold text-gray-700'>
              Title
            </label>

            <input
              type='text'
              placeholder='Enter title..'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full text-gray-900 placeholder-gray-400 bg-white border border-gray-200 p-3 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base'
              required
            />

          </div>

          {/* Content */}
          <div className='flex flex-col gap-1.5'>

            <label className='text-sm font-semibold text-gray-700'>
              Content
            </label>

            <textarea
              rows='6'
              placeholder='Enter content..'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='w-full text-gray-900 placeholder-gray-400 bg-white border border-gray-200 p-3 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base resize-none'
              required
            />

          </div>

          {/* Category */}
          <div className='flex flex-col gap-1.5'>

            <label className='text-sm font-semibold text-gray-700'>
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full text-gray-900 bg-white border border-gray-200 p-3 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-base cursor-pointer'
              required
            >

              <option value='' disabled>
                Select a category
              </option>

              <option value='Technology'>
                Technology
              </option>

              <option value='Lifestyle'>
                Lifestyle
              </option>

              <option value='Business'>
                Business
              </option>

              <option value='Design'>
                Design
              </option>

            </select>

          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition-colors text-white font-bold p-3.5 rounded-xl text-base mt-2 cursor-pointer shadow-md shadow-blue-600/10'
          >
            {loading ? 'Publishing...' : 'Publish Blog'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default AddBlog