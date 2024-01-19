// Thirds
import { configureStore } from "@reduxjs/toolkit";
import storage from "reduxjs-toolkit-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist";
// import { encryptTransform } from "redux-persist-transform-encrypt";

// Project import
import reducers from "./reducers";
// import { JWT_SECRET } from "../config/api";
import { createLogger } from "redux-logger";

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const logger = createLogger();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [], // states that u want to persist
  blacklist: [
    "costfund", // state that u dont want to persist
  ],
  // transforms: [
  //   encryptTransform({
  //     secretKey: JWT_SECRET,
  //     onError: (err) => {
  //       console.log("err", err);
  //     },
  //   }),
  // ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
    // .concat(logger),
});

const { dispatch } = store;

let persistor = persistStore(store);

export { persistor, store, dispatch };
