import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      fullname: '',
      age: '',
      password: '',
      secureTextEntry: true,
    };
  }

  Register = () => {
    const { email, fullname, age, password } = this.state;

    if (email.length === 0 || fullname.length === 0 || age.length === 0 || password.length === 0) {
      alert("Required Field is Missing");
    } else {
      const InsertAPIURL = "http://192.168.0.58/sherylApi/api/insert.php";

      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      const Data = {
        email: email,
        fullname: fullname,
        age: age,
        password: password
      };

      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((response) => response.json())
      .then((response) => {
        alert(response[0].Message);
      })
      .catch((error) => {
        alert("Error: " + error);
      });

      this.props.navigation.navigate("login");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/cloud.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TextInput
          placeholder={"Email"}
          placeholderTextColor={"tomato"}
          style={styles.input}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          placeholder={"Fullname"}
          placeholderTextColor={"tomato"}
          style={styles.input}
          onChangeText={fullname => this.setState({ fullname })}
        />
        <TextInput
          placeholder={"Age"}
          placeholderTextColor={"tomato"}
          style={styles.input}
          onChangeText={age => this.setState({ age })}
        />
        <TextInput
          placeholder={"Password"}
          placeholderTextColor={"tomato"}
          style={[styles.input, styles.passwordInput]}
          secureTextEntry={this.state.secureTextEntry}
          onChangeText={password => this.setState({ password })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.Register}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFC0CB', // Light pink background
  },
  logo: {
    width: 500, // Adjust width as needed
    height: 400, // Adjust height as needed
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'tomato',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
  },
  passwordInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust transparency as needed
  },
  button: {
    backgroundColor: '#FF69B4', // Pink color
    borderRadius: 20, // Oval shape by setting border radius to half of button height
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
