import React, { useEffect, useState } from "react";
import Editor from "react-simple-wysiwyg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const EditBlog = () => {
  const [blog, setBlog] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const params = useParams();
  const [html, setHtml] = useState("");
  const [imageId, setImageId] = useState("");
  const navigate = useNavigate();
  function onChange(e) {
    setHtml(e.target.value);
  }

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const res = await fetch("http://localhost:8000/api/blogs/" + params.id);
    const result = await res.json();
    setBlog(result.data);
    setHtml(result.data.description);
    reset(result.data);
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/image/", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (result.status === false) {
        alert(result.errors.image);
        e.target.value = null;
      } else if (result.data && result.data.id) {
        setImageId(result.data.id);
      } else {
        console.error("Image data is missing in the response:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const formSubmit = async (data) => {
    const newData = { ...data, description: html, image_id: imageId };
    const res = await fetch(
      "http://127.0.0.1:8000/api/blogs/"+ params.id,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );

    toast("Blog updated successfully");

    navigate("/blogs");
    console.log(newData);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between pt-3 mb-4">
        <h2>Update Blog</h2>
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
      <div className="card border-0 shadow-lg">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Blog Title
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                className={`form-control ${errors.title && "is-invalid"}`}
                placeholder="Blog Title"
              />
              {errors.title && (
                <p className="invalid-feedback">This field is required</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="shortDesc" className="form-label">
                Short Description
              </label>
              <textarea
                {...register("shortDesc", { required: true })}
                className={`form-control ${errors.shortDesc && "is-invalid"}`}
                cols="30"
                rows="5"
              ></textarea>
              {errors.title && (
                <p className="invalid-feedback">This field is required</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <Editor
                containerProps={{ style: { height: "700px" } }}
                value={html}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input
                onChange={handleFileChange}
                type="file"
                className="form-control"
                placeholder=""
              />
              <div className="text-center">{
            (blog.image) && <img className='w-30 mt-3 img-fluid'  src={`http://localhost:8000/uploads/blogsimages/`+blog.image}/>
        }</div>
              
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                {...register("author", { required: true })}
                type="text"
                className={`form-control ${errors.author && "is-invalid"}`}
                placeholder="Author"
              />
              {errors.author && (
                <p className="invalid-feedback">This field is required</p>
              )}
            </div>
            <button className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
