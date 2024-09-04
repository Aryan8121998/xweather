import React, { useState } from 'react';

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
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter city name"
        aria-label="City name"
        aria-describedby="basic-addon2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button 
        className="btn btn-outline-secondary search-button mb-3" 
        type="button" 
        onClick={fetchWeather}
      >
        Search
      </button>
      {loading && <p>Loading data...</p>}
      <div className="weather-cards">
        {weatherData && (
          <div className="weather-card">
            <p className="label">Temperature</p>
            <p>{weatherData.current.temp_c}°C</p>
            <p className="label">Humidity</p>
            <p>{weatherData.current.humidity}%</p>
            <p className="label">Condition</p>
            <p>{weatherData.current.condition.text}</p>
            <p className="label">Wind Speed</p>
            <p>{weatherData.current.wind_kph}kph</p>
          </div>
        )}
      </div>
    </div>
  );
  
  
  
}

export default WeatherApp;
