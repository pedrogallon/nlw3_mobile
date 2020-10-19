import React, { useState, useEffect } from "react";

import { StyleSheet, Text, View, Dimensions } from "react-native";

import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";

import mapMarkerImg from "../images/map-marker.png";

import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import api from "../services/api";

interface Orphanage {
  id: number;
  name: string;

  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);


  useFocusEffect(() => {
    api.get("orphanages").then((res) => {
      setOrphanages(res.data);
    });
  });

  function handleNavigateToCreateOrphanage() {
    navigation.navigate("SelectMapPosition");
  }

  function nagleNavigateToOrphanageDetails(id:number) {
    navigation.navigate("OrphanageDetails", { id });
  }


  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -23.5032414,
          longitude: -46.5215195,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
      >
        {orphanages.map((orphanage: Orphanage) => {
          var tempLat:number = orphanage.latitude;
          var tempLong:number = orphanage.longitude;

          return (
            <Marker
              key={orphanage.id}
              icon={mapMarkerImg}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: tempLat,
                longitude: tempLong,
              }}
            >
              <Callout tooltip onPress={() => nagleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
        
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  calloutContainer: {
    width: 168,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    justifyContent: "center",

    elevation: 3,
  },

  calloutText: {
    color: "#0089a5",
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
  },

  footerText: {
    color: "#8fa7b3",
    fontFamily: "Nunito_700Bold",
  },

  createOrphanageButton: {
    width: 56,
    height: 56,

    backgroundColor: "#15c3d6",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});
