import React, { createContext, useState, useContext } from "react";
import { AuthContextData, User } from "../types/app";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{}>({});
  const register = async () => {};
  const signIn = async () => {};

  const signOut = async () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setLoading,
        setError,
        loading,
        signIn,
        error,
        signOut,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
