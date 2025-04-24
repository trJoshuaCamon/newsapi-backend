import setCorsHeaders from "../../cors.js";

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  const { symbol } = req.query; // Get symbol from query parameters

  try {
    const baseUrl = `${process.env.FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`;

    const response = await fetch(baseUrl);

    // Check if the response is okay (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(
      `Error fetching Profile Name of the ticker symbol: ${symbol}`,
      error.message
    );
    res
      .status(500)
      .json({ error: `Failed to fetch profile of the symbol: ${symbol}` });
  }
}
