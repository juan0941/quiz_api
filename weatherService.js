import axios from "axios";

const API_KEY = "da1b9240c9f547f98b424349251403";
const BASE_URL = "http://api.weatherapi.com/v1";

export const getWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: city,
        aqi: "no",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
