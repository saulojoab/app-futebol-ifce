// a login screen that uses an email and password to authenticate the user

import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Title,
  ButtonText,
  OutlinedButton,
  SignupText,
} from "./styles";
import { TextInput } from "src/components";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import tryCatchRequest from "src/global/utils/tryCatchRequest";
import { api } from "src/services/api";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const isEmailValid = emailRegex.test(email);
  const isButtonDisabled = !isEmailValid || password.length < 6;

  const navigation = useNavigation<StackNavigationProp<any>>();

  async function login() {
    const user = {
      email,
      password,
    };

    const { response, error } = await tryCatchRequest(
      api.post("/users/login", user)
    );

    if (error || response?.status !== 200) {
      console.log(error);
      return;
    }

    console.log(response.data);
    navigation.navigate("TabContainer");
  }

  return (
    <Container>
      <Title>Login</Title>
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
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize={"none"}
      />
      <OutlinedButton disabled={isButtonDisabled} onPress={login}>
        <ButtonText>Sign in</ButtonText>
      </OutlinedButton>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <SignupText>Don't have an account? Sign up</SignupText>
      </TouchableOpacity>
    </Container>
  );
}
