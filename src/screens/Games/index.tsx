// react native function component with a text inside

import React, { useEffect } from "react";
import {
  Container,
  CreateGameButton,
  CreateGameButtonText,
  GameContainer,
  GameDescription,
  GameInformationContainer,
  GameListingContainer,
  GameTitle,
  MapContainer,
  Title,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import tryCatchRequest from "src/global/utils/tryCatchRequest";
import { api } from "src/services/api";
import { RefreshControl } from "react-native";
import MapView from "react-native-maps";
import responsive from "src/global/utils/responsive";

export interface Game {
  _id: string;
  title: string;
  description: string;
  dateTime: Date;
  location: {
    latitude: number;
    longitude: number;
  };
  organizer: string;
  playerList: string[];
}

export default function Games() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [games, setGames] = React.useState<Game[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

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

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getGames();
    setRefreshing(false);
  }, []);

  //a function that formats a dateTime object to dd/mm/yyyy hh:mm
  function formatDateTime(dateTime: Date) {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <Container>
      <Title>Jogos</Title>
      <GameListingContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {games.map((game, index) => (
          <GameContainer
            key={index.toString()}
            onPress={() => navigation.navigate("GameDetails", { game })}
          >
            <MapContainer>
              <MapView
                style={{ width: responsive(150), height: responsive(150) }}
                initialRegion={{
                  latitude: game.location.latitude,
                  longitude: game.location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                rotateEnabled={false}
              />
            </MapContainer>
            <GameInformationContainer>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
              <GameDescription>{formatDateTime(game.dateTime)}</GameDescription>
            </GameInformationContainer>
          </GameContainer>
        ))}
      </GameListingContainer>
      <CreateGameButton onPress={() => navigation.navigate("CreateGame")}>
        <CreateGameButtonText>Criar Partida</CreateGameButtonText>
      </CreateGameButton>
    </Container>
  );
}
