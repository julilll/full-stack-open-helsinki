import axios from 'axios';
import { Country } from '../shared/list';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/';

const getAll = () => {
    const request = axios.get(baseUrl + 'all');
    return request.then(res => res.data);
}

const search = (newObject: string) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(res => res.data);
}

const forecast = (lat: Country['latlng']) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat[0]}&lon=${lat[1]}&appid=${process.env.OPEN_WEATHER}&units=metric`);
    return request.then(res => res.data);
}

export default { getAll, search, forecast };