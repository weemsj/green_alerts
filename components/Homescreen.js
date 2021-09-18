import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Header from './header';
import SignUp from './SignUp';
import SignIn from './SignIn';

function HomeScreen(props) {
  let { navigation } = props;
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <StatusBar style='auto' />
      <Button
        title='Go to SignUp'
        onPress={() => navigation.navigate('SignUp')}
      />
      <Button
        title='Go to SignIn'
        onPress={() => navigation.navigate('SignIn')}
      />
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
