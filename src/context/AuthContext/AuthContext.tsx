import { createContext, FC, useCallback, useState } from "react";
import { getCookie, setCookie, removeCookie } from "../../utils";
import type {
  AuthContextObject,
  AuthContextProviderProps,
} from "./AuthContext.types";

const defaultContext: AuthContextObject = {
  isLogged: false,
  handleUserLogin: () => {},
  handleUserLogout: () => {},
};

export const AuthContext = createContext<AuthContextObject>(defaultContext);

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isLogged, setIsLogged] = useState<boolean>(
    getCookie("auth") === "active"
  );

  const handleLogin = useCallback(() => {
    setCookie("auth", "active");
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
        handleUserLogin: handleLogin,
        handleUserLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
