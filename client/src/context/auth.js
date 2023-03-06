import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

const userToken = JSON.parse(localStorage.getItem("userToken"));

if (userToken) {
  const decodeToken = jwtDecode(userToken.token);

  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("userToken");
  } else {
    initialState.user = userToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("userToken", JSON.stringify(userData));
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
