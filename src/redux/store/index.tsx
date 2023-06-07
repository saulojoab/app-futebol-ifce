import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer, GameReducer } from "src/redux/features";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, AuthReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    game: GameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
export const persistor = persistStore(store);
