import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>Green Alerts </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: '15%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    letterSpacing: 1,
    color: 'green',
  },
});
