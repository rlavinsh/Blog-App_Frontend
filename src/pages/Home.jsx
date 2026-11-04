import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/postService";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        // console.log(data.data);
        setPosts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Posts loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Latest Posts</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">Abhi koi post available nahi hai.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post._id}
              className="overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-5">
                <p className="mb-2 text-sm text-gray-500">{post.category}</p>
                <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
                <p className="mb-4 text-gray-600">
                  {post.content.slice(0, 150)}...
                </p>

                <Link
                  to={`/posts/${post._id}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;
