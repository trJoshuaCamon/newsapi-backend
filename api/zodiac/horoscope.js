import setCorsHeaders from "../cors.js";

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  try {
    const { sign, day } = req.query;

    // Validate zodiac sign
    const zodiacSigns = [
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
      "Aquarius",
      "Pisces",
    ];

    if (!zodiacSigns.includes(sign)) {
      return res.status(400).json({ error: "Invalid zodiac sign" });
    }

    // Construct the API URL for fetching horoscope
    const url = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=${day}`;

    const horoscopeResponse = await fetch(url);

    if (!horoscopeResponse.ok) {
      throw new Error("Failed to fetch horoscope data");
    }

    const horoscopeData = await horoscopeResponse.json();

    // Return horoscope data
    res.status(200).json({
      sign: sign,
      horoscope: horoscopeData.data.horoscope_data,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch horoscope data" });
  }
}
