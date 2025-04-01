import React, { createContext, useContext, useEffect, useState } from "react";
import {
  IAuthContextProps,
  IUserContextType,
  IUserInfo,
  IVerifyResponse,
} from "../interfaces/Common";
import { API_BASE_URL, getToken } from "../utils/Constant";
import { useDispatch } from "react-redux";
import apiSlice from "../services/apiSlice";

export const UserContext = createContext<IUserContextType | null>(null);

const AuthContext: React.FC<IAuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<IUserInfo | null>(() => {
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (getToken()) {
          const response = await axios.get<IVerifyResponse>(
            `${API_BASE_URL}/auth/verify`,
            {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            }
          );
          if (response.data.success) {
            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        const axiosError = error as {
          response?: { data?: { error?: string } };
        };

        if (axiosError.response?.data?.error) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = (userData: IUserInfo, rememberMe: boolean) => {
    setUser(userData);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    dispatch(apiSlice.util.resetApiState());
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    return null;
  }
  return context;
};
export default AuthContext;
