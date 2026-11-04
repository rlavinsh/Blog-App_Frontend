const API_URL = "http://localhost:5000/api/v1";

export async function getComments(postId) {
  const response = await fetch(`${API_URL}/comments/${postId}`);

  if (!response.ok) {
    throw new Error("Comments load nahi ho paaye");
  }

  return response.json();
}

// Adding the comment service

export async function addComment(postId, content) {
  const response = await fetch(`${API_URL}/comments/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ content }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Comment add nahi ho paya");
  }

  return data;
}

// delete the comment

export async function deleteComment(commentId) {
  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Comment delete nahi ho paya");
  }

  return data;
}
