import React, { useState } from 'react';
import './App.css';
import WeatherCard from './WeatherCard';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);
    setWeatherData(null);

    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=e7dc346b4bf449a3ba1171918240309&q=${city}`);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          aria-label="City name"
          aria-describedby="basic-addon2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="input-group-append">
          <button 
            className="btn btn-outline-secondary search-button" 
            type="button" 
            onClick={fetchWeather}
          >
            Search
          </button>
        </div>
      </div>
      {loading && <p>Loading data...</p>}
      <div className="weather-cards">
        {weatherData && (
          <>
            <WeatherCard title="Temperature" data={`${weatherData.current.temp_c}°C`} />
            <WeatherCard title="Humidity" data={`${weatherData.current.humidity}%`} />
            <WeatherCard title="Condition" data={weatherData.current.condition.text} />
            <WeatherCard title="Wind Speed" data={`${weatherData.current.wind_kph} kph`} />
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
