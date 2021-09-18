import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/header';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Configuration from './components/config';

function HomeScreen(props) {
  let { navigation } = props;
  return (
    <View style={styles.container}>
      <Header />
      <SignUp />
      <Button title='Settings' onPress={() => navigation.navigate('Config')} />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  );
}
