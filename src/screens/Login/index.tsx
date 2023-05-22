// a login screen that uses an email and password to authenticate the user

import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Logo,
  Title,
  ButtonText,
  ForgotText,
  OutlinedButton,
  ForgotPassword,
  SignupText,
} from "./styles";
import { TextInput } from "src/components";
import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import logo from "src/assets/images/Gamefinder-4.png";
import tryCatchRequest from "src/global/utils/tryCatchRequest";
import { api } from "src/services/api";
import { setLoginStatus, updateUser } from "src/redux/features/authSlice";
import { useAppDispatch } from "src/hooks/redux";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const isEmailValid = emailRegex.test(email);
  const isButtonDisabled = !isEmailValid || password.length < 6;

  const navigation = useNavigation<StackNavigationProp<any>>();

  const dispatch = useAppDispatch();

  async function login() {
    setLoading(true);

    const user = {
      email,
      password,
    };

    console.log(user);

    const { response, error } = await tryCatchRequest(
      api.post("/users/login", user)
    );

    if (error || response?.status !== 200) {
      console.log(error);
      setLoading(false);
      return;
    }

    dispatch(setLoginStatus(true));
    dispatch(updateUser(response.data.user));

    console.log(response.data.user);

    setLoading(false);
    navigation.navigate("TabContainer");
  }

  return (
    <Container>
      <Logo source={logo} />
      <Title>Olá, seja bem vindo(a)</Title>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        autoCapitalize={"none"}
        keyboardType="email-address"
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Senha"
        secureTextEntry={true}
        autoCapitalize={"none"}
      />
      <ForgotPassword
        disabled={isButtonDisabled}
        onPress={() => console.log("Forgot")}
      >
        <ForgotText>Esqueci minha senha</ForgotText>
      </ForgotPassword>
      <OutlinedButton disabled={isButtonDisabled || loading} onPress={login}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <ButtonText>Entrar</ButtonText>
        )}
      </OutlinedButton>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <SignupText>Não possui uma conta? Cadastre-se</SignupText>
      </TouchableOpacity>
    </Container>
  );
}
