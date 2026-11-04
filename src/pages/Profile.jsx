import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/authService";

function Profile() {
  const { user, checkAuth } = useAuth();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("bio", bio);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      await updateProfile(formData);

      await checkAuth();

      setAvatar(null);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">My Profile</h1>

      {/* Profile Information */}
      <div className="mb-8 flex items-center gap-4">
        <img
          src={user.avatar || "https://placehold.co/100x100?text=User"}
          alt="Profile"
          className="h-24 w-24 rounded-full object-cover"
        />

        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>

          <p className="text-gray-500">{user.email}</p>

          <p className="text-sm capitalize text-blue-600">{user.role}</p>
        </div>
      </div>

      {/* Update Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block font-medium">Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Bio</label>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write something about yourself..."
            className="w-full rounded border p-3"
            rows="4"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Update Profile Picture
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="w-full rounded border p-3"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        {success && <p className="text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 p-3 text-white disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
