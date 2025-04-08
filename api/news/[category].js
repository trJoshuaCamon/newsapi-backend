const axios = require("axios");

module.exports = async (req, res) => {
  const {
    query: { category },
  } = req;

  const validCategories = [
    "topHeadlines",
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  if (!validCategories.includes(category)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  const baseUrl =
    category === "topHeadlines"
      ? `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${apiKey}`
      : `https://newsapi.org/v2/top-headlines?category=${category}&country=us&pageSize=100&apiKey=${apiKey}`;

  try {
    const response = await axios.get(baseUrl);
    return res.status(200).json(response.data.articles);
  } catch (error) {
    console.error("Error fetching category:", error.message);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
};
