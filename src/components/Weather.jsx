import React, { useEffect } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';




const Weather = () => {

  const [weatherData , setWeatherData] = useEffect(false);

  const search = async (city) => {
    try {
      const apiKey = import.meta.env.VITE_APP_ID;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}& units=metric&appid=${apiKey}`;
  
      console.log('Constructed URL:', url); // Log the URL to check if it's correct
  
      const response = await fetch(url);
  
      // Check if the response status is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Weather data:', data);
      setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),

      })
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  
  useEffect(()=>{
    search("London");
  },[])
  return (
    <div className='weather'>
        <div className="search-bar">
            <input type="text"  placeholder='Search'/>
            <img src={search_icon} alt="" />
        </div>
      <img src= {clear_icon}alt="" className='weather-icon' />
      <p className='temperature'>16°c</p>
      <p className='location'>India</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>91 %</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>3.6 Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
