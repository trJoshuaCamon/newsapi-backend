import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export default async function handler(req, res) {
  // Set CORS headers to allow the frontend domain to access this endpoint
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins, change * to your frontend URL for stricter control.
  res.setHeader("Access-Control-Allow-Methods", "GET"); // Allow GET requests
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow Content-Type header

  // If the request is a preflight (OPTIONS request), return a 200 response.
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Make sure to decode the URL properly
    const decodedUrl = decodeURIComponent(url);

    // Fetch the content of the URL
    const articlePage = await fetch(decodedUrl);

    // Check if the response is successful
    if (!articlePage.ok) {
      throw new Error(`Failed to fetch URL: ${articlePage.status}`);
    }

    const text = await articlePage.text(); // Get the raw HTML
    const dom = new JSDOM(text, { url: decodedUrl });

    const article = new Readability(dom.window.document).parse();

    res.json({
      title: article.title,
      content: article.textContent,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch full article" });
  }
}
