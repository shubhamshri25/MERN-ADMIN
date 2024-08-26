import { useState, useEffect, createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  // storing the token in local storage
  const storeTokenInLs = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  // flag for toggling  logout and login
  let isloggedIn = !!token;
  console.log("isloggedIn", isloggedIn);

  // implemneting log out functionality
  const logoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ storeTokenInLs, logoutUser, isloggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
