import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  getProfile,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const restoreSession = async () => {

      const token = localStorage.getItem("token");

      if (!token) {

        setLoading(false);

        return;

      }

      try {

        const response = await getProfile();

        setUser(response.data);

      }

      catch {

        logout();

      }

      finally {

        setLoading(false);

      }

    };

    restoreSession();

  }, []);

  const login = async (credentials) => {

    const response = await loginUser(credentials);

      console.log("LOGIN RESPONSE", response);
  console.log("TOKEN", response?.data?.token);

    if (response.success) {

      localStorage.setItem(
  "token",
  response.data.accessToken
);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setUser(response.data.user);

    }

    return response;

  };

 const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

};
  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () =>
useContext(AuthContext);