import { createContext, FC, useCallback, useState } from "react";
import { getCookie, setCookie, removeCookie } from "../../utils";
import type {
  AuthContextObject,
  AuthContextProviderProps,
} from "./AuthContext.types";

const defaultContext: AuthContextObject = {
  isLogged: false,
  id: undefined,
  handleUserLogin: () => {},
  handleUserLogout: () => {},
};

export const AuthContext = createContext<AuthContextObject>(defaultContext);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isLogged, setIsLogged] = useState<boolean>(!!getCookie("auth"));
  const [id, setId] = useState<string | undefined>(getCookie("auth"));

  const handleLogin = useCallback((id: string) => {
    setCookie("auth", id);
    setId(id);
    return setIsLogged(true);
  }, []);

  const handleLogout = useCallback(() => {
    removeCookie("auth");
    return setIsLogged(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        id,
        handleUserLogin: handleLogin,
        handleUserLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
