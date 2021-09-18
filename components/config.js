/*
  Filename: config.js
  Description: Settings panel for alert settings.
*/
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, FlatList } from 'react-native';

// Frequency Enum
const FREQUENCY = {
  WEEKLY: 'weekly',
  DAILY: 'daily',
  HOURLY: 'hourly'
}
Object.freeze(FREQUENCY)

export const initializeSettings = () => {  
  return 'todo'
}

export function Configuration (props) {

  let Settings = [
    {
      id: '0',
      setting: {
        name: 'Categories',
        type: 'toggle',
        options: {
          Transportation: true,
          Food: true,
          EnergyEfficiency: true,
          Cleaning: true,
          Recycle: true
        }
      }
    },
    {
      id: '1',
      setting: {
        name: 'Scheduling',
        type: 'select',
        options: ['weekly', 'daily', 'hourly'],
        selected: 0
      }
    }
  ]

  const renderSetting = ({item}) => {
    let {name, type, options, selected} = item.setting

    switch (type){
      case 'select':
        return (
          <View>
            <Text style={styles.optionHeader}>{name}</Text>
          </View>
        )
      case 'toggle':
        return (
          <View>
            <Text style={styles.optionHeader}>{name}</Text>
          </View>
        )
    }

    return (
      <View>
        <Text>Error: bad setting type attribute</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.settingsHeader}>Settings</Text>
      <FlatList
        data={Settings}
        renderItem={renderSetting}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'left',
    justifyContent: 'flex-start'
  },
  settingsHeader: {
    fontSize: 25,
    fontWeight: "bold"
  },
  optionHeader: {
    fontSize: 16
  }
})