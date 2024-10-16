import axios, { AxiosRequestConfig } from "axios";
import apiRoutes from "../apiRoutes";
import type { getAllapiResponse, setUserapiResponse } from "./useUsers.types";

import { User } from "../../types/User";
import { useState } from "react";

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const getAllUsers = () => {
    setIsLoading(true);
    return axios
      .get<AxiosRequestConfig, getAllapiResponse>(apiRoutes.users.getUsers)
      .then((response) => {
        return response.data as User[];
      })
      .catch(() => {
        throw new Error("Failed to fetch employees");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editUser = (user: User) => {
    setIsLoading(true);
    return axios
      .put<AxiosRequestConfig, setUserapiResponse>(
        apiRoutes.users.editUser(user.id),
        user
      )
      .then((response) => {
        return response.data as User;
      })
      .catch(() => {
        throw new Error("Failed to edit employee");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addUser = (user: User) => {
    setIsLoading(true);
    return axios
      .post<AxiosRequestConfig, setUserapiResponse>(
        apiRoutes.users.createUser,
        user
      )
      .then((response) => {
        return response.data as User;
      })
      .catch(() => {
        throw new Error("Failed to create employee");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    getAllUsers,
    isLoading,
    addUser,
    editUser,
  };
};
