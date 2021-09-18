import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Green Alerts </Text>
      <Fontisto style={styles.gear} name='spinner-cog' color='black' />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '7%',
    flexDirection: 'row',
    paddingTop: '2%',
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 26,
    letterSpacing: 1,
    color: 'white',
  },
  gear: {
    fontSize: 26,
    textAlign: 'right',
    justifyContent: 'center',
  },
});
