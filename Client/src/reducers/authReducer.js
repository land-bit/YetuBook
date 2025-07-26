// src/reducers/authReducer.js
const authReducer = (
    state = { loading: false, user: null },
    action
  ) => {
    switch (action.type) {
      case "AUTH_START":
        return { ...state, loading: true };
      case "AUTH_SUCCESS":
        return { ...state, loading: false, user: action.data };
      case "AUTH_FAIL":
        return { ...state, loading: false };
      default:
        return state;
    }
  };
  
  export default authReducer;
  