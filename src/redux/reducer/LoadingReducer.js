import { PROCESSING, FINISHED } from "@/redux/actions/AllAction";

const initialState = {
  isLoading: false,
  finished: false,
};

const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROCESSING: {
      return {
        ...state,
        isLoading: true,
        finished: false,
      };
    }
    case FINISHED: {
      return {
        ...state,
        isLoading: false,
        finished: true,
      };
    }
    default:
      return state;
  }
};

export default LoadingReducer;
