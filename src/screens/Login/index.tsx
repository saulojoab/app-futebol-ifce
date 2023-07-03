// a login screen that uses an email and password to authenticate the user

import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { TextInput } from "src/components";
import { StackNavigationProp } from "@react-navigation/stack";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import logo from "src/assets/images/Gamefinder-4.png";
import tryCatchRequest from "src/global/utils/tryCatchRequest";
import { api } from "src/services/api";
import { setLoginStatus, updateUser } from "src/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import Toast from "react-native-toast-message";
import styled from "styled-components/native";
import responsive from "src/global/utils/responsive";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "styled-components";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const isEmailValid = emailRegex.test(email);
  const isButtonDisabled = !isEmailValid || password.length < 6;

  const navigation = useNavigation<StackNavigationProp<any>>();
  const theme = useTheme();

  function checkAuth() {
    if (user.email !== "") {
      navigation.navigate("TabContainer");
      return;
    }
  }

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
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: "Verifique suas credenciais e tente novamente",
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    dispatch(setLoginStatus(true));
    dispatch(updateUser(response.data.user));

    setLoading(false);
    navigation.navigate("TabContainer");
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Container>
      <Logo source={logo} />
      <Title>Olá, seja bem vindo(a).</Title>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        autoCapitalize={"none"}
        keyboardType="email-address"
        icon={
          <Icon
            name="envelope"
            color={theme.colors.background}
            size={responsive(15)}
          />
        }
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Senha"
        secureTextEntry={true}
        autoCapitalize={"none"}
        icon={
          <Icon
            name="lock"
            color={theme.colors.background}
            size={responsive(15)}
          />
        }
      />
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
      <Toast />
    </Container>
  );
}

interface ButtonProps {
  disabled: boolean;
}

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding: ${responsive(30)}px;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 215px;
  height: 215px;
  margin-top: ${responsive(-60)}px;
  margin-bottom: ${responsive(46)}px;
  align-self: center;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${responsive(10)}px;
  font-family: ${(props) => props.theme.fonts.bold};
`;

const OutlinedButton = styled.TouchableOpacity<ButtonProps>`
  height: ${responsive(45)}px;
  width: 75%;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.background
      : props.theme.colors.secondary};

  border-radius: 7.5px;
  padding: ${responsive(10)}px;
  margin-top: ${responsive(50)}px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const ButtonText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.bold};
`;

const SignupText = styled.Text`
  font-size: ${responsive(16)}px;
  color: ${(props) => props.theme.colors.seaBlue};
  margin-top: ${responsive(30)}px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.regular};
`;
