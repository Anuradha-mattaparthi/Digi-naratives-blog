import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const [blog,setBlog] = useState([]);
        const params = useParams();

        const fetchBlog = async () => {
            const res = await fetch("http://localhost:8000/api/blogs/"+params.id)
            const result = await res.json();

setBlog(result.data);
        }
        useEffect(() => {
          fetchBlog();
        },[]);
    
  return (
    <div className="container">
    <div className="d-flex justify-content-between pt-3 mb-4">
      <h2>{blog.title}</h2>
      <div>
      <a href="/blogs" className="btn btn-info text-white">
      <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
        </a>
      </div>
    </div>
    <div className="row">
      <div className='col-md-12'>
        <p>by <strong>{blog.author}</strong> on {blog.date}</p>
        {
            (blog.image) && <img className='w-100' src={`http://localhost:8000/uploads/blogsimages/`+blog.image}/>
        }
        <div  className='mt-5' dangerouslySetInnerHTML={{__html:blog.description}}>
            {}
        </div>
      </div>
    </div>
  </div>
)
}

export default BlogDetail