import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Button } from 'react-native';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeather = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão negada. Usando localização padrão (São Paulo).');
        fetchWeather(-23.5505, -46.6333);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      fetchWeather(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      setLoading(false);
    }
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&timezone=auto`
      );
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Carregando previsão do tempo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text>
      <Text style={styles.info}>Temperatura atual: {weather.current_weather.temperature}°C</Text>
      <Button title="Ver previsão completa" onPress={() => navigation.navigate('Forecast', { weather })} />
    </View>
  );
}

function ForecastScreen({ route }) {
  const { weather } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão Estendida</Text>
      <FlatList
        data={weather.hourly.time.slice(0, 12)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.hourItem}>
            <Text style={styles.hourText}>{item.slice(11, 16)}h</Text>
            <Text>{weather.hourly.temperature_2m[index]}°C</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#007AFF' }, headerTintColor: '#fff' }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Previsão do Tempo' }} />
        <Stack.Screen name="Forecast" component={ForecastScreen} options={{ title: 'Previsão Completa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 6,
  },
  hourItem: {
    padding: 12,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  hourText: {
    fontWeight: 'bold',
  },
});

   
