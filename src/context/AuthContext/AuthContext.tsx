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

const AuthContext = createContext<AuthContextObject>(defaultContext);

const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const authCookie = getCookie("auth");

  const [isLogged, setIsLogged] = useState<boolean>(
    Boolean(authCookie && authCookie.length > 0)
  );
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

export { AuthContext, AuthContextProvider };
