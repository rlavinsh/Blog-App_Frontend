import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById } from "../services/postService";

function PostDetails() {
  const { id } = useParams();
  // console.log(id);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setError("");

        const data = await getPostById(id);
        setPost(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading post...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!post) {
    return <p className="text-center">Post not found.</p>;
  }

  return (
    <article className="mx-auto max-w-3xl">
      <Link to="/" className="mb-6 inline-block text-blue-600 hover:underline">
        ← Back to Home
      </Link>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="mb-6 h-72 w-full rounded-xl object-cover"
        />
      )}

      <p className="mb-2 text-sm font-medium text-blue-600">{post.category}</p>

      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>

      <div className="whitespace-pre-wrap leading-8 text-gray-700">
        {post.content}
      </div>
    </article>
  );
}

export default PostDetails;
