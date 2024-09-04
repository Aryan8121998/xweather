// WeatherCard.js
import React from 'react';

function WeatherCard({ title, data }) {
  return (
    <div className="weather-card">
      <p className="label">{title}</p>
      <p>{data}</p>
    </div>
  );
}

export default WeatherCard;
