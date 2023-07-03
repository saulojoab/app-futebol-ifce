import React, { useEffect } from "react";
import { Game } from "../Games";
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
import styled, { useTheme } from "styled-components/native";
import responsive from "src/global/utils/responsive";

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

  const theme = useTheme();

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
      api.post(`/games/${gameFromParams._id}/${user._id}`)
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
        <FloatingButtonContainer>
          <FloatingButton onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              size={responsive(20)}
              color={theme.colors.seaBlue}
            />
          </FloatingButton>

          {loggedUserIsOrganizer && (
            <RightFloatingButtonContainer>
              <FloatingButton onPress={() => navigation.navigate("EditGame")}>
                <Icon
                  name="pencil"
                  size={responsive(20)}
                  color={theme.colors.seaBlue}
                />
              </FloatingButton>
              <FloatingButton onPress={handleDeleteGame}>
                <Icon
                  name="trash"
                  size={responsive(20)}
                  color={theme.colors.error}
                />
              </FloatingButton>
            </RightFloatingButtonContainer>
          )}
        </FloatingButtonContainer>
      </TopMapContainer>
      <Title>{game?.title}</Title>
      <DateAndTime>{formatDateTime(game?.dateTime || new Date())}</DateAndTime>

      {game && game.dateTime > new Date() && (
        <>
          <SectionTitle>Nota do Jogo</SectionTitle>
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
        </>
      )}

      <SectionTitle>Descrição do Jogo</SectionTitle>
      <Description>{game?.description}</Description>

      <SectionTitle>Jogadores</SectionTitle>

      <Description>1. {game?.organizer.fullName} (Organizador)</Description>
      {game?.playerList.map((player: any, index) => (
        <Description key={index.toString()}>
          {index + 2}. {player.fullName}
        </Description>
      ))}

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
        <JoinGameButtonText>Cancelar Participação</JoinGameButtonText>
      )}
    </JoinedGameButton>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const TopMapContainer = styled.View`
  width: 100%;
  height: ${responsive(250)}px;
`;

const Title = styled.Text`
  font-size: ${responsive(30)}px;
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.fonts.bold};
  margin-left: ${responsive(20)}px;
  margin-top: ${responsive(20)}px;
`;

const DateAndTime = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.seaBlue};
  font-family: ${(props) => props.theme.fonts.regular};
  margin-left: ${responsive(20)}px;
  margin-top: ${responsive(5)}px;
`;

const Description = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.black};
  margin-bottom: ${responsive(10)}px;
  margin-left: ${responsive(20)}px;
  margin-top: ${responsive(10)}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

const FloatingButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.white};
  padding: ${responsive(10)}px;
  width: ${responsive(55)}px;
  height: ${responsive(55)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${responsive(100)}px;
  shadow-color: ${(props) => props.theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const FloatingButtonContainer = styled.View`
  position: absolute;
  top: ${responsive(60)}px;
  padding-right: ${responsive(20)}px;
  padding-left: ${responsive(20)}px;
  width: 100%;
  z-index: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const RightFloatingButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${responsive(20)}px;
`;

const JoinGameButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.seaBlue};
  padding: ${responsive(20)}px;
  border-radius: ${responsive(10)}px;
  position: absolute;
  bottom: ${responsive(40)}px;
  left: ${responsive(20)}px;
  right: ${responsive(20)}px;
  shadow-color: ${(props) => props.theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const JoinGameButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${responsive(18)}px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.bold};
`;

const JoinedGameButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.background};
  padding: ${responsive(20)}px;
  border-radius: ${responsive(10)}px;
  position: absolute;
  bottom: ${responsive(40)}px;
  left: ${responsive(20)}px;
  right: ${responsive(20)}px;
  shadow-color: ${(props) => props.theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const StarRatingContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: ${responsive(20)}px;
  margin-top: ${responsive(10)}px;
`;

const StarRatingLabel = styled.Text`
  font-size: ${responsive(14)}px;
  color: ${(props) => props.theme.colors.seaBlue};
  margin-left: ${responsive(5)}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

const DeleteGameButton = styled.TouchableOpacity`
  background-color: red;
  padding: ${responsive(20)}px;
  border-radius: ${responsive(50)}px;
  shadow-color: ${(props) => props.theme.colors.black};
  position: absolute;
  bottom: ${responsive(20)}px;
  left: 50%;
  right: ${responsive(20)}px;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  align-self: center;
`;

const DeleteGameButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${responsive(16)}px;
  text-align: center;
`;

const EditGameButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: ${responsive(20)}px;
  border-radius: ${responsive(50)}px;
  shadow-color: ${(props) => props.theme.colors.black};
  position: absolute;
  bottom: ${responsive(20)}px;
  left: ${responsive(10)}px;
  right: 51%;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  align-self: center;
`;

const EditGameButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${responsive(16)}px;
  text-align: center;
`;

const SectionTitle = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${(props) => props.theme.colors.seaBlue};
  margin-left: ${responsive(20)}px;
  margin-top: ${responsive(20)}px;
  font-family: ${(props) => props.theme.fonts.bold};
`;
