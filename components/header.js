import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';

/*
<TouchableOpacity onPress={() => navigation.navigate('Config')}>
  <AntDesign style={styles.gear} name='setting' color='black' />
</TouchableOpacity>

  Button stopped working randomly
*/

export default function Header(props) {
  let { navigation } = props;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Green Alerts</Text>
      </View>
    </SafeAreaView>
  );
}
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1ca75d',
    //height: STATUSBAR_HEIGHT,
    width: '100%',
  },
  header: {
    width: '100%',
    height: 50,
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: '#1ca75d',
    alignItems: 'center',
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
