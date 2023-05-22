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
  Profile,
  UserGames,
  EditProfile,
} from "src/screens";
import { Provider } from "react-redux";
import { store, persistor } from "src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

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
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Application() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="CreateGame" component={CreateGame} />
              <Stack.Screen name="GameDetails" component={GameDetails} />
              <Stack.Screen name="TabContainer" component={TabContainer} />
              <Stack.Screen name="UserGames" component={UserGames} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
