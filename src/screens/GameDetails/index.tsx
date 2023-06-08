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
  StarRatingContainer,
  Title,
  TopMapContainer,
  StarRatingLabel,
  DeleteGameButton,
  DeleteGameButtonText,
  EditGameButton,
  EditGameButtonText,
} from "./styles";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import tryCatchRequest from "src/global/utils/tryCatchRequest";
import { api } from "src/services/api";
import { ActivityIndicator } from "react-native";
import { StarRating } from "src/components";
import { useAppSelector } from "src/hooks/redux";
import Toast from "react-native-toast-message";

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
  const gameFromParams = useAppSelector((state) => state.game.selectedGame);

  const [game, setGame] = React.useState<Game>();
  const [isJoined, setIsJoined] = React.useState(false);
  const [loadingGameData, setLoadingGameData] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingGameRating, setLoadingGameRating] = React.useState(false);
  const [ratingFromGame, setRatingFromGame] = React.useState<number>();
  const [rating, setRating] = React.useState(0);
  const [hasRated, setHasRated] = React.useState(false);

  const navigation = useNavigation<StackNavigationProp<any>>();
  const user = useAppSelector((state) => state.auth.user);

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
    setIsJoined(
      response.data.playerList.filter((p: UserProps) => p._id === user._id)
        .length > 0
    );
    setLoadingGameData(false);
  }

  async function getRatingFromGame() {
    setLoadingGameRating(true);
    const { response, error } = await tryCatchRequest(
      api.get(`/ratings/game/${gameFromParams._id}`)
    );

    if (error || response?.status !== 200) {
      console.log(error);
      setLoadingGameRating(false);
      return;
    }

    console.log(response.data);

    let sum = 0;

    response.data.map((item: any) => {
      sum += item.rating;
    });

    console.log(sum / response.data.length);
    setLoadingGameRating(false);

    setRatingFromGame(sum / response.data.length);
  }

  async function getCurrentRatingFromUser() {
    const { response, error } = await tryCatchRequest(
      api.get(`/ratings/${gameFromParams._id}/${user._id}`)
    );

    if (error || response?.status !== 200) {
      console.log(error);
      setHasRated(false);
      return;
    }

    if (response.data?.rating) {
      setHasRated(true);
      setRating(response.data.rating);
    }
  }

  useEffect(() => {
    getGameData();
    getCurrentRatingFromUser();
  }, []);

  useEffect(() => {
    getRatingFromGame();
  }, [rating]);

  async function onRating(rating: number) {
    setRating(rating);

    const { response, error } = await tryCatchRequest(
      !hasRated
        ? api.post(`/ratings`, {
            game: gameFromParams._id,
            user: user._id,
            rating,
          })
        : api.put(`/ratings`, {
            game: gameFromParams._id,
            user: user._id,
            rating,
          })
    );

    if (error || (response?.status !== 201 && response?.status !== 200)) {
      console.log(error);
      return;
    }

    setHasRated(true);
  }

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
    Toast.show({
      type: "success",
      text1: "Sucesso",
      text2: "Você entrou no jogo!",
    });
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

  async function handleDeleteGame() {
    setLoading(true);
    const { response, error } = await tryCatchRequest(
      api.delete(`/games/${gameFromParams._id}`)
    );

    if (error || response?.status !== 200) {
      console.log(error);
      return;
    }

    setLoading(false);
    Toast.show({
      type: "success",
      text1: "Sucesso",
      text2: "Você cancelou o jogo!",
    });
    navigation.goBack();
  }

  const loggedUserIsOrganizer = game?.organizer._id === user._id;

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
      <StarRatingContainer>
        <StarRating rating={rating} onPress={onRating} />
        {loadingGameRating ? (
          <ActivityIndicator />
        ) : (
          <StarRatingLabel>
            {ratingFromGame ? ratingFromGame.toFixed(1) : 0}/5
          </StarRatingLabel>
        )}
      </StarRatingContainer>

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

      {loggedUserIsOrganizer && (
        <>
          <DeleteGameButton onPress={handleDeleteGame}>
            <DeleteGameButtonText>Cancelar Jogo</DeleteGameButtonText>
          </DeleteGameButton>
          <EditGameButton onPress={() => navigation.navigate("EditGame")}>
            <EditGameButtonText>Editar Jogo</EditGameButtonText>
          </EditGameButton>
        </>
      )}

      {!loggedUserIsOrganizer && (
        <JoinButton
          isJoined={isJoined}
          loading={loading}
          handleAddToGame={handleAddToGame}
          handleRemoveFromGame={handleRemoveFromGame}
        />
      )}
      <Toast />
    </Container>
  );
}

function JoinButton({
  isJoined,
  loading,
  handleAddToGame,
  handleRemoveFromGame,
}: {
  isJoined: boolean;
  loading: boolean;
  handleAddToGame: () => void;
  handleRemoveFromGame: () => void;
}) {
  if (!isJoined) {
    return (
      <JoinGameButton onPress={handleAddToGame}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <JoinGameButtonText>Participar do Jogo</JoinGameButtonText>
        )}
      </JoinGameButton>
    );
  }

  return (
    <JoinedGameButton onPress={handleRemoveFromGame}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <JoinGameButtonText>Você está no jogo!</JoinGameButtonText>
      )}
    </JoinedGameButton>
  );
}
