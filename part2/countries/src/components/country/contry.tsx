import { useEffect, useState } from "react";
import { Country, WeatherForecast } from "../../shared/list";
import apiService from '../../services/api';

export interface ListItemProps {
  item: Country;
}

const CountryItem = ({ item }: ListItemProps) => {
  const [weatherData, setWeatherData] = useState<WeatherForecast>();

  useEffect(() => {
    apiService.forecast(item.latlng).then((res) => setWeatherData(res));
  }, [item.latlng]);


  return (
    <>
      <h1>{item.name.common}</h1>
      <br />
      <p>capital {item.capital}</p>
      <p>area {item.area}</p>
      <br />
      <p style={{ fontWeight: 700 }}>languages:</p>
      <ul>
        {Object.values(item.languages).map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
      <img src={item.flags.png} alt={item.flag} />
      <h2>Weather in {item.capital}</h2>
      <p>temperature {weatherData?.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} />
      <p>wind {weatherData?.wind.speed} m/s</p>
    </>
  );
};

export default CountryItem;
