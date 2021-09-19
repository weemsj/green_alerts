import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Header from './header';

import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

function displayRandomTip() {
  async function callRandomTip() {
    const tipString = await AsyncStorage.getItem('@GreenAlertsTips')
    if (tipString) {
      const tips = JSON.parse(tipString)
      const randomTip = tips[Math.floor((Math.random() * tips.length))]

      await Notifications.scheduleNotificationAsync({
        content: {
          title: randomTip['category'],
          body:  randomTip['tip']
        },
        trigger: null
      })

    } else {
      Alert.alert("Sorry, tips haven't loaded yet")
    }
  }
  callRandomTip()
}

function HomeScreen(props) {
  let { navigation } = props;
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <StatusBar style='auto' />
      <View> 
        <Text>Friendly reminders to build sustainable habits!</Text>
        <Button onPress={displayRandomTip} title="Get a random sustainable reminder" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default HomeScreen;
