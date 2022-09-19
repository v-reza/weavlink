const SocketReducer = (state, action) => {
  switch (action.type) {
    case "SOCKET":
      return {
        ...state,
        socket: action.socket,
      };
    case "SAVE_STATE": {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
  }
};

export default SocketReducer;
