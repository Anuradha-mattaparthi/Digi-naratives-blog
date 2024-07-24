import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await fetch('http://localhost:8000/api/blogs');
    const result = await res.json();
    setBlogs(result.data);
    console.log(result);
  };

  useEffect(() => {
    fetchBlogs();
  }, []); // Add an empty dependency array to run the effect only once

  return (
    <div className="container">
      <div className="d-flex justify-content-between pt-3 mb-4">
        <h2>Blogs</h2>
        <a href="/create" className="btn btn-info text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
          </svg>
        </a>
      </div>
      <div className="row">
        {blogs && blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
