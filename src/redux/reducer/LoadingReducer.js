const LoadingReducer = (state, action) => {
  switch (action.type) {
    case "PROCESSING":
      return {
        isLoading: true,
        processing: false,
      };
    case "FINISHED":
      return {
        isLoading: false,
        processing: true,
      };
    default:
  }
};

export default LoadingReducer;
