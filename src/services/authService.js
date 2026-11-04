const API_URL = "http://localhost:5000/api/v1";

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login nahi ho paya");
  }

  return data;
}

// Logout Service

export async function logoutUser() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout nahi ho paya");
  }

  return data;
}

// Register the User

export async function registerUser(formData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration nahi ho paya");
  }

  return data;
}
