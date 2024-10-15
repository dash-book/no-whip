export interface AuthContextObject {
  isLogged: boolean;
  handleUserLogin: () => void;
  handleUserLogout: () => void;
}

export interface AuthContextProviderProps {
  children: React.ReactNode;
}
