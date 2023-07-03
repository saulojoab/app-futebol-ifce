// react native function component with a text inside

import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import tryCatchRequest from "src/global/utils/tryCatchRequest";
import { api } from "src/services/api";
import { RefreshControl } from "react-native";
import MapView from "react-native-maps";
import responsive from "src/global/utils/responsive";
import { UserProps } from "../GameDetails";
import { useAppDispatch } from "src/hooks/redux";
import { setSelectedGame } from "src/redux/features/gameSlice";
import styled, { useTheme } from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";

export interface Game {
  _id: string;
  title: string;
  description: string;
  dateTime: Date;
  location: {
    latitude: number;
    longitude: number;
  };
  organizer: UserProps;
  playerList: string[];
}

export default function Games() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [games, setGames] = React.useState<Game[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useAppDispatch();
  const theme = useTheme();

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

  const onRefresh = async () => {
    setRefreshing(true);
    await getGames();
    setRefreshing(false);
  };

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

  function handleGameDetails(game: Game) {
    dispatch(setSelectedGame(game));
    navigation.navigate("GameDetails");
  }

  return (
    <Container>
      <TitleAddContainer>
        <Title>Jogos</Title>
        <TitleIconContainer onPress={() => navigation.navigate("CreateGame")}>
          <Icon
            name="plus"
            size={responsive(20)}
            color={theme.colors.seaBlue}
          />
        </TitleIconContainer>
      </TitleAddContainer>
      <GameListingContainer
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {games &&
          games
            .sort(
              (a, b) =>
                new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
            )
            .map((game, index) => (
              <GameContainer
                key={index.toString()}
                onPress={() => handleGameDetails(game)}
              >
                <MapContainer>
                  <MapView
                    style={{
                      width: responsive(100),
                      height: responsive(100),
                      borderRadius: 10,
                    }}
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
                  <GameTime>{formatDateTime(game.dateTime)}</GameTime>
                </GameInformationContainer>
                <GameButtonContainer>
                  <Icon
                    name="chevron-right"
                    size={20}
                    color={theme.colors.seaBlue}
                  />
                </GameButtonContainer>
              </GameContainer>
            ))}
      </GameListingContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding: 10px;
  padding-top: 60px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-size: ${responsive(30)}px;
  margin-left: ${responsive(10)}px;
  font-family: ${(props) => props.theme.fonts.bold};
`;

const TitleAddContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleIconContainer = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
`;

const GameListingContainer = styled.ScrollView`
  margin-top: 20px;
`;

const GameContainer = styled.TouchableOpacity`
  padding: ${responsive(10)}px;
  margin-top: ${responsive(10)}px;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const GameTitle = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-size: ${responsive(20)}px;
  text-align: left;
  font-family: ${(props) => props.theme.fonts.bold};
`;

const GameDescription = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${responsive(14)}px;
  text-align: left;
  margin-top: ${responsive(5)}px;
  font-family: ${(props) => props.theme.fonts.medium};
  max-width: ${responsive(200)}px;
`;

const GameTime = styled.Text`
  color: ${(props) => props.theme.colors.seaBlue};
  font-size: ${responsive(14)}px;
  text-align: left;
  margin-top: ${responsive(5)}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

const GameButtonContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
  flex: 1;
`;

const MapContainer = styled.View`
  background-color: ${(props) => props.theme.colors.white};
`;

const GameInformationContainer = styled.View`
  background-color: ${(props) => props.theme.colors.white};
  padding: ${responsive(10)}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: ${responsive(20)}px;
`;
