require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/news/:category", async (req, res) => {
  const { category } = req.params;

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

    const response = await axios.get(baseUrl);
    res.json(response.data.articles);
  } catch (error) {
    console.error("Error fetching category:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Route to scrape full article content
app.get("/article", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "URL is required" });

    const articlePage = await axios.get(url);
    const dom = new JSDOM(articlePage.data, { url });

    const article = new Readability(dom.window.document).parse();

    res.json({
      title: article.title,
      content: article.textContent,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch full article" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
