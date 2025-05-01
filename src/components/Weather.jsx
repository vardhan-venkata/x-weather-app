import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setError("");
    setLoading(true);

    const API_KEY = "a342791fe8e942f68e0114743250105";
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    try {
      const response = await axios.get(API_URL);

      setTimeout(() => {
        setWeather(response.data);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setError(alert("Failed to fetch weather data."));
        setWeather(null);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div style={styles.weatherContainer}>
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={fetchWeather} style={styles.searchButton}>
          Search
        </button>
      </div>

      {loading && <p style={styles.loadingMessage}>Loading data...</p>}

      {error && <p style={styles.errorMessage}>{error}</p>}

      {weather && !loading && (
        <div className="weather-cards">
          <WeatherCard
            title="Temperature"
            value={`${weather.current.temp_c}°C`}
          />
          <WeatherCard
            title="Humidity"
            value={`${weather.current.humidity}%`}
          />
          <WeatherCard
            title="Condition"
            value={weather.current.condition.text}
          />
          <WeatherCard
            title="Wind Speed"
            value={`${weather.current.wind_kph} kph`}
          />
        </div>
      )}
    </div>
  );
};
const WeatherCard = ({ title, value }) => {
  const [hovered, setHovered] = useState(false);

  const baseStyle = {
    backgroundColor: hovered ? "#4ff9ff" : "#a8fbff",
    padding: "15px",
    borderRadius: "20px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
    minWidth: "120px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div
      style={baseStyle}
      className="weather-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default Weather;

const styles = {
  weatherContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  searchInput: {
    width: "250px",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  searchButton: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loadingMessage: {
    fontSize: "20px",
    color: "white",
    fontWeight: "700",
    marginTop: "10px",
  },
  errorMessage: {
    color: "red",
  },
};
