import { type User } from "../../types/User";

export type Props = Pick<User, "username" | "password">;

export type apiResponse = {
  data: {
    message: string;
    success: boolean;
  };
};
