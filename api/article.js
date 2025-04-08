const axios = require("axios");
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const articlePage = await axios.get(url);
    const dom = new JSDOM(articlePage.data, { url });
    const article = new Readability(dom.window.document).parse();

    return res.status(200).json({
      title: article.title,
      content: article.textContent,
    });
  } catch (error) {
    console.error("Error fetching article:", error.message);
    return res.status(500).json({ error: "Failed to fetch full article" });
  }
};
