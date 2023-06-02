import { combineReducers, configureStore } from "@reduxjs/toolkit";
import communicationsReducer from "../features/communicationsSlice";

const rootReducer = combineReducers({
  communications: communicationsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export interface CommunicationsState {
  onCall: boolean;
}

export interface RootState {
  communications: CommunicationsState;
}
