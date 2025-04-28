import setCorsHeaders from "../cors.js";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY; // Replace with your WeatherAPI key
const WEATHER_API_URL = "https://api.weatherapi.com/v1/current.json";

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  try {
    // Get query parameters for location (either lat/lon or city)
    const { city, lat, lon, unit = "metric" } = req.query; // Default unit to "metric"

    // If no location data is provided, return an error
    if (!city && (!lat || !lon)) {
      return res
        .status(400)
        .json({ error: "City or latitude/longitude is required" });
    }

    let url = `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&aqi=no&unit=${unit}`;

    // Construct the appropriate query for the API
    if (lat && lon) {
      url = `${url}&q=${lat},${lon}`;
    } else if (city) {
      url = `${url}&q=${city}`;
    }

    // Fetch the weather data from WeatherAPI
    const weatherResponse = await fetch(url);

    if (!weatherResponse.ok) {
      throw new Error(
        `Failed to fetch weather data: ${weatherResponse.status}`
      );
    }

    const weatherData = await weatherResponse.json();

    // If no data, return an error
    if (weatherData.error) {
      return res.status(400).json({ error: weatherData.error.message });
    }

    // Extract relevant weather data
    const { location, current } = weatherData;
    const weather = {
      city: location.name,
      temperature: unit === "metric" ? current.temp_c : current.temp_f,
      description: current.condition.text,
      icon: `https:${current.condition.icon}`,
      unit: unit === "metric" ? "°C" : "°F",
    };

    res.status(200).json(weather);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
