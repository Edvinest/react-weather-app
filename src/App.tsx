import { useState } from 'react';
import "./App.css"

const api = {
  key: import.meta.env.VITE_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
};


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key
        }`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  };

  const getDate = (d: Date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} | ${month} ${date} ${year}`
  }

  let className = '';

  if (typeof weather.main !== 'undefined') {
    switch (weather.weather[0].main) {
      case 'Clouds':
        className = 'app clouds';
        break;
      case 'Rain':
      case 'Drizzle':
        className = 'app rain';
        break;
      case 'Thunderstorm':
        className = 'app thunderstorm';
        break;
      case 'Snow':
        className = 'app snow';
        break;
      default:
        className = 'app';
    }
  }

  else { className = 'app' }

  return (
    <div className={className}>
      <div className="weather-app">
        <div className='search-container'>
          <input type="text"
            className='search-bar'
            placeholder='Search for location...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-container">
              <div className="first-segment">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{getDate(new Date())}</div>
              </div>
              <div className="second-segment">
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          </div>
        ) : ('')}
      </div>
    </div>
  )
}

export default App
