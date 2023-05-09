import React, { useEffect } from "react";
import { Game } from "../Games";
import {
  Container,
  DateAndTime,
  Description,
  GoBackButton,
  JoinGameButton,
  JoinGameButtonText,
  JoinedGameButton,
  Title,
  TopMapContainer,
} from "./styles";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import tryCatchRequest from "src/global/utils/tryCatchRequest";
import { api } from "src/services/api";
import { ActivityIndicator } from "react-native";

export interface UserProps {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: string;
  location: string;
}

export default function GameDetails({ route }: any) {
  const gameFromParams: Game = route.params.game;

  const [game, setGame] = React.useState<Game>();
  const [isJoined, setIsJoined] = React.useState(false);
  const [loadingGameData, setLoadingGameData] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigation<StackNavigationProp<any>>();

  async function getGameData() {
    setLoadingGameData(true);

    console.log(gameFromParams._id);
    const { response, error } = await tryCatchRequest(
      api.get(`/games/${gameFromParams._id}`)
    );

    if (error || response?.status !== 200) {
      console.log(error);
      setLoadingGameData;
      return;
    }

    setGame(response.data);
    console.log(response.data.playerList);
    setIsJoined(
      response.data.playerList.filter(
        (p: UserProps) => p._id === "64596654f710fb047282cc65"
      ).length > 0
    );
    setLoadingGameData(false);
  }

  useEffect(() => {
    getGameData();
  }, []);

  function formatDateTime(dateTime: Date) {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  async function handleAddToGame() {
    setLoading(true);
    const { response, error } = await tryCatchRequest(
      api.post(`/games/${gameFromParams._id}/64596654f710fb047282cc65`)
    );

    if (error || response?.status !== 200) {
      console.log(error);
      return;
    }

    setLoading(false);
    await getGameData();
  }

  async function handleRemoveFromGame() {
    setLoading(true);
    const { response, error } = await tryCatchRequest(
      api.delete(`/games/${gameFromParams._id}/64596654f710fb047282cc65`)
    );

    if (error || response?.status !== 200) {
      console.log(error);
      return;
    }

    setLoading(false);
    await getGameData();
  }

  if (loadingGameData) {
    return (
      <Container>
        <ActivityIndicator color="#fff" />
      </Container>
    );
  }

  const gameHasPlayers = game?.playerList && game?.playerList.length > 0;

  return (
    <Container>
      <TopMapContainer>
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: game?.location.latitude || 0,
            longitude: game?.location.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          scrollEnabled={false}
          zoomEnabled={true}
          pitchEnabled={false}
          rotateEnabled={false}
        />
        <GoBackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </GoBackButton>
      </TopMapContainer>
      <Title>{game?.title}</Title>
      <DateAndTime>{formatDateTime(game?.dateTime || new Date())}</DateAndTime>
      <Description>{game?.description}</Description>
      {gameHasPlayers ? (
        <Description style={{ fontWeight: "bold" }}>
          Lista de Jogadores:
        </Description>
      ) : (
        <Description>Não há jogadores nesse jogo</Description>
      )}
      {game?.playerList.map((player: any, index) => (
        <Description key={index.toString()}>{player.fullName}</Description>
      ))}
      {isJoined ? (
        <JoinedGameButton onPress={handleRemoveFromGame}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <JoinGameButtonText>Você está no jogo!</JoinGameButtonText>
          )}
        </JoinedGameButton>
      ) : (
        <JoinGameButton onPress={handleAddToGame}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <JoinGameButtonText>Participar do Jogo</JoinGameButtonText>
          )}
        </JoinGameButton>
      )}
    </Container>
  );
}
