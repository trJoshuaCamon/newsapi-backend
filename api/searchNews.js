export default async function handler(req, res) {
  // Set CORS headers to allow the frontend domain to access this endpoint
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins, change * to your frontend URL for stricter control.
  res.setHeader("Access-Control-Allow-Methods", "GET"); // Allow GET requests (change if you support other methods)
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow Content-Type and Authorization headers (if you use Authorization header)
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies) if needed (only if your frontend needs cookies)

  // If the request is a preflight (OPTIONS request), return a 200 response.
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { q } = req.query; // Get the query from the frontend request

  if (!q) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const API_KEY = process.env.NEWS_API_KEY; // Make sure your API key is set in Vercel environment variables
  const NEWS_API_URL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    q
  )}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(NEWS_API_URL);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Error fetching data from NewsAPI" });
    }

    const data = await response.json();
    res.status(200).json(data); // Return the NewsAPI response to the frontend
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
