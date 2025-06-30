const BASE_URL = "https://api.dpersaud.crabdance.com";

// Helper to handle API responses
function handleResponse(res) {
  if (res.ok) return res.json();
  return res.json().then((err) => Promise.reject(err));
}

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
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);

// GNews proxy search
export const fetchNewsArticles = async (query) => {
  const response = await fetch(
    `${BASE_URL}/news/search?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  const data = await response.json();
  return data.articles || [];
};

// Get test articles (e.g. from DB, not GNews)
export const getArticles = async () => {
  const response = await fetch(`${BASE_URL}/articles`);
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
};

export const getSavedArticles = (token) =>
  fetch(`${BASE_URL}/articles`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);

export const saveArticle = (token, article) =>
  fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  }).then(handleResponse);

export const deleteArticle = (token, articleId) =>
  fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);
