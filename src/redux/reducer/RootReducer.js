import { combineReducers } from "redux";
import GlobalReducer from "./GlobalReducer";
import LoadingReducer from "./LoadingReducer";
import NotificationReducer from "./NotificationReducer";

const RootReducer = combineReducers({
  Global: GlobalReducer,
  Notifications: NotificationReducer,
  Loading: LoadingReducer,
});

export default RootReducer;