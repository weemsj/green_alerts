import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/header';
import SignUp from './components/SignUp';
import Configuration from './components/config';

// Create Navigation Stack (used to move between screens)
const Stack = createNativeStackNavigator();
Stack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: false,
  };
};

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Landing Page' }}
        />
        <Stack.Screen name='Config' component={Configuration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
