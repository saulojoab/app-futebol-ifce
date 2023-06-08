// react native function component with a text inside

import React from "react";
import {
  Container,
  CreateGameButton,
  CreateGameButtonText,
  FormContainer,
  GoBackButton,
  IconOnMiddleOfMap,
  InputLabel,
  MapContainer,
  Title,
  TitleContainer,
} from "./styles";
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
import Toast from "react-native-toast-message";

export default function CreateGame() {
  const [dateTime, setDateTime] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [currentPosition, setCurrentPosition] = React.useState<LatLng>();
  const [title, setTitle] = React.useState<string>("");
  const [gameLocation, setGameLocation] = React.useState<LatLng>();
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigation<StackNavigationProp<any>>();
  const user = useAppSelector((state) => state.auth.user);

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

  async function createGame() {
    const game = {
      dateTime: new Date(),
      title,
      description,
      location: gameLocation,
      organizer: user._id,
    };

    setLoading(true);

    const { response, error } = await tryCatchRequest(api.post("/games", game));

    if (error || response?.status !== 201) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Erro ao criar jogo",
        text2: "Verifique sua conexão com a internet e tente novamente",
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    setLoading(false);

    console.log(response);
    Toast.show({
      type: "success",
      text1: "Jogo criado com sucesso",
      position: "bottom",
    });
    navigation.navigate("Jogos");
  }

  const isButtonDisabled =
    !title || !description || !gameLocation || !dateTime || loading;

  return (
    <Container>
      <TitleContainer>
        <GoBackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </GoBackButton>
        <Title>Criar Partida</Title>
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
      <CreateGameButton disabled={isButtonDisabled} onPress={createGame}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <CreateGameButtonText>Criar Partida</CreateGameButtonText>
        )}
      </CreateGameButton>
      <Toast />
    </Container>
  );
}
