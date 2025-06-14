import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import { getWeatherData } from 'services/weatherApi';

const WeatherWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null); // Holds API response

  // --- Mock / placeholder data --- //
  const mockCurrentWeather = {
    location: 'Agricultural Zone A',
    temperature: 24,
    condition: 'Partly Cloudy',
    humidity: 68,
    windSpeed: 12,
    uvIndex: 6,
    pressure: 1013,
    visibility: 10,
    icon: 'CloudSun',
  };

  const mockHourlyForecast = [
    { time: '12 PM', temp: 24, icon: 'Sun', condition: 'Sunny' },
    { time: '1 PM', temp: 26, icon: 'CloudSun', condition: 'Partly Cloudy' },
    { time: '2 PM', temp: 27, icon: 'CloudSun', condition: 'Partly Cloudy' },
    { time: '3 PM', temp: 28, icon: 'Cloud', condition: 'Cloudy' },
    { time: '4 PM', temp: 26, icon: 'CloudRain', condition: 'Light Rain' },
    { time: '5 PM', temp: 24, icon: 'CloudRain', condition: 'Light Rain' },
  ];

  const mockWeeklyForecast = [
    { day: 'Today', high: 28, low: 18, icon: 'CloudSun', condition: 'Partly Cloudy' },
    { day: 'Tomorrow', high: 30, low: 20, icon: 'Sun', condition: 'Sunny' },
    { day: 'Wednesday', high: 27, low: 19, icon: 'CloudRain', condition: 'Light Rain' },
    { day: 'Thursday', high: 25, low: 17, icon: 'Cloud', condition: 'Cloudy' },
    { day: 'Friday', high: 29, low: 21, icon: 'Sun', condition: 'Sunny' },
  ];

  // Clock tick every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper to fetch weather using Geolocation (or fallback)
  const fetchAndSetWeather = useCallback(() => {
    const handleFetch = async (lat, lon) => {
      const data = await getWeatherData({ lat, lon });
      setWeatherData(data); // may be null – handled later
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => handleFetch(pos.coords.latitude, pos.coords.longitude),
        () => handleFetch(0, 0) // fallback to equator – will still return something
      );
    } else {
      handleFetch(0, 0);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchAndSetWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Detect whether the data came from WeatherAPI.com (has 'forecast' key) or fallback to OpenWeather structure
  const isWeatherApiFormat = weatherData && 'forecast' in weatherData;

  const currentWeather = weatherData
    ? isWeatherApiFormat
      ? {
          location: weatherData.location?.name ?? 'Current Location',
          temperature: Math.round(weatherData.current?.temp_c ?? 0),
          condition: weatherData.current?.condition?.text ?? '',
          humidity: weatherData.current?.humidity,
          windSpeed: weatherData.current?.wind_kph,
          uvIndex: weatherData.current?.uv,
          pressure: weatherData.current?.pressure_mb,
          visibility: weatherData.current?.vis_km,
          icon: 'Sun',
        }
      : {
          location: weatherData.timezone || 'Current Location',
          temperature: Math.round(weatherData.current.temp),
          condition: weatherData.current.weather[0].description,
          humidity: weatherData.current.humidity,
          windSpeed: weatherData.current.wind_speed,
          uvIndex: weatherData.current.uvi,
          pressure: weatherData.current.pressure,
          visibility: weatherData.current.visibility
            ? Math.round(weatherData.current.visibility / 1000)
            : null,
          icon: 'Sun',
        }
    : mockCurrentWeather;

  const hourlyForecast = weatherData
    ? isWeatherApiFormat
      ? weatherData.forecast?.forecastday?.[0]?.hour?.slice(0, 6).map((h) => ({
          time: new Date(h.time).toLocaleTimeString([], { hour: 'numeric' }),
          temp: Math.round(h.temp_c),
          icon: 'Sun',
          condition: h.condition?.text,
        })) ?? []
      : weatherData.hourly.slice(0, 6).map((h) => ({
          time: new Date(h.dt * 1000).toLocaleTimeString([], { hour: 'numeric' }),
          temp: Math.round(h.temp),
          icon: 'Sun', // TODO map icon
          condition: h.weather[0].main,
        }))
    : mockHourlyForecast;

  const weeklyForecast = weatherData
    ? isWeatherApiFormat
      ? weatherData.forecast?.forecastday?.slice(0, 5).map((d, idx) => ({
          day:
            idx === 0
              ? 'Today'
              : new Date(d.date).toLocaleDateString([], { weekday: 'long' }),
          high: Math.round(d.day?.maxtemp_c),
          low: Math.round(d.day?.mintemp_c),
          icon: 'Sun',
          condition: d.day?.condition?.text,
        })) ?? []
      : weatherData.daily.slice(0, 5).map((d, idx) => ({
          day:
            idx === 0
              ? 'Today'
              : new Date(d.dt * 1000).toLocaleDateString([], { weekday: 'long' }),
          high: Math.round(d.temp.max),
          low: Math.round(d.temp.min),
          icon: 'Sun', // TODO map icon
          condition: d.weather[0].main,
        }))
    : mockWeeklyForecast;

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
            Weather Conditions
          </h2>
          <p className="text-text-secondary font-body text-sm">
            Real-time weather affecting operations
          </p>
        </div>
        
        <button
          onClick={fetchAndSetWeather}
          aria-label="Refresh weather data"
          className="text-text-secondary hover:text-text-primary transition-quick"
        >
          <Icon name="RefreshCw" size={16} />
        </button>
      </div>

      {/* Current Weather */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-body font-medium text-text-primary text-sm mb-1">
                {currentWeather.location}
              </h3>
              <p className="text-text-secondary font-body text-xs">
                {formatDate(currentTime)}
              </p>
              <p className="text-text-secondary font-body text-xs">
                {formatTime(currentTime)}
              </p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name={currentWeather.icon} size={32} color="var(--color-primary)" />
                <span className="text-3xl font-heading font-bold text-primary">
                  {currentWeather.temperature}°C
                </span>
              </div>
              <p className="text-text-secondary font-body text-xs">
                {currentWeather.condition}
              </p>
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Icon name="Droplets" size={16} color="var(--color-secondary)" />
              <div>
                <p className="text-text-secondary font-body text-xs">Humidity</p>
                <p className="font-body font-medium text-sm text-text-primary">
                  {currentWeather.humidity}%
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Wind" size={16} color="var(--color-secondary)" />
              <div>
                <p className="text-text-secondary font-body text-xs">Wind</p>
                <p className="font-body font-medium text-sm text-text-primary">
                  {currentWeather.windSpeed} km/h
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Sun" size={16} color="var(--color-warning)" />
              <div>
                <p className="text-text-secondary font-body text-xs">UV Index</p>
                <p className="font-body font-medium text-sm text-text-primary">
                  {currentWeather.uvIndex}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Gauge" size={16} color="var(--color-secondary)" />
              <div>
                <p className="text-text-secondary font-body text-xs">Pressure</p>
                <p className="font-body font-medium text-sm text-text-primary">
                  {currentWeather.pressure} hPa
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hourly Forecast */}
      <div className="mb-6">
        <h4 className="font-body font-medium text-text-primary text-sm mb-3">
          Hourly Forecast
        </h4>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {hourlyForecast.map((hour, index) => (
            <motion.div
              key={hour.time}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 bg-background rounded-lg p-3 text-center min-w-[80px]"
            >
              <p className="text-text-secondary font-body text-xs mb-2">
                {hour.time}
              </p>
              <Icon 
                name={hour.icon} 
                size={20} 
                color="var(--color-primary)" 
                className="mx-auto mb-2"
              />
              <p className="font-body font-medium text-sm text-text-primary">
                {hour.temp}°
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weekly Forecast */}
      <div>
        <h4 className="font-body font-medium text-text-primary text-sm mb-3">
          5-Day Forecast
        </h4>
        <div className="space-y-2">
          {weeklyForecast.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-background transition-quick"
            >
              <div className="flex items-center space-x-3">
                <Icon name={day.icon} size={16} color="var(--color-primary)" />
                <div>
                  <p className="font-body font-medium text-sm text-text-primary">
                    {day.day}
                  </p>
                  <p className="text-text-secondary font-body text-xs">
                    {day.condition}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-body font-medium text-sm text-text-primary">
                  {day.high}° / {day.low}°
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weather Alert */}
      <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-body font-medium text-warning text-xs mb-1">
              Weather Advisory
            </h5>
            <p className="text-text-secondary font-body text-xs leading-relaxed">
              Light rain expected this afternoon. Consider adjusting outdoor work schedules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;