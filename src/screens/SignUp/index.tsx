// a login screen that uses an email and password to authenticate the user

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Logo,
  Title,
  FlexView,
  RowInput,
  ButtonText,
  OutlinedButton,
  SignupText,
  PasswordError
} from "./styles";
import { TextInput } from "src/components";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity, View } from "react-native";
import logo from "../../assets/images/Gamefinder-4.png";
import tryCatchRequest from "src/global/utils/tryCatchRequest";
import { api } from "src/services/api";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const isEmailValid = emailRegex.test(email);
  const isButtonDisabled = !isEmailValid || password.length < 6 && confirmPassword != password;

  const navigation = useNavigation<StackNavigationProp<any>>();

  function formatDate(dateString: string) {
    const [day, month, year] = dateString.split("/").map(Number);

    const date = new Date(year, month - 1, day);

    return date.toString();
  }

  async function createUser() {
    const user = {
      fullName,
      email,
      password,
      phoneNumber,
      dateOfBirth: formatDate(dateOfBirth),
      gender,
      location,
    };

    console.log(user);

    const { response, error } = await tryCatchRequest(api.post("/users", user));

    if (error || response?.status !== 201) {
      console.log(error);
      return;
    }

    console.log(response);
    navigation.navigate("Login");
  }

  return (
    <Container>
      <Logo source={logo} />
      <Title>Crie uma conta</Title>
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

      <FlexView>   
        <RowInput
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          placeholder="(88) 98888-8888"
          keyboardType={"number-pad"}
          autoCapitalize={"none"}
        />
        <RowInput
          value={dateOfBirth}
          onChangeText={(text) => setDateOfBirth(text)}
          placeholder="Data Nascimento"
          keyboardType={"numeric"}
          autoCapitalize={"none"}
        />
      </FlexView>

      <TextInput
        value={gender}
        onChangeText={(text) => setGender(text)}
        placeholder="Gênero"
        autoCapitalize={"words"}
      />
      <TextInput
        value={location}
        onChangeText={(text) => setLocation(text)}
        placeholder="Cidade"
        autoCapitalize={"words"}
      />

      <FlexView>
        <RowInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Senha"
          secureTextEntry={true}
          autoCapitalize={"none"}
        />
        <RowInput
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder="Confirmar senha"
          secureTextEntry={true}
          autoCapitalize={"none"}
        />
      </FlexView>

      {confirmPassword != password && <PasswordError>Senhas não coinscidem!</PasswordError>}

      <OutlinedButton disabled={isButtonDisabled} onPress={createUser}>
        <ButtonText>Cadastrar</ButtonText>
      </OutlinedButton>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <SignupText>Já possui um cadastro? Entrar</SignupText>
      </TouchableOpacity>
    </Container>
  );
}
