// react native function component with a text inside

import React from "react";
import { Dimensions } from "react-native";
import { Container } from "./styles";
import MapView, { LatLng } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

export default function Home() {
  const [currentPosition, setCurrentPosition] = React.useState<LatLng>();

  const screen = Dimensions.get("screen");

  Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ latitude, longitude });
      console.log(currentPosition);
    },
    (error) => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );

  return (
    <Container>
      <MapView
        style={{ width: screen.width, height: screen.height }}
        initialRegion={{
          latitude: currentPosition?.latitude || 37.78825,
          longitude: currentPosition?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: currentPosition?.latitude || 37.78825,
          longitude: currentPosition?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </Container>
  );
}
