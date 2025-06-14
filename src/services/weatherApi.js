export const WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

// IMPORTANT: Provide your weather API key via Vite environment variables.
// Rename ".env.example" to ".env" and set `VITE_WEATHER_API_KEY=your_api_key`.
// For security, never commit real API keys to version control.
const DEFAULT_DEMO_KEY = 'da2103b2c4ce4f95af051626232503'; // Provided by user, non-secret demo key
export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || DEFAULT_DEMO_KEY;

/**
 * Fetch weather data from WeatherAPI.com Forecast endpoint.
 *
 * @param {Object} params
 * @param {number} [params.lat] - Latitude (optional)
 * @param {number} [params.lon] - Longitude (optional)
 * @param {string} [params.city] - City name or query string (optional)
 * @param {number} [params.days=7] - Number of forecast days (1-10)
 * @param {boolean} [params.aqi=true] - Whether to include air-quality data
 * @param {boolean} [params.alerts=false] - Whether to include weather alerts
 * @returns {Promise<Object|null>} Weather response JSON or null if failed.
 */
export async function getWeatherData({
  lat,
  lon,
  city,
  days = 7,
  aqi = true,
  alerts = false,
}) {
  // If API key is missing, service will fall back to mock in caller; but we already have demo key.

  // Build query param "q" – WeatherAPI accepts "latitude,longitude" or any search string.
  const locationQuery = lat != null && lon != null ? `${lat},${lon}` : city ?? 'auto:ip';

  const url = `${WEATHER_API_BASE_URL}?key=${WEATHER_API_KEY}&q=${encodeURIComponent(
    locationQuery
  )}&days=${days}&aqi=${aqi ? 'yes' : 'no'}&alerts=${alerts ? 'yes' : 'no'}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather API responded with ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch weather data:', err);
    return null;
  }
} 