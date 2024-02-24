import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    const API_KEY = '96da5e78f3704e21928191529242102';

    try {

      if(city.length > 5){
        const res = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=yes&alerts=no`,
        );

        const data = await res.json();

        if (data.location.name != null) setWeatherData(data);
      }
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Buscar ciudad"
        value={city}
        onChangeText={text => {
          setCity(text);
          fetchWeatherData(text);
        }}
      />
      
      {weatherData && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{weatherData.location.name}</Text>
          <Text style={styles.subTitle}>{weatherData.location.country}</Text>
          <View style={styles.divider}/>
          <Image source={{uri: 'https:' + weatherData.current.condition.icon}} style={{width: 50, height: 50}}/>
          <Text style={styles.weatherText}><Icon name="thermometer-outline" size={20} /> Temperature: {weatherData.current.temp_c}°C</Text>
          <Text style={styles.weatherText}><Icon name="water-outline" size={20} /> Humidity: {weatherData.current.humidity}%</Text>
          <Text style={styles.weatherText}><Icon name="speedometer-outline" size={20} /> Wind Speed: {weatherData.current.wind_kph} kph</Text>
          <Text style={styles.weatherText}><Icon name="compass-outline" size={20} /> Wind Direction: {weatherData.current.wind_dir}</Text>
          <Text style={styles.weatherText}><Icon name="barometer-outline" size={20} /> Pressure: {weatherData.current.pressure_mb} mb</Text>
          <Text style={styles.weatherText}><Icon name="umbrella-outline" size={20} /> Precipitation: {weatherData.current.precip_mm} mm</Text>
          <Text style={styles.weatherText}><Icon name="cloud-outline" size={20} /> Cloud Cover: {weatherData.current.cloud}%</Text>
          <Text style={styles.weatherText}><Icon name="eye-outline" size={20} /> Visibility: {weatherData.current.vis_km} km</Text>
          <Text style={styles.weatherText}><Icon name="sunny-outline" size={20} /> UV Index: {weatherData.current.uv}</Text>
          <Text style={styles.weatherText}><Icon name="leaf-outline" size={20} /> Wind Gust: {weatherData.current.gust_kph} kph</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6', // Light blue background for a weather app feel
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#191970', // Midnight blue color for the title
    marginTop: 20, // Add some margin at the top
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#191970', // Midnight blue border color
    borderRadius: 5,
    padding: 8,
    margin: 20,
    height: 35,
    width: '90%', // Reduce width to 90%
    alignSelf: 'center', // Center the text input
    backgroundColor: '#F0F8FF', // Alice blue background color for the text input
  },
  button: {
    backgroundColor: '#191970', // Midnight blue background color for the button
    width: 250,
    height: 35,
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '20%',
  },
  weatherText: {
    color: '#000080', // Navy color for the weather text
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10, // Add some vertical margin
  },
  weatherContainer: {
    backgroundColor: '#F0F8FF', // Alice blue background color for the weather container
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding inside the container
    margin: 20, // Margin around the container
    alignItems: 'center', // Center the items horizontally
  },
  card: {
    backgroundColor: '#F0F8FF', // Alice blue background color for the card
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding inside the card
    margin: 20, // Margin around the card
    alignItems: 'center', // Center the items horizontally
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, // Add some bottom margin
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
    marginVertical: 10, // Add some vertical margin
  },
});
