// a login screen that uses an email and password to authenticate the user

import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { TextInput } from "src/components";
import { StackNavigationProp } from "@react-navigation/stack";
import tryCatchRequest from "src/global/utils/tryCatchRequest";
import { api } from "src/services/api";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { updateUser } from "src/redux/features/authSlice";
import Icon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";
import responsive from "src/global/utils/responsive";
import { useTheme } from "styled-components";

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
  const theme = useTheme();

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
        <FloatingButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color={theme.colors.seaBlue} />
        </FloatingButton>
        <Title>Edite Seus Dados</Title>
      </GoBackContainer>
      <TextInput
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        placeholder="Nome e sobrenome"
        autoCapitalize={"words"}
        icon={<Icon name="user" size={20} color={theme.colors.seaBlue} />}
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="E-mail"
        autoCapitalize={"none"}
        keyboardType={"email-address"}
        icon={<Icon name="envelope" size={20} color={theme.colors.seaBlue} />}
      />
      <TextInput
        value={location}
        onChangeText={(text) => setLocation(text)}
        placeholder="Cidade"
        autoCapitalize={"words"}
        icon={<Icon name="home" size={20} color={theme.colors.seaBlue} />}
      />

      <OutlinedButton disabled={isButtonDisabled} onPress={updateUserData}>
        <ButtonText>Salvar</ButtonText>
      </OutlinedButton>
    </Container>
  );
}

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

interface ButtonProps {
  disabled: boolean;
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  align-items: center;
  padding: ${responsive(20)}px;
  padding-top: ${responsive(60)}px;
`;

const Title = styled.Text`
  font-size: ${responsive(24)}px;
  color: ${(props) => props.theme.colors.seaBlue};
  font-family: ${(props) => props.theme.fonts.bold};
  margin-left: ${responsive(15)}px;
`;

const OutlinedButton = styled.TouchableOpacity<ButtonProps>`
  height: ${responsive(45)}px;
  width: 75%;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.gray : props.theme.colors.seaBlue};
  padding: ${responsive(10)}px;
  margin-top: ${responsive(20)}px;
  align-items: center;
  border-radius: ${responsive(10)}px;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.white};
`;

const GoBackContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: ${responsive(20)}px;
`;
