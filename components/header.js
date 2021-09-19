import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import Constant from 'expo-constants';

export default function Header(props) {
  let { navigation } = props;
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Green Alerts </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Config')}>
        <Fontisto style={styles.gear} name='spinner-cog' color='black' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'green',
    alignItems: 'center',
    marginTop: Constant.statusBarHeight,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 26,
    letterSpacing: 1,
    color: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: '30%',
  },
  gear: {
    fontSize: 28,
    marginLeft: '30%',
  },
});
