import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        <p className="mt-2 text-gray-500">
          Manage your BlogApp content from here.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Create Post */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">✍️</div>

          <h2 className="text-xl font-semibold">Create Post</h2>

          <p className="mt-2 text-sm text-gray-500">
            Write and publish a new blog post.
          </p>

          <Link
            to="/admin/posts"
            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Manage Posts
          </Link>
        </div>

        {/* Manage Posts */}
        {/* <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-4 text-3xl">📚</div>

          <h2 className="text-xl font-semibold">Manage Posts</h2>

          <p className="mt-2 text-sm text-gray-500">
            View, edit and delete existing blog posts.
          </p>

          <Link
            to="/admin/posts"
            className="mt-5 inline-block rounded-lg bg-gray-800 px-5 py-2 text-white hover:bg-gray-900"
          >
            View All Posts
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default AdminDashboard;
