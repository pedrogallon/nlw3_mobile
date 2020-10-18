import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -27,
          longitude: -49.0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}



      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
