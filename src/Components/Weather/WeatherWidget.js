import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

function WeatherWidget() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        // Fetch weather data from an API
        fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY')
            .then(response => response.json())
            .then(data => setWeatherData(data))
            .catch(error => console.error('Error fetching the weather data:', error));
    }, []);

    return (

            <div className="weather-widget">
                <h2>Weather</h2>
                {weatherData ? (
                    <div>
                        <p>Location: {weatherData.name}</p>
                        <p>Temperature: {weatherData.main ? Math.round(weatherData.main.temp - 273.15) : 'N/A'}°C</p>
                        <p>Weather: {weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : 'N/A'}</p>
                    </div>
                ) : (
                    <p>Loading weather data...</p>
                )}
            </div>
    );
}

export default WeatherWidget;