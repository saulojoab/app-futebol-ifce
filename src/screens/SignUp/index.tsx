// a login screen that uses an email and password to authenticate the user

import React, { useState } from "react";
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

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [preferredPosition, setPreferredPosition] = useState("");
  const [teamPreferences, setTeamPreferences] = useState("");

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const isEmailValid = emailRegex.test(email);
  const isButtonDisabled = !isEmailValid || password.length < 6;

  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <Container>
      <Title>SignUp</Title>
      <TextInput
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        placeholder="Full Name"
        autoCapitalize={"words"}
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email Address"
        autoCapitalize={"none"}
        keyboardType={"email-address"}
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize={"none"}
      />
      <TextInput
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        placeholder="Phone Number"
        keyboardType={"phone-pad"}
        autoCapitalize={"none"}
      />
      <TextInput
        value={dateOfBirth}
        onChangeText={(text) => setDateOfBirth(text)}
        placeholder="Date of Birth (DD/MM/YYYY)"
        keyboardType={"numeric"}
        autoCapitalize={"none"}
      />
      <TextInput
        value={gender}
        onChangeText={(text) => setGender(text)}
        placeholder="Gender"
        autoCapitalize={"words"}
      />
      <TextInput
        value={location}
        onChangeText={(text) => setLocation(text)}
        placeholder="Location"
        autoCapitalize={"words"}
      />
      <TextInput
        value={skillLevel}
        onChangeText={(text) => setSkillLevel(text)}
        placeholder="Skill Level"
        autoCapitalize={"none"}
      />
      <TextInput
        value={preferredPosition}
        onChangeText={(text) => setPreferredPosition(text)}
        placeholder="Preferred Position"
        autoCapitalize={"none"}
      />
      <TextInput
        value={teamPreferences}
        onChangeText={(text) => setTeamPreferences(text)}
        placeholder="Team Preferences"
        autoCapitalize={"words"}
      />

      <OutlinedButton
        disabled={isButtonDisabled}
        onPress={() => navigation.navigate("Login")}
      >
        <ButtonText>Sign Up</ButtonText>
      </OutlinedButton>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <SignupText>Already have an account? Sign in</SignupText>
      </TouchableOpacity>
    </Container>
  );
}
