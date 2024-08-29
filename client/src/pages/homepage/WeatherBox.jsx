import React, { useEffect, useState } from "react"

const WeatherBox = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(false)
  const APIkey = "f6885bd9bee5ff2536e827512e05707f"
  const city = "Taichung"

  useEffect(() => {
    if (city === "") return

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.cod === "404") {
          setError(true)
          setWeatherData(null)
        } else {
          setError(false)
          setWeatherData(json)
        }
      })
      .catch(() => {
        setError(true)
        setWeatherData(null)
      })
  }, [city])

  return (
    <div className="weatherBox">
      {error ? (
        <div className="notFound fadeIn">
          <p>Ah!</p>
        </div>
      ) : (
        weatherData && (
          <div className="weather fadeIn">
            <img
              src={
                weatherData.weather[0].main === "Clear"
                  ? "/homepage/clear.png"
                  : weatherData.weather[0].main === "Rain"
                  ? "/homepage/rain.png"
                  : weatherData.weather[0].main === "Clouds"
                  ? "/homepage/clouds.png"
                  : "/homepage/clear.png"
              }
              alt={weatherData.weather[0].description}
            />
            <div className="rightBox">
              <p className="temperature">
                {parseInt(weatherData.main.temp)}
                <span>°C</span>
              </p>
              <p className="description">
                {weatherData.weather[0].description}
              </p>
            </div>
            <div className="detail fadeIn">
              <div className="humidity">
                <i className="fa-solid fa-water"></i>
                <div className="text">
                  <span>{weatherData.main.humidity}%</span>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="wind">
                <i className="fa-solid fa-wind"></i>
                <div className="text">
                  <span>{parseInt(weatherData.wind.speed)} km/h</span>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default WeatherBox
