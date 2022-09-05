import { PROCESSING, FINISHED, WITHPROGRESSBAR } from "@/redux/actions/AllAction";

const initialState = {
  isLoading: false,
  finished: false,
  progressBar: 0,
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
    case WITHPROGRESSBAR: {
      return {
        ...state,
        isLoading: true,
        finished: false,
        progressBar: action.payload,
      }
    }
    default:
      return state;
  }
};

export default LoadingReducer;
