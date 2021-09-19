import Header from './header';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import {
  Keyboard,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

function Signup(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {
    try {
      if (name.length === 0) {
        alert('Please fill out Name');
        return;
      }
      if (
        email.length <= 6 ||
        !email.includes('@') ||
        !email.includes('.com')
      ) {
        alert('Please fill Email');

        return;
      }
      if (password.length === 0) {
        alert('Please fill Password');
        return;
      }
      let payload = {
        name: name,
        email: email,
        password: password,
      };
      console.log(payload);
    } catch (error) {
      console.log('Handle Submit Error');
    }
  };

  let { navigation } = props;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <Header navigation={navigation} />
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.message}>Sign up to continue!</Text>

          <TextInput
            style={styles.input}
            type='Name'
            placeholder='Name'
            onChangeText={(name) => setName(name)}
            value={name}
            required='True'
          ></TextInput>

          <TextInput
            style={styles.input}
            type='email'
            placeholder='Email'
            onChangeText={(email) => setEmail(email)}
            value={email}
          ></TextInput>

          <TextInput
            style={styles.input}
            type='password'
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            value={password}
          ></TextInput>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit()}
          >
            <Text>Sign Up!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '75%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 2,
    backgroundColor: 'lightgreen',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: 'orange',
    width: 200,
    alignSelf: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '35%',
  },
  welcome: {
    fontSize: 24,
    textAlign: 'left',
  },
  message: {
    marginTop: 4,
    fontSize: 20,
    textAlign: 'right',
  },
});

export default Signup;
