import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Keyboard } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { fetchWeatherData } from './api/weather'; // Adjust path as per your file structure

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'Batangas', // Default city
      weatherData: null,
      initialRegion: {
        latitude: 13.7565, // Default latitude
        longitude: 121.164421, // Default longitude
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      },
      searchCity: '', // State to store the city being searched
    };
  }

  componentDidMount() {
    this.fetchWeatherDataForCity(this.state.city);
  }

  fetchWeatherDataForCity = async (city) => {
    try {
      const weatherData = await fetchWeatherData(city);
      const { coord } = weatherData;
      if (coord) {
        const { lat, lon } = coord;
        this.setState({
          weatherData,
          initialRegion: {
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          },
        });
      } else {
        console.error('Unable to fetch coordinates from weather data');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  handleSearch = async () => {
    Keyboard.dismiss(); // Dismiss keyboard on search
    const { searchCity } = this.state;
    if (searchCity) {
      await this.fetchWeatherDataForCity(searchCity);
      this.setState({ searchCity: '' }); // Clear input after search
    }
  }

  render() {
    const { weatherData, initialRegion, searchCity } = this.state;

    // Custom map style JSON object
    const customMapStyle = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ];

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={initialRegion} // Use 'region' instead of 'initialRegion'
          customMapStyle={customMapStyle} // Apply custom map style
        >
          {weatherData && (
            <Marker
              coordinate={{
                latitude: initialRegion.latitude,
                longitude: initialRegion.longitude,
              }}
              title={weatherData.name}
              pinColor={weatherData.weather[0].main === 'Clear' ? 'yellow' : weatherData.weather[0].main === 'Clouds' ? 'blue' : 'red'} // Marker color based on weather condition
            >
              <Callout>
                <View>
                  <Text style={styles.calloutTitle}>{weatherData.name}</Text>
                  <Text>Temperature: {weatherData.main.temp}°C</Text>
                  <Text>Humidity: {weatherData.main.humidity}%</Text>
                  <Text>Wind Speed: {weatherData.wind.speed} m/s</Text>
                  <Text>Clouds: {weatherData.clouds.all}%</Text>
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={searchCity}
            onChangeText={(text) => this.setState({ searchCity: text })}
            onSubmitEditing={this.handleSearch} // Handle search on submit
          />
          <Button
            title="Search"
            onPress={this.handleSearch}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    width: '100%',
  },
  input: {
    height: 40,
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
