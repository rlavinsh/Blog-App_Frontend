const API_URL = "http://localhost:5000/api/v1";

export async function getPosts() {
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error("Posts load nahi ho paaye");
  }

  return response.json();
}

export async function getPostById(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error("Post not found");
  }

  return response.json();
}
