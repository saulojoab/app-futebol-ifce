import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";
import theme from "../global/styles/theme";

import Icon from "react-native-vector-icons/FontAwesome";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Login,
  Home,
  SignUp,
  Games,
  CreateGame,
  GameDetails,
} from "../screens";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabContainer() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Jogos"
        component={Games}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="futbol-o" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Application() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="CreateGame" component={CreateGame} />
          <Stack.Screen name="GameDetails" component={GameDetails} />
          <Stack.Screen name="TabContainer" component={TabContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
