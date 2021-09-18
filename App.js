import React, { Component, useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
=======
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Platform } from 'react-native';
>>>>>>> de6b868c5b5a22013fdcdfccfd940e469a037e14
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/header';

import HomeScreen from './components/Homescreen';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Configuration } from './components/config';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

// Create Navigation Stack (used to move between screens)

export default function App() {
  return <AppContainer />;
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    SignUp: {
      screen: SignUp,
    },
    SignIn: {
      screen: SignIn,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

/* source: docs.expo.dev scheduled-notifications */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false, // (Jac)--do we want sound?
    shouldSetBadge: false,
  }),
});

function Tok() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Title: {notification && notification.request.content.title}{' '}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{' '}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title='Press to schedule a Notification'
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Green Alerts',
      body: "Dont't for get to recycle today!", // we need to make the body change with each alert, I(Jacque) suggest doing this by adding a id tag for referencing, Thoughts?
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
