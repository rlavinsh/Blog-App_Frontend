import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, deletePost } from "../services/postService";

function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchPosts() {
    try {
      setLoading(true);
      setError("");

      const data = await getPosts();

      setPosts(data.data || data.posts || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(postId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmDelete) return;

    try {
      await deletePost(postId);

      setPosts((previousPosts) =>
        previousPosts.filter((post) => post._id !== postId),
      );
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <p className="py-10 text-center">Loading posts...</p>;
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Posts</h1>

          <p className="mt-2 text-gray-500">View and manage all blog posts.</p>
        </div>

        <Link
          to="/admin/posts/create"
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + Create New Post
        </Link>
      </div>

      {error && <p className="mb-5 text-red-600">{error}</p>}

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <h2 className="text-xl font-semibold">No Posts Found</h2>

          <p className="mt-2 text-gray-500">
            Start by creating your first post.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4">Post</th>
                <th className="p-4">Category</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {post.coverImage && (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="h-12 w-16 rounded object-cover"
                        />
                      )}

                      <span className="font-medium">{post.title}</span>
                    </div>
                  </td>

                  <td className="p-4 text-gray-600">{post.category}</td>

                  <td className="p-4">
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManagePosts;
