/*
  Filename: config.js
  Description: Settings panel for alert settings.
*/
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, FlatList, Switch, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Key used in AsyncStorage API
export const SettingsCacheKey = '@GreenAlertsSettings';

function getDefaultSettings() {
  return [
    {
      id: '0',
      /*
        Each category state is persistent saved under a different key
        "@GreenAlerts/Categories/Food" --> boolean for Food
        "@GreenAlerts/Categories/Cleaning" --> boolean for Cleaning 
      */
      storeKey: '@GreenAlerts/Categories',
      setting: {
        name: 'Categories',
        type: 'toggle',
        options: {
          Transportation: true,
          Food: true,
          EnergyEfficiency: true,
          Cleaning: true,
          Recycle: true,
        },
      },
    },
    {
      id: '1',
      storeKey: '@GreenAlerts/Scheduling',
      setting: {
        name: 'Scheduling',
        type: 'select',
        options: ['weekly', 'daily', 'hourly'],
        selected: 0,
      },
    },
  ];
}

// private component function
function ToggleOption(props) {
  let { name, initialState, id, storeKey } = props;

  // create custom key for this one
  const toggleStoreKey = `${storeKey}/${name}`;

  let [optionState, setOptionState] = useState(initialState);
  let [loadFlag, setLoadFlag] = useState(false);

  const toggleSwitch = () => setOptionState((previousState) => !previousState);

  // Load toggle setting if it exists
  useEffect(() => {
    async function loadToggleState() {
      const state = await AsyncStorage.getItem(toggleStoreKey);
      if (typeof state === typeof 'String') {
        if (state === 'false') {
          setOptionState(false);
        } else {
          setOptionState(true);
        }
      }
      setLoadFlag(true);
    }
    loadToggleState();
  }, []);

  // Store toggle setting if it changes
  useEffect(() => {
    async function saveToggleState() {
      if (loadFlag) {
        //Alert.alert(`set ${toggleStoreKey} to ${String(optionState)}`)
        await AsyncStorage.setItem(toggleStoreKey, String(optionState));
      }
    }
    saveToggleState();
  }, [optionState]);

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
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={optionState ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={optionState}
      />
    </View>
  );
}

function SelectionOption(props) {
  let { name, options, selected, storeKey } = props;

  let [activeOption, setActiveOption] = useState(options[selected]);
  let [loadFlag, setLoadFlag] = useState(false);

  // Load activeOption if it previously existed in store
  useEffect(() => {
    async function loadOption() {
      const storedIndex = await AsyncStorage.getItem(storeKey);
      if (storedIndex) {
        setActiveOption(options[Number(storedIndex)]);
      }
      setLoadFlag(true);
    }
    loadOption();
  }, []);

  // Store new setting
  useEffect(() => {
    async function storeNewOption() {
      if (loadFlag) {
        await AsyncStorage.setItem(
          storeKey,
          String(options.indexOf(activeOption))
        );
      }
    }
    storeNewOption();
  }, [activeOption]);

  return (
    <Picker
      selectedValue={activeOption}
      onValueChange={(itemValue, itemIndex) =>
        setActiveOption((previouState) => {
          return itemValue;
        })
      }
    >
      {
        // list each dropdown option
        options.map((option, index) => {
          return (
            <Picker.Item
              key={index}
              label={option[0].toUpperCase() + option.substr(1)}
              value={option}
            />
          );
        })
      }
    </Picker>
  );
}

export function Configuration(props) {
  const Settings = getDefaultSettings();

  const renderSetting = ({ item }) => {
    let { name, type, options, selected } = item.setting;

    switch (type) {
      case 'select':
        return (
          <View>
            <Text style={styles.optionHeader}>{name}</Text>
            <SelectionOption
              name={name}
              options={options}
              selected={selected}
              storeKey={item.storeKey}
            />
          </View>
        );
      case 'toggle':
        return (
          <View>
            <Text style={styles.optionHeader}>{name}</Text>
            <View>
              {Object.entries(options).map(([key, value], index) => {
                return (
                  <ToggleOption
                    key={index}
                    name={key}
                    initialState={value}
                    storeKey={item.storeKey}
                  />
                );
              })}
            </View>
          </View>
        );
    }

    return (
      <View>
        <Text>Error: bad setting type attribute</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.settingsHeader}>Settings</Text>
      <FlatList
        data={Settings}
        renderItem={renderSetting}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  settingsHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionHeader: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
