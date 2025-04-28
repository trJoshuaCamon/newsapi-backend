---

## NewsAPI Project

### Project Description
This project provides a full-stack application that allows users to get real-time news, weather updates, stock market data, and zodiac horoscopes. The frontend is built using React, with the backend serving API data, including articles, weather, stock quotes, and more.

### Added Features (04/28/2025)
- **Market Overview (Stocks Widget)**: Displays live stock data and includes caching for better performance.
- **Improved UI**: Redesigned user interface for a more modern and streamlined experience.
- **Continuous Scrolling with Lazy Loading**: News articles and other data are fetched progressively as the user scrolls down, improving performance and user experience.
- **Location-based Weather**: Uses the device's location to fetch weather updates specific to that location.
- **Full Article Scraping**: Full scraped articles are cached for quick loading and repeated access.

---

## Frontend Setup

### Requirements

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the frontend repository:

   ```bash
   git clone https://github.com/trJoshuaCamon/newsapi-frontend.git
   cd newsapi-frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173` to view the app.

### Running the app in production mode

1. Build the app:

   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

---

## Backend Setup

### Requirements

- Node.js (v18+ recommended)

### Installation

1. Clone the backend repository:

   ```bash
   git clone https://github.com/trJoshuaCamon/newsapi-backend.git
   cd newsapi-backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm start
   ```

4. The backend server will be running at `http://localhost:3000`.

---

## Notes

- Ensure that both the frontend and backend are running concurrently for the application to work.
- You can modify the environment variables in the `.env` file for customizing API keys and settings.

---

## License

This project is licensed under the MIT License.

---

### Environment Variables

#### Frontend (.env)

```
VITE_BACKEND_BASE_URL=http://localhost:3000
```

#### Backend (.env)

```
NEWS_API_KEY=your_news_api_key_here
WEATHER_API_KEY=your_weather_api_key_here
FINNHUB_BASE_URL=your_finnhub_base_url_here
FINNHUB_API_KEY=your_finnhub_api_key_here
```

---
