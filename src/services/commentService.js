const API_URL = "http://localhost:5000/api/v1";

export async function getComments(postId) {
  const response = await fetch(`${API_URL}/comments/${postId}`);

  if (!response.ok) {
    throw new Error("Comments load nahi ho paaye");
  }

  return response.json();
}
