import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b px-6 py-4">
      <Link to="/" className="text-xl font-bold">
        BlogApp
      </Link>

      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/login" className="hover:text-blue-600">
          Login
        </Link>
        <Link to="/register" className="hover:text-blue-600">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
