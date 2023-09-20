import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import "../style.css"

const Temp = () => {
  const [searchValue, setSearchValue] = useState("pune");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=f2cdbf622206855decce2fad22c5bab4`;

      let res = await fetch(url);
      let data = await res.json();
      setTempInfo(data);
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      setSearchValue("");

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);


  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
          {tempInfo.cod=== "404" &&  <h1 style={{color:"white",textTransform:"capitalize",paddingLeft:"10px"}}>{tempInfo.message}</h1>}
        </div>
      </div>
      

      {/* our temp card  */}
      <WeatherCard {...tempInfo} />
    </>
  );
};

export default Temp;
