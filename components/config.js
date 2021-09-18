/*
  Filename: config.js
  Description: Settings panel for alert settings.
*/
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, FlatList, Switch, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Key used in AsyncStorage API
export const SettingsCacheKey = "@GreenAlertsSettings"

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

  let { name, initialState, id, settingsArrayIndex } = props
  
  const [optionState, setOptionState] = useState(initialState)

  const toggleSwitch = () => setOptionState(previousState => !previousState)

  return (
    <View>
      <Text>
        { 
          // Regex Magic to turn property name into readable string
          // this took me a silly amount time to produce but it works 
          name.split(/(?=[A-Z])/g).join(' ') 
        }
      </Text>
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
  let { name, options, selected, updateSettings, settingsIndex } = props

  const [activeOption, setActiveOption] = useState(options[selected])

  /*
  useEffect(() => {
    // Update Cache
    async function saveOptionChange () {
      try {
        Alert.alert("clean-up hook called")
        let currentData = await AsyncStorage.getItem(SettingsCacheKey)
        currentData = (currentData) ? JSON.parse(currentData) : getDefaultSettings()
        currentData[Number(settingsArrayIndex)].setting.selected = options.indexOf(activeOption)
        await AsyncStorage.setItem(SettingsCacheKey, JSON.stringify(currentData))
      } catch (e) {
        Alert.alert(e)
      }
    }
    return saveOptionChange
  }, [activeOption])
  */

  useEffect(() => {
    updateSettings(oldValue => {
      Alert.alert(`updating ${oldValue[Number(settingsIndex)].setting.selected} to ${options.indexOf(activeOption)}`)
      let newValue = oldValue
      newValue[Number(settingsIndex)].setting.selected = options.indexOf(activeOption)
      return newValue
    })
  }, [activeOption])

  return (
    <Picker
      selectedValue={activeOption}
      onValueChange={(itemValue, itemIndex) => setActiveOption(previouState => {
        return itemValue
      })}
    >
      {
        // list each dropdown option
        options.map( (option, index) => {
          return (
            <Picker.Item key={index}  label={option[0].toUpperCase() + option.substr(1)} value={option} />
          )
        })
      }
    </Picker>
  )
}

/*
// Shoutout to @edwinvrgs here https://github.com/react-native-async-storage/async-storage/issues/32
function settingsPersist (key) {
  const [settings, updateSettingsValue] = useState(getDefaultSettings())
  const [updated, setUpdated] = useState(false)

  async function getStorageValue() {
    let value = getDefaultSettings()
    try {
      value = JSON.parse(await AsyncStorage.getItem(key)) || getDefaultSettings()
    } catch (e) {
      // error
    } finally {
      updateSettingsValue(value)
      setUpdated(true)
    }
  }

  async function updateStorage(newValue) {
    if (newValue !== null) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newValue))
    } catch (e) {
    } finally {
      setUpdated(false)
      getStorageValue()
    }
    }
  }
  useEffect(() => {
    getStorageValue()
  }, [updated])
  return [settings, updateStorage]
}
*/

export function Configuration (props) {

  let [Settings, setSettings] = useState(null)

  //let [Settings, updateSettings] = settingsPersist()
  

  // Check if we have already saved prior settings for this user
  useEffect( () => {
    async function checkCache() {
      try {
        const savedSettings = await AsyncStorage.getItem(SettingsCacheKey)
        if (savedSettings) {
          // Alert.alert("recovered cached stuff!" + String( JSON.parse(savedSettings[1].setting.selected) ))
          setSettings(JSON.parse(savedSettings))
        } else {
          setSettings(getDefaultSettings())
        }
      } catch (e) {
        // error catch
        // Alert.alert(e)
      }
    }

    checkCache();
  }, [])

  // Update settings after setSettings call
  useEffect( () => {
    async function updatePersistentStore() {
      try {
        // Alert.alert('CHANGING STUFF')
        await AsyncStorage.setItem(SettingsCacheKey, JSON.stringify(Settings))
      } catch (e) {
        Alert.alert(e)
      }
    }
    updatePersistentStore()
  }, [Settings])


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
              updateSettings={setSettings}
              settingsIndex={item.id}
            />
          </View>
        )
      case 'toggle':
        return (
          <View>
            <Text style={styles.optionHeader}>{name}</Text>
            <View>
              {Object.entries(options).map(([key, value], index) => {
                return <ToggleOption key={index} name={key} initialState={value} settingsArrayIndex={item.id} />
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
    fontSize: 16,
    fontWeight: "bold"
  }
})