// api/article.js
const axios = require("axios");
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

export default async function handler(req, res) {
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
}
