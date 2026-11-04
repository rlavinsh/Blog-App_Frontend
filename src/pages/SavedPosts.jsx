import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSavedPosts, unsavePost } from "../services/savedPostService";

function SavedPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get saved posts
  async function fetchSavedPosts() {
    try {
      setLoading(true);
      setError("");

      const data = await getSavedPosts();

      console.log("Saved Posts Response:", data);

      setPosts(data.savedPosts || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Remove saved post
  async function handleUnsave(postId) {
    try {
      await unsavePost(postId);

      setPosts((previousPosts) =>
        previousPosts.filter((item) => item.post?._id !== postId),
      );
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading saved posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4 text-red-500">{error}</p>

        <button
          onClick={fetchSavedPosts}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Saved Posts</h1>

        <p className="mt-2 text-gray-500">
          All your bookmarked blog posts in one place.
        </p>
      </div>

      {/* Empty State */}
      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
          <div className="mb-4 text-5xl">🔖</div>

          <h2 className="text-xl font-semibold text-gray-800">
            No Saved Posts Yet
          </h2>

          <p className="mt-2 text-gray-500">You haven't saved any posts yet.</p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Explore Posts
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-5 text-sm text-gray-500">
            {posts.length} saved {posts.length === 1 ? "post" : "posts"}
          </p>

          {/* Saved Posts Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((item) => {
              const post = item.post;

              // Handle deleted or missing posts
              if (!post || !post._id) return null;

              return (
                <div
                  key={item._id}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Cover Image */}
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-gray-100 text-gray-400">
                      No Image Available
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-5">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                      {post.category}
                    </span>

                    <h2 className="mt-3 line-clamp-2 text-xl font-semibold text-gray-900">
                      {post.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.content}
                    </p>

                    {/* Actions */}
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <Link
                        to={`/posts/${post._id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        Read More
                      </Link>

                      <button
                        onClick={() => handleUnsave(post._id)}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default SavedPosts;
