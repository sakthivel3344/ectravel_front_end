import { travellerReducer } from "../features/TrainBooking/travellersList";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const presistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  train: travellerReducer,
});

const presistReducer = persistReducer(presistConfig, rootReducer);
export const trainBookingStore = configureStore({
  reducer: presistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
