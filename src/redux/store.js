import { createStore } from "redux";
import RootReducer from "./reducer/RootReducer";

const globalState = {};

export const store = createStore(RootReducer, globalState);
