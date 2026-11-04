import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleImageChange(e) {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      setPreview(URL.createObjectURL(selectedImage));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);

      if (image) {
        formData.append("image", image);
      }

      const data = await createPost(formData);

      setSuccess(data.message || "Post created successfully");

      setTitle("");
      setContent("");
      setCategory("");
      setImage(null);
      setPreview("");

      // Redirect to all posts after successful creation
      setTimeout(() => {
        navigate("/admin/posts");
      }, 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>

          <p className="mt-2 text-gray-500">
            Write and publish a new blog post.
          </p>
        </div>

        <Link
          to="/admin/posts"
          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
        >
          View All Posts
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block font-medium">Post Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Post Content</label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content..."
            rows="8"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Tech">Tech</option>
            <option value="Education">Education</option>
            <option value="Programming">Programming</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Cover Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 h-56 w-full rounded-lg object-cover"
            />
          )}
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Creating Post..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
