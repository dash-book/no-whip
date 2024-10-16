export interface AuthContextObject {
  isLogged: boolean;
  id?: string;
  handleUserLogin: (id: string) => void;
  handleUserLogout: () => void;
}

export interface AuthContextProviderProps {
  children: React.ReactNode;
}
