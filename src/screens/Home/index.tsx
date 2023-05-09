// react native function component with a text inside

import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { Container } from "./styles";
import MapView, { LatLng, Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import tryCatchRequest from "src/global/utils/tryCatchRequest";
import { api } from "src/services/api";
import { Game } from "../Games";

export default function Home() {
  const [currentPosition, setCurrentPosition] = React.useState<LatLng>();
  const [games, setGames] = React.useState<Game[]>([]);

  const screen = Dimensions.get("screen");

  Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ latitude, longitude });
    },
    (error) => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );

  async function getGames() {
    const { response, error } = await tryCatchRequest(api.get("/games"));

    if (error || response?.status !== 200) {
      console.log(error);
      return;
    }

    console.log(response.data);

    setGames(response.data);
  }

  useEffect(() => {
    getGames();
  }, []);

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
        followsUserLocation
        showsUserLocation
      >
        {games.map((game) => (
          <Marker
            key={game._id}
            coordinate={{
              latitude: game.location.latitude,
              longitude: game.location.longitude,
            }}
            title={game.title}
            description={game.description}
          />
        ))}
      </MapView>
    </Container>
  );
}
