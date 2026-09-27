import React, { useContext, useState } from 'react'
import { PostDataContext } from '../contexts/PostContext'
import axios from 'axios'
import { AuthDataContext } from '../contexts/AuthContext'
import EditBlog from './EditBlog'
import { useNavigate } from 'react-router-dom'

const BlogList = () => {
  const { postData, getAllPost } = useContext(PostDataContext)
  const { serverUrl } = useContext(AuthDataContext)
  const [show, setshow] = useState(false)
  const navigate = useNavigate('')

  const handleEdit = async(id)=>{
    setshow(true)
    navigate(`/admin/edit-blog/${id}`)
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
    <>
    {show ? <EditBlog /> :
     <div className='min-h-screen bg-gray-50/50 p-6 sm:p-10 font-sans'>
      <div className='max-w-7xl mx-auto flex flex-col gap-8'>
        
        <div className='border-b border-gray-200 pb-5'>
          <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>All Blogs</h1>
          <p className='text-sm text-gray-500 mt-1'>View, edit, and manage all your published articles</p>
        </div>

        {postData && postData.length > 0 ? (
          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider'>
                    <th className='p-4 pl-6'>Title</th>
                    <th className='p-4'>Category</th>
                    <th className='p-4 text-right pr-6'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100 text-sm text-gray-700'>
                  {postData.map((post) => (
                    <tr key={post._id || post.id} className='hover:bg-gray-50/50 transition-colors'>
                      <td className='p-4 pl-6 max-w-md'>
                        <div className='font-semibold text-gray-900 truncate'>{post.title}</div>
                        <div className='text-xs text-gray-400 truncate mt-0.5'>{post.content || post.description}</div>
                      </td>
                      <td className='p-4'>
                        <span className='inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 capitalize'>
                          {post.category || 'General'}
                        </span>
                      </td>
                      <td className='p-4 text-right pr-6 whitespace-nowrap'>
                        <div className='flex justify-end gap-2'>
                          <button className='px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg cursor-pointer' onClick={()=>handleEdit(post._id || post.id)}>
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(post._id || post.id)}
                            className='px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors rounded-lg cursor-pointer'
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className='min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-white shadow-sm'>
            <svg className='w-12 h-12 text-gray-300 mb-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
            </svg>
            <p className='text-base font-semibold text-gray-900'>No blogs found</p>
            <p className='text-sm text-gray-400 mt-0.5'>Get started by creating your first post.</p>
          </div>
        )}

      </div>
    </div>
    }
    </>
   
  )
}

export default BlogList
