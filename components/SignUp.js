import { NavigationContainer } from '@react-navigation/native';
import React, { useState, createRef } from 'react';
import {
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function Signup() {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });
  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleSubmit = () => {
    if (name === '') {
      alert('Please fill out Name');
      return;
    }
    if (email === '') {
      alert('Please fill Email');
      alert('Here');
      return;
    }
    if (password === '') {
      alert('Please fill Password');
      return;
    }
    let payload = {
      name: setName,
      email: email,
      password: password,
    };
    console.log(payload);
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        type='Name'
        value={name}
        placeholder='Enter Your Name'
        setName={name}
        required='True'
      ></TextInput>

      <TextInput
        style={styles.input}
        type='email'
        value={email}
        placeholder='Email'
        onChangeText={(val) => textInputChange(val)}
      ></TextInput>

      <TextInput
        style={styles.input}
        type='password'
        value={email}
        placeholder='Password'
        secureTextEntry={true}
        onChangeText={(val) => handlePasswordChange(val)}
      ></TextInput>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text>Sign Up!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            marginTop: 15,
          },
        ]}
      >
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 240,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: 'orange',
    width: 200,
    alignSelf: 'center',
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },
});

export default Signup;
