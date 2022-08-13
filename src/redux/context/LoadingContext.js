import { createContext, useReducer } from "react";
import LoadingReducer from "../reducer/LoadingReducer";

const INITAL_STATE = {
  isLoading: false,
  processing: false, // if true fetch processing done
};

export const LoadingContext = createContext(INITAL_STATE);

export const LoadingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LoadingReducer, INITAL_STATE);

  return (
    <LoadingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};
