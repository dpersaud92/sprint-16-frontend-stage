const BASE_URL = "http://localhost:3001";

function handleResponse(res) {
  if (res.ok) return res.json();
  return res.json().then((err) => Promise.reject(err));
}

// Local backend API
export const getArticles = async () => {
  const response = await fetch(`${BASE_URL}/articles`);
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
};

export const register = (email, password, username) =>
  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  }).then(handleResponse);

export const login = (email, password) =>
  fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);

export const getUserInfo = (token) =>
  fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);

// GNews API for live web search
export const fetchNewsArticles = async (query) => {
  const response = await fetch(
    `http://localhost:3001/news/search?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  const data = await response.json();
  return data.articles || [];
};
