/*
  Filename: config.js
  Description: Settings panel for alert settings.
*/
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, FlatList, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

function getDefaultSettings () { 
  return [
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
}

/*
export const initializeSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem('@GreenAlertSettings')
    // if settings don't exist setup defaults
    if (!settings) {
      await AsyncStorage.setItem('@GreenAlertSettings', JSON.stringify(getDefaultSettings()))
    }
  } catch (e) {
    // error handling code
  }
}
*/

// private component function
function ToggleOption (props) {

  let { name, initialState } = props
  
  const [optionState, setOptionState] = useState(initialState)

  const toggleSwitch = () => setOptionState(previousState => {
    // TODO: CALL STORE CHANGE IN PERSISTENT STORAGE
    return !previousState
  })

  return (
    <View>
      <Text>{name}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={optionState ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={optionState}
      />
    </View>
  );
}

function SelectionOption (props) {
  let { name, options, selected } = props

  const [activeOption, setActiveOption] = useState(options[selected])

  return (
    <Picker
      selectedValue={activeOption}
      onValueChange={(itemValue, itemIndex) => setActiveOption(previouState => {
        // TODO MAKE ASYNC HANGE
        return itemValue
      })}
    >
      {
        // list each dropdown option
        options.map( (option) => {
          return (
            <Picker.Item label={option[0].toUpperCase() + option.substr(1)} value={option} />
          )
        })
      }
    </Picker>
  )
}

export function Configuration (props) {

  let [Settings, setSettings] = useState(getDefaultSettings())

  // Check if we have already saved prior settings for this user
  useEffect( () => {
    async function checkCache() {
      try {
        const savedSettings = await AsyncStorage.getItem('@GreenAlertsSettings')
        if (savedSettings) {
          setSettings(defaults => setSettings(JSON.parse(savedSettings)))
        }
      } catch (e) {
        // error catch
      }
    }

    checkCache();

  })


  const renderSetting = ({item}) => {
    let {name, type, options, selected} = item.setting

    switch (type){
      case 'select':
        return (
          <View>
            <Text style={styles.optionHeader}>{name}</Text>
            <SelectionOption 
              name={name}
              options={options}
              selected={selected}
            />
          </View>
        )
      case 'toggle':
        return (
          <View>
            <Text style={styles.optionHeader}>{name}</Text>
            <View>
              {Object.entries(options).map(([key, value]) => {
                return <ToggleOption name={key} initialState={value} />
              })}
            </View>
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
    backgroundColor: "#fff"
  },
  settingsHeader: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"
  },
  optionHeader: {
    textAlign: "left",
    fontSize: 16
  }
})