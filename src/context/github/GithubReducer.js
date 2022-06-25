const githubReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "FETCH_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "FETCH_REPOS":
      return {
        ...state,
        repos: action.payload,
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
