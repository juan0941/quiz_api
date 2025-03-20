import React from "react";
import LottieView from "lottie-react-native";

const WeatherAnimation = ({ condition }) => {
  // animaciones según su condicion climatica
  const animations = {
    "Clear": require("./assets/cloudy.json"),
    "Sunny": require("./assets/sunny.json"),
    "Partly cloudy": require("./assets/partly_cloudy.json"),
    "Cloudy": require("./assets/cloudy.json"),
    "Overcast": require("./assets/cloudy.json"),
    "Rain": require("./assets/rain.json"),
    "Light rain": require("./assets/rain.json"),
    "Thunderstorm": require("./assets/thunderstorm.json"),
    "Snow": require("./assets/snow.json"),
    "Mist": require("./assets/mist.json"),
  };

  return (
    <LottieView
      source={animations[condition] || animations["Cloudy"]}
      autoPlay
      loop
      style={{ width: 250, height: 250 }}
    />
  );
};

export default WeatherAnimation;
