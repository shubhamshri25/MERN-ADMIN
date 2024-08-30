import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;

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

  // JWT AUTHENTICATION - to get the currently loggedIN user data
  const userAuthentication = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/user", {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        const data = await response.data;
        console.log("userData", data.userData);
        setUser(data.userData);
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  // to get all the services
  const getServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/data/service"
      );

      if (response.status >= 200 && response.status < 300) {
        const res_data = response.data;
        // console.log(res_data.msg)
        setServices(res_data.msg);
      }
    } catch (error) {
      console.log(`services frontend error: ${error}`);
    }
  };

  useEffect(() => {
    userAuthentication();
    getServices();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isloggedIn,
        storeTokenInLs,
        logoutUser,
        user,
        services,
        authorizationToken,
      }}
    >
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
