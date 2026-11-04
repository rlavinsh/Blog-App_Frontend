import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import SavedPosts from "./pages/SavedPosts";
import AdminDashboard from "./pages/AdminDashboard";
import ManagePosts from "./pages/ManagePosts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved-posts" element={<SavedPosts />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/posts" element={<ManagePosts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
