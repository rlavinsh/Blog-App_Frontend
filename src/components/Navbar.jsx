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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <Link to="/" className="text-xl font-bold text-blue-600">
        BlogApp
      </Link>

      <div className="flex items-center gap-5">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/profile">Profile</Link>

            <button
              onClick={handleLogout}
              className="rounded bg-red-600 px-4 py-2 text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
