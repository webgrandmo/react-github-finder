import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_API_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_API_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Search users
  const searchUsers = async (text) => {
    const params = new URLSearchParams({
      q: text,
    });
    setLoading();
    const response = await fetch(`${GITHUB_API_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_API_TOKEN}`,
      },
    });
    const { items } = await response.json();
    dispatch({ type: "FETCH_USERS", payload: items });
  };

  // Get user
  const getUser = async (login) => {
    const response = await fetch(`${GITHUB_API_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_API_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location.href = "/notfound";
    } else {
      const data = await response.json();
      dispatch({ type: "FETCH_USER", payload: data });
    }
  };

  // Get Repos
  const getRepos = async (login) => {
    const params = new URLSearchParams({
      sort: "created",
      direction: "desc",
      per_page: 10,
    });
    setLoading();
    const response = await fetch(
      `${GITHUB_API_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_API_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    dispatch({ type: "FETCH_REPOS", payload: data });
  };

  const setLoading = () => dispatch({ type: "SET_LOADING" });

  const clearResults = () => dispatch({ type: "CLEAR_RESULTS" });
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        searchUsers,
        getUser,
        getRepos,
        clearResults,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
