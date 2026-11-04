import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../services/postService";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostById(id);
        const post = data.data;

        setFormData({
          title: post.title,
          content: post.content,
          category: post.category,
        });

        setCurrentImage(post.coverImage || "");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    async function saveChanges() {
      try {
        setSubmitting(true);
        setError("");

        const updatedData = new FormData();

        updatedData.append("title", formData.title);
        updatedData.append("content", formData.content);
        updatedData.append("category", formData.category);

        if (image) {
          updatedData.append("image", image);
        }

        await updatePost(id, updatedData);

        navigate("/admin/posts");
      } catch (error) {
        setError(error.message);
      } finally {
        setSubmitting(false);
      }
    }

    saveChanges();
  }

  if (loading) {
    return <p className="text-center py-10">Loading post...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Post</h1>

        <Link to="/admin/posts" className="text-blue-600 hover:underline">
          Back to Posts
        </Link>
      </div>

      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-5"
      >
        <div>
          <label className="block font-medium mb-2">Post Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
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
          <label className="block font-medium mb-2">Post Content</label>

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="8"
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Current Cover Image</label>

          {currentImage && (
            <img
              src={currentImage}
              alt="Current cover"
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
          )}

          <label className="block font-medium mb-2">
            Choose New Image (Optional)
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}

export default EditPost;
