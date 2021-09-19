import { useNavigation } from '@react-navigation/native';
import React, { useState, createRef } from 'react';
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

import Header from './header';

function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}

function Signin(props) {
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
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 240,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
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
  test: {
    fontSize: 30,
    fontWeight: '500',

    borderBottomColor: 'black',
    height: 30,
    borderBottomWidth: 2,
    marginTop: 15,
  },
});

export default Signin;
