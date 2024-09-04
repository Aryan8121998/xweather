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
          <div className="weather-card">
            <div className="weather-details">
              <div>
                <p className="label">Temperature</p>
                <p>{weatherData.current.temp_c}°C</p>
              </div>
              <div>
                <p className="label">Humidity</p>
                <p>{weatherData.current.humidity}%</p>
              </div>
              <div>
                <p className="label">Condition</p>
                <p>{weatherData.current.condition.text}</p>
              </div>
              <div>
                <p className="label">Wind Speed</p>
                <p>{weatherData.current.wind_kph}kph</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  
}

export default WeatherApp;
