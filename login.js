import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', password: '', secureTextEntry: true };
  }

  Register = () => {
    let email = this.state.email;
    let password = this.state.password;

    if (email.length === 0 || password.length === 0) {
      alert("Required Field is Missing");
    } else {
      // Replace with your API handling logic
      alert("Logging in...");
      this.props.navigation.navigate("weather"); // Navigate to the next screen after login
    }
  }

  register = () => {
    this.props.navigation.navigate("register");
  }

  render() {
    return (
      <ImageBackground
        source={require('./assets/ulap44.jpg')} // Adjust path to your background image
        style={styles.background}
        imageStyle={{ opacity: 0.5 }} // Set low opacity to make the background subtle
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            {/* Your logo image component */}
            <Image
              source={require('./assets/cloudlogo.png')} // Adjust path to your logo image
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={"Email"}
              placeholderTextColor={"tomato"}
              style={styles.input}
              onChangeText={email => this.setState({ email })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={"Password"}
              placeholderTextColor={"tomato"}
              style={styles.input}
              secureTextEntry={this.state.secureTextEntry}
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.Register}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={this.register}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' as needed
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 50,
  },
  logo: {
    width: 500, // Adjust width and height as needed
    height: 500,
  },
  inputContainer: {
    backgroundColor: '#fff', // White background for input boxes
    borderWidth: 1,
    borderColor: 'tomato',
    marginBottom: 20,
    borderRadius: 5,
    width: '100%',
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FF69B4', // Pink color
    borderRadius: 20, // Oval shape
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '45%', // Adjust width as needed for spacing
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
