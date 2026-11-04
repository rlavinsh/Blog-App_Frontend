import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById } from "../services/postService";
import { getComments } from "../services/commentService";

function PostDetails() {
  const { id } = useParams();
  // console.log(id);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // for comments
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

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

  // useEffect for fetching commments

  useEffect(() => {
    async function loadComments() {
      try {
        setCommentsLoading(true);

        const data = await getComments(id);
        setComments(data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setCommentsLoading(false);
      }
    }

    loadComments();
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

      <section className="mt-12 border-t pt-8">
        <h2 className="mb-6 text-2xl font-bold">
          Comments ({comments.length})
        </h2>

        {commentsLoading ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className="rounded-lg border bg-white p-4">
                <h3 className="font-semibold">
                  {comment.author?.name || "Unknown User"}
                </h3>

                <p className="mt-2 text-gray-600">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}

export default PostDetails;
