import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          BlogApp
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-5">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : user ? (
            <>
              <Link to="/profile" className="hover:text-blue-600">
                Profile
              </Link>

              {user.role === "admin" ? (
                <>
                  <Link to="/admin" className="hover:text-blue-600">
                    Dashboard
                  </Link>

                  <Link to="/admin/posts" className="hover:text-blue-600">
                    Manage Posts
                  </Link>
                </>
              ) : (
                <Link to="/saved-posts" className="hover:text-blue-600">
                  Saved Posts
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>

              <Link
                to="/register"
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
