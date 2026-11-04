import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getPostById } from "../services/postService";

import {
  getComments,
  addComment,
  deleteComment,
} from "../services/commentService";

import { useAuth } from "../context/AuthContext";

import {
  getSavedPosts,
  savePost,
  unsavePost,
} from "../services/savedPostService";

function PostDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  // Post states
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Auth user ID
  const currentUserId = String(user?._id || user?.id || user?.user?._id || "");

  // Save / Unsave states
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Comments states
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  // Add comment states
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState("");

  // Load Post
  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setError("");

        const data = await getPostById(id);

        setPost(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  // Load Comments
  async function fetchComments() {
    try {
      setCommentsLoading(true);

      const data = await getComments(id);

      setComments(data.data || []);
    } catch (error) {
      console.log("Comments Error:", error.message);
    } finally {
      setCommentsLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [id]);

  // Check Saved Post
  async function checkSavedPost() {
    try {
      const data = await getSavedPosts();

      const savedPosts = data.savedPosts || [];

      const alreadySaved = savedPosts.some(
        (item) => String(item.post?._id) === String(id),
      );

      setIsSaved(alreadySaved);
    } catch (error) {
      console.log("Saved Posts Error:", error.message);
    }
  }

  useEffect(() => {
    checkSavedPost();
  }, [id]);

  // Save / Unsave Post
  async function handleSavePost() {
    try {
      setSaving(true);

      if (isSaved) {
        await unsavePost(id);
        setIsSaved(false);
      } else {
        await savePost(id);
        setIsSaved(true);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  }

  // Add Comment
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

      await fetchComments();
    } catch (error) {
      setCommentError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  // Delete Comment
  async function handleDeleteComment(commentId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?",
    );

    if (!confirmDelete) return;

    try {
      await deleteComment(commentId);

      setComments((previousComments) =>
        previousComments.filter((comment) => comment._id !== commentId),
      );
    } catch (error) {
      alert(error.message);
    }
  }

  // Get comment author ID
  function getCommentAuthorId(comment) {
    const author = comment.author;

    if (typeof author === "object" && author !== null) {
      return String(author._id || author.id || "");
    }

    return String(author || "");
  }

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

      {/* Post Image */}
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

      {/* Save Post Button */}
      {user && (
        <button
          onClick={handleSavePost}
          disabled={saving}
          className={`mt-6 rounded-lg px-5 py-2 font-medium transition ${
            isSaved
              ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {saving ? "Please wait..." : isSaved ? "Remove Saved" : "Save Post"}
        </button>
      )}

      {/* Comments Section */}
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
            {comments.map((comment) => {
              const authorId = getCommentAuthorId(comment);

              const isOwner =
                currentUserId !== "" && currentUserId === authorId;

              const isAdmin = user?.role === "admin";

              console.log("Comment ID:", comment._id);
              console.log("Comment Author ID:", authorId);
              console.log("Logged In User ID:", currentUserId);
              console.log("Is Owner:", isOwner);

              return (
                <div
                  key={comment._id}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">
                      {typeof comment.author === "object"
                        ? comment.author?.name || "Unknown User"
                        : "Unknown User"}
                    </h3>

                    {(isOwner || isAdmin) && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  <p className="mt-2 text-gray-600">{comment.content}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Add Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-8 mt-8">
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
