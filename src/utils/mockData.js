const mockArticles = [
  {
    id: 1,
    title: "Breaking News: React Is Still Awesome",
    description: "React remains the most loved UI library among developers.",
    source: "React Times",
    imageUrl: "https://via.placeholder.com/300x180?text=React+News",
    isSaved: false,
  },
  {
    id: 2,
    title: "Vite Makes Development Faster",
    description: "Developers enjoy lightning-fast startup times with Vite.",
    source: "JS Weekly",
    imageUrl: "https://via.placeholder.com/300x180?text=Vite+Rocks",
    isSaved: false,
  },
  {
    id: 3,
    title: "Frontend Trends 2025",
    description: "What's next for frontend development? Experts weigh in.",
    source: "Frontend Focus",
    imageUrl: "https://via.placeholder.com/300x180?text=Trends+2025",
    isSaved: false,
  },
];

export function getArticles(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockArticles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 1500); // simulate network delay
  });
}
