const githubReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "FETCH_USER_AND_REPO":
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CLEAR_RESULTS":
      return {
        ...state,
        users: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default githubReducer;
