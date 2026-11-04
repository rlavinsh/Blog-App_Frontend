const API_URL = "http://localhost:5000/api/v1";

// Save a post
export async function savePost(postId) {
  const response = await fetch(`${API_URL}/saved-posts/${postId}`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Post save nahi ho payi");
  }

  return data;
}

// Get all saved posts
export async function getSavedPosts() {
  const response = await fetch(`${API_URL}/saved-posts`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Saved posts load nahi ho paaye");
  }

  return data;
}

// Remove a saved post
export async function unsavePost(postId) {
  const response = await fetch(`${API_URL}/saved-posts/${postId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Post remove nahi ho payi");
  }

  return data;
}
