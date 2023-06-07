import { createSlice } from "@reduxjs/toolkit";
import { UserProps } from "./authSlice";

export interface GameProps {
  _id: string;
  title: string;
  description: string;
  dateTime: Date;
  location: {
    latitude: number;
    longitude: number;
  };
  organizer: UserProps;
  playerList: string[];
}

interface GameSliceProps {
  selectedGame: GameProps;
}

const initialState: GameSliceProps = {
  selectedGame: {
    _id: "",
    title: "",
    description: "",
    dateTime: new Date(),
    location: {
      latitude: 0,
      longitude: 0,
    },
    organizer: {
      _id: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: new Date(),
      gender: "",
      location: "",
    },
    playerList: [],
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSelectedGame: (state, action) => {
      const newState = {
        ...state,
        selectedGame: action.payload,
      };
      return newState;
    },
  },
});

export const { setSelectedGame } = gameSlice.actions;
export default gameSlice.reducer;
