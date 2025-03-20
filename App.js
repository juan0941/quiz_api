import React from "react";
import { SafeAreaView } from "react-native";
import WeatherScreen from "./WeatherScreen";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WeatherScreen />
    </SafeAreaView>
  );
};

export default App;
