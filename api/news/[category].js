import setCorsHeaders from "../cors.js";

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  const { category } = req.query; // Get category from query parameters

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

  try {
    const baseUrl =
      category === "topHeadlines"
        ? `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`
        : `https://newsapi.org/v2/top-headlines?category=${category}&country=us&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await fetch(baseUrl);

    // Check if the response is okay (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data.articles);
  } catch (error) {
    console.error("Error fetching category:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
