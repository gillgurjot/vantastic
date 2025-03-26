import { combineReducers, configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import userReducer from "./slices/userSlice";
import barbersReducer from "./slices/barbersSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  // blacklist: ['jobs'],
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobReducer,
  barbers: barbersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);
