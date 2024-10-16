import type { AuthContextObject } from "./AuthContext.types";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = (): AuthContextObject => {
  return useContext(AuthContext);
};
