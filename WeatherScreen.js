import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getWeather } from "./weatherService";
import { countries, citiesByCountry } from "./locationData";
import Ionicons from 'react-native-vector-icons/Ionicons';
import WeatherAnimation from "./WeatherAnimation";

const WeatherScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0].name);
  const [selectedCity, setSelectedCity] = useState(citiesByCountry[countries[0].name][0]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPickers, setShowPickers] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);


  {/*Traducir a español cada condicion climatica */}
  const conditionTranslations = {
    "Clear": "Despejado",
    "Sunny": "Soleado",
    "Partly cloudy": "Parcialmente nublado",
    "Cloudy": "Nublado",
    "Overcast": "Cielo cubierto",
    "Mist": "Niebla",
    "Rain": "Lluvia",
    "Thunderstorm": "Tormenta",
    "Snow": "Nieve",
    "Hail": "Granizo",
    "Light rain": "Lluvia ligera"
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      const data = await getWeather(selectedCity);
      setWeather(data);
      setLoading(false);
    };
    fetchWeather();
  }, [selectedCity]);

  
  const backgroundColor = isDarkMode ? "#1a1a1a" : "#f5f7fa";
  const headerColor = isDarkMode ? "#f5f7fa" : "#1a1a1a";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: headerColor }]}>Clima</Text>

      {/* Botón de modo oscuro */}
      <TouchableOpacity
        style={styles.darkModeButton}
        onPress={() => setIsDarkMode(!isDarkMode)}
      >
        <Ionicons
          name={isDarkMode ? "sunny" : "moon"}
          size={30}
          color={isDarkMode ? "#FFEB3B" : "#3b3b3b"}
        />
      </TouchableOpacity>

      {/* Botón de cerrar la información */}
      {showInfo && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            setShowInfo(false);
            setShowPickers(true);
          }}
        >
          <Ionicons name="close" size={30} color="#ff4d4d" />
        </TouchableOpacity>
      )}

      {/* Información sobre Clima */}
      {showInfo && (
        loading ? (
          <ActivityIndicator size="large" color={isDarkMode ? "#fff" : "#0000ff"} />
        ) : (
          weather && (
            <View style={[styles.weatherContainer, 
                          { 
                            shadowColor: isDarkMode ? "#000" : "#aaa" 
                          }]}>
              <Text style={[styles.weatherText, { color: headerColor }]}>
                {weather.location.name}, {weather.location.country}
              </Text>
              
              
              <WeatherAnimation condition={weather.current.condition.text} />

              <Text style={[styles.temperature, { color: headerColor }]}>
                {weather.current.temp_c}°C
              </Text>

              <Text style={[styles.condition, { color: isDarkMode ? "#ccc" : "#555" }]}>
                {conditionTranslations[weather.current.condition.text] || weather.current.condition.text}
              </Text>

              <Text style={[styles.localTime, { color: isDarkMode ? "#bbb" : "#777" }]}>
                Hora local: {weather.location.localtime}
              </Text>
            </View>
          )
        )
      )}

      {/* Selector de país y ciudad */}
      {showPickers && (
        <>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => {
              setShowInfo(true);
              setShowPickers(false);
            }}
          >
            <Ionicons name="arrow-forward" size={30} color="#303030" />

          </TouchableOpacity>

          <Text style={[styles.label, { color: headerColor }]}>Selecciona un país:</Text>
          <Picker
            selectedValue={selectedCountry}
            onValueChange={(value) => {
              setSelectedCountry(value);
              setSelectedCity(citiesByCountry[value][0]);
            }}
            style={styles.picker}
          >
            {countries.map((country) => (
              <Picker.Item key={country.code} label={country.name} value={country.name} />
            ))}
          </Picker>

          <Text style={[styles.label, { color: headerColor }]}>Selecciona una ciudad:</Text>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(value) => setSelectedCity(value)}
            style={styles.picker}
          >
            {citiesByCountry[selectedCountry].map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32, 
    fontWeight: "bold", 
    marginBottom: 20,
  },
  darkModeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 4,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: "transparent",
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 4,
  },
  arrowButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 4,
  },
  label: { 
    fontSize: 18, 
    marginBottom: 5,
    alignSelf: "flex-start",
    marginLeft: 10,
    fontWeight: "bold",
  },
  picker: { 
    height: 50, 
    width: "90%", 
    marginBottom: 220,
  },
  weatherContainer: { 
    width: "100%",
    padding: 20, 
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  weatherText: { 
    fontSize: 24, 
    fontWeight: "600", 
    marginBottom: 10,
    fontWeight: "bold",
  },
  temperature: { 
    fontSize: 48, 
    fontWeight: "bold",
    marginVertical: 10,
  },
  condition: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  localTime: { 
    fontSize: 16,
    fontWeight: "bold",
    marginTop:10,
  },
});

export default WeatherScreen;
