// a login screen that uses an email and password to authenticate the user

import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Title,
  ButtonText,
  OutlinedButton,
  GoBackContainer,
} from "./styles";
import { TextInput } from "src/components";
import { StackNavigationProp } from "@react-navigation/stack";
import tryCatchRequest from "src/global/utils/tryCatchRequest";
import { api } from "src/services/api";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { updateUser } from "src/redux/features/authSlice";
import { GoBackButton } from "../CreateGame/styles";
import Icon from "react-native-vector-icons/FontAwesome";

export default function EditUser() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  function populate() {
    setFullName(currentUser.fullName);
    setEmail(currentUser.email);
    setLocation(currentUser.location);
  }

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const isEmailValid = emailRegex.test(email);
  const isButtonDisabled = !!!email && !isEmailValid;

  const navigation = useNavigation<StackNavigationProp<any>>();

  async function updateUserData() {
    const user = {
      fullName,
      email,
      location,
    };

    console.log(user);

    const { response, error } = await tryCatchRequest(
      api.put(`/users/${currentUser._id}`, user)
    );

    if (error || response?.status !== 200) {
      console.log(error);
      return;
    }

    dispatch(updateUser(response.data));

    navigation.goBack();
  }

  useEffect(() => {
    populate();
  }, []);

  return (
    <Container>
      <GoBackContainer>
        <GoBackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </GoBackButton>
        <Title>Edite Seus Dados</Title>
      </GoBackContainer>
      <TextInput
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        placeholder="Nome e sobrenome"
        autoCapitalize={"words"}
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="E-mail"
        autoCapitalize={"none"}
        keyboardType={"email-address"}
      />
      <TextInput
        value={location}
        onChangeText={(text) => setLocation(text)}
        placeholder="Cidade"
        autoCapitalize={"words"}
      />

      <OutlinedButton disabled={isButtonDisabled} onPress={updateUserData}>
        <ButtonText>Editar</ButtonText>
      </OutlinedButton>
    </Container>
  );
}
