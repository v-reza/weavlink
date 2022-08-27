import { combineReducers } from "redux";
import GlobalReducer from "./GlobalReducer";
import LoadingReducer from "./LoadingReducer";
import NotificationReducer from "./NotificationReducer";
import UserReducer from "./UserReducer";

const RootReducer = combineReducers({
  Global: GlobalReducer,
  Notifications: NotificationReducer,
  Loading: LoadingReducer,
  User: UserReducer,
});

export default RootReducer;