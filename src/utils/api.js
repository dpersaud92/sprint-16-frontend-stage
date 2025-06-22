const BASE_URL = "http://localhost:3001";

// Move this UP here 👇
function handleResponse(res) {
  if (res.ok) return res.json();
  return res.json().then((err) => Promise.reject(err));
}

export const getArticles = async () => {
  const response = await fetch(`${BASE_URL}/articles`);
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
};

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then(handleResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const NEWS_API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export const fetchNewsArticles = async (query) => {
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - 7);

  const url = `${NEWS_API_BASE_URL}?q=${encodeURIComponent(
    query
  )}&from=${fromDate.toISOString()}&to=${toDate.toISOString()}&pageSize=100&apiKey=${NEWS_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch articles from News API");
  }

  return response.json();
};
