// react native function component with a text inside

import React, { useEffect } from "react";
import { TextInput } from "src/components";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import MapView, { LatLng } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import tryCatchRequest from "src/global/utils/tryCatchRequest";
import { api } from "src/services/api";
import { ActivityIndicator } from "react-native";
import { useAppSelector } from "src/hooks/redux";
import { useTheme } from "styled-components";
import styled from "styled-components/native";
import responsive from "src/global/utils/responsive";

export default function CreateGame() {
  const [dateTime, setDateTime] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [currentPosition, setCurrentPosition] = React.useState<LatLng>();
  const [title, setTitle] = React.useState<string>("");
  const [gameLocation, setGameLocation] = React.useState<LatLng>();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigation<StackNavigationProp<any>>();
  const selectedGame = useAppSelector((state) => state.game.selectedGame);

  const theme = useTheme();

  function populateFields() {
    if (selectedGame) {
      setTitle(selectedGame.title);
      setDescription(selectedGame.description);
      setDateTime(selectedGame.dateTime.toString());
      setGameLocation({
        latitude: selectedGame.location.latitude,
        longitude: selectedGame.location.longitude,
      });
    }
  }

  Geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ latitude, longitude });
    },
    (error) => console.log(error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    setDatePickerVisibility(false);
  };

  async function updateGame() {
    const game = {
      dateTime: new Date(),
      title,
      description,
      location: gameLocation,
    };

    setLoading(true);

    const { response, error } = await tryCatchRequest(
      api.put(`/games/${selectedGame._id}`, game)
    );

    if (error || response?.status !== 200) {
      console.log(error);
      setLoading(false);
      return;
    }

    setLoading(false);

    navigation.navigate("Jogos");
  }

  useEffect(() => {
    populateFields();
  }, []);

  return (
    <Container>
      <TitleContainer>
        <FloatingButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={theme.colors.seaBlue} />
        </FloatingButton>
        <Title>Editar Partida</Title>
      </TitleContainer>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <FormContainer>
        <InputLabel>Título do Jogo</InputLabel>
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Ex: Rachinha do Thiago"
          //onFocus={() => setDatePickerVisibility(true)}
        />
        <InputLabel>Data e Hora</InputLabel>
        <TextInput
          value={dateTime}
          onChangeText={(text) => setDateTime(text)}
          placeholder="Data e hora"
          //onFocus={() => setDatePickerVisibility(true)}
        />
        <InputLabel>Descrição</InputLabel>
        <TextInput
          value={description}
          multiline
          onChangeText={(text) => setDescription(text)}
          placeholder="Descrição"
        />
        <InputLabel>Selecione o local no mapa</InputLabel>
      </FormContainer>
      <MapContainer>
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: currentPosition?.latitude || 37.78825,
            longitude: currentPosition?.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={(region) => setGameLocation(region)}
          followsUserLocation
        />
        <IconOnMiddleOfMap>
          <Icon name="map-marker" size={70} color="red" />
        </IconOnMiddleOfMap>
      </MapContainer>
      <CreateGameButton disabled={loading} onPress={updateGame}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <CreateGameButtonText>Atualizar Partida</CreateGameButtonText>
        )}
      </CreateGameButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding-top: 50px;
  padding-bottom: 40px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.colors.seaBlue};
  font-size: ${responsive(30)}px;
  margin-left: ${responsive(15)}px;
  font-family: ${(props) => props.theme.fonts.bold};
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

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${responsive(15)}px;
  padding-left: ${responsive(15)}px;
`;

const MapContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
`;

const IconOnMiddleOfMap = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -${responsive(20)}px;
  margin-top: -${responsive(40)}px;
`;

interface CreateGameButtonProps {
  disabled?: boolean;
}

const CreateGameButton = styled.TouchableOpacity<CreateGameButtonProps>`
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.gray : props.theme.colors.seaBlue};
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  margin: ${responsive(20)}px;
`;

const CreateGameButtonText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-size: ${responsive(20)}px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.bold};
`;

const InputLabel = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-size: ${responsive(18)}px;
  margin-top: ${responsive(20)}px;
  font-family: ${(props) => props.theme.fonts.bold};
`;

const FormContainer = styled.View`
  padding: ${responsive(15)}px;
`;
