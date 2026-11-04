import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    // <nav className="flex items-center justify-between border-b px-6 py-4">
    //   <Link to="/" className="text-xl font-bold">
    //     BlogApp
    //   </Link>

    //   <div className="flex gap-4">
    //     <Link to="/" className="hover:text-blue-600">
    //       Home
    //     </Link>
    //     <Link to="/login" className="hover:text-blue-600">
    //       Login
    //     </Link>
    //     <Link to="/register" className="hover:text-blue-600">
    //       Register
    //     </Link>
    //   </div>
    // </nav>

    // Testing

    <nav>{user ? <p>Welcome, {user.name}</p> : <p>Please Login</p>}</nav>
  );
}

export default Navbar;
