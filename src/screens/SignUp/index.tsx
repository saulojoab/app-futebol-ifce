// a login screen that uses an email and password to authenticate the user

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { TextInput } from "src/components";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity, View } from "react-native";
import logo from "src/assets/images/Gamefinder-4.png";
import tryCatchRequest from "src/global/utils/tryCatchRequest";
import { api } from "src/services/api";
import styled from "styled-components/native";
import responsive from "src/global/utils/responsive";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "styled-components";
import Toast from "react-native-toast-message";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const theme = useTheme();

  const isEmailValid = emailRegex.test(email);
  const isButtonDisabled = checkIfButtonIsDisabled();

  function checkIfButtonIsDisabled() {
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !gender ||
      !location ||
      !dateOfBirth
    ) {
      return true;
    }

    return false;
  }

  const navigation = useNavigation<StackNavigationProp<any>>();

  function formatDate(dateString: string) {
    const [day, month, year] = dateString.split("/").map(Number);

    const date = new Date(year, month - 1, day);

    return date.toString();
  }

  async function createUser() {
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Erro ao criar conta",
        text2: "As senhas não coincidem",
        position: "bottom",
      });
      return;
    }

    if (!isEmailValid) {
      Toast.show({
        type: "error",
        text1: "Erro ao criar conta",
        text2: "O email inserido não é válido",
        position: "bottom",
      });
      return;
    }

    const user = {
      fullName,
      email,
      password,
      phoneNumber,
      dateOfBirth: dateOfBirth,
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

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    setDateOfBirth(date.toISOString());
    setDatePickerVisibility(false);
  };

  return (
    <Container>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <Logo source={logo} />
      <Title>Crie uma conta</Title>
      <TextInput
        id="name-signup"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        placeholder="Nome e sobrenome"
        autoCapitalize={"words"}
        icon={<Icon name="user" size={20} color={theme.colors.seaBlue} />}
      />
      <TextInput
        id="email-signup"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="E-mail"
        autoCapitalize={"none"}
        keyboardType={"email-address"}
        icon={<Icon name="envelope" size={20} color={theme.colors.seaBlue} />}
      />

      <TextInput
        id="phone-signup"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        placeholder="(88) 98888-8888"
        keyboardType={"number-pad"}
        autoCapitalize={"none"}
        icon={<Icon name="phone" size={20} color={theme.colors.seaBlue} />}
      />
      <TextInput
        id="birth-signup"
        value={dateOfBirth}
        onChangeText={(text) => setDateOfBirth(text)}
        placeholder="Data de Nascimento"
        keyboardType={"numeric"}
        autoCapitalize={"none"}
        onFocus={() => setDatePickerVisibility(true)}
        icon={<Icon name="calendar" size={20} color={theme.colors.seaBlue} />}
      />

      <TextInput
        id="gender-signup"
        value={gender}
        onChangeText={(text) => setGender(text)}
        placeholder="Gênero"
        autoCapitalize={"words"}
        icon={<Icon name="male" size={20} color={theme.colors.seaBlue} />}
      />
      <TextInput
        id="location-signup"
        value={location}
        onChangeText={(text) => setLocation(text)}
        placeholder="Cidade"
        autoCapitalize={"words"}
        icon={<Icon name="home" size={20} color={theme.colors.seaBlue} />}
      />

      <TextInput
        id="password-signup"
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Senha"
        secureTextEntry={true}
        autoCapitalize={"none"}
        icon={<Icon name="lock" size={20} color={theme.colors.seaBlue} />}
      />
      <TextInput
        id="confirmpassword-signup"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        placeholder="Confirmar senha"
        secureTextEntry={true}
        autoCapitalize={"none"}
        icon={<Icon name="lock" size={20} color={theme.colors.seaBlue} />}
      />

      <OutlinedButton disabled={isButtonDisabled} onPress={createUser}>
        <ButtonText>Cadastrar</ButtonText>
      </OutlinedButton>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <SignupText>Já possui um cadastro? Entrar</SignupText>
      </TouchableOpacity>
      <Toast />
    </Container>
  );
}

interface ButtonProps {
  disabled: boolean;
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  align-items: center;
  justify-content: center;
  padding: ${responsive(20)}px;
`;

const Logo = styled.Image`
  width: 132px;
  height: 132px;
  margin-bottom: ${responsive(40)}px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${(props) => props.theme.colors.seaBlue};
  font-family: ${(props) => props.theme.fonts.bold};
`;

const PasswordError = styled.Text`
  margin-top: ${responsive(10)}px;
  color: ${(props) => props.theme.colors.error};
  font-family: ${(props) => props.theme.fonts.medium};
`;

const OutlinedButton = styled.TouchableOpacity<ButtonProps>`
  height: ${responsive(45)}px;
  width: 75%;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.gray : props.theme.colors.seaBlue};
  border-radius: ${responsive(7.5)}px;
  padding: ${responsive(10)}px;
  margin-top: ${responsive(20)}px;
  align-items: center;
  justify-content: center;
`;

const FlexView = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const RowInput = styled(TextInput)`
  width: 47.5%;
`;

const ButtonText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.bold};
`;

const SignupText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.seaBlue};
  margin-top: ${responsive(20)}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;
