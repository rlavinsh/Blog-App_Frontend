import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById } from "../services/postService";
import { getComments, addComment } from "../services/commentService";

function PostDetails() {
  const { id } = useParams();
  // console.log(id);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // for reading comments
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  // for adding comments

  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState("");

  // handle function for adding comment
  async function handleCommentSubmit(e) {
    e.preventDefault();

    if (!content.trim()) {
      setCommentError("Please enter a comment");
      return;
    }

    try {
      setSubmitting(true);
      setCommentError("");

      await addComment(id, content);

      setContent("");

      const data = await getComments(id);
      // console.log(data);

      setComments(data.data);
    } catch (error) {
      setCommentError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  // function for loading post
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

      <form onSubmit={handleCommentSubmit} className="mb-8">
        <label className="mb-2 block font-medium">Write a comment</label>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          rows="4"
          maxLength={1000}
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
        />

        {commentError && (
          <p className="mt-2 text-sm text-red-600">{commentError}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-3 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Add Comment"}
        </button>
      </form>
    </article>
  );
}

export default PostDetails;
