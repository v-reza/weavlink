import { GLOBAL_STATE } from "@/redux/actions/AllAction";
const initialState = {};

const GlobalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default GlobalReducer;
