import axios, { AxiosRequestConfig } from "axios";
import apiRoutes from "../apiRoutes";
import { useAuth } from "../../context/AuthContext/useAuth";
import type { Props, apiResponse } from "./login.types";

export const useLogin = () => {
  const { handleUserLogin } = useAuth();

  const loginCall = ({ username, password }: Props) => {
    return axios
      .post<AxiosRequestConfig, apiResponse>(apiRoutes.login.login, {
        username,
        password,
      })
      .then(({ data }) => {
        console.log("response", data);
        if (data.success) {
          return handleUserLogin();
        }
      })
      .catch(({ response }) => {
        throw new Error(response?.data?.message || "Error");
      });
  };

  return {
    login: loginCall,
  };
};
