const API_URL = "http://localhost:5000/api/v1";

// Get all posts
export async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error("Posts load nahi ho paaye");
  }

  return response.json();
}

// Get single post
export async function getPostById(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error("Post not found");
  }

  return response.json();
}

// Create new post
export async function createPost(formData) {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Post create nahi ho payi");
  }

  return data;
}
