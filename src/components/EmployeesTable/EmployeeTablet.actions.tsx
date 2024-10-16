import axios from "axios";
import { message } from "antd";
import { User } from "../../types/User";

import {
  onDeleteProps,
  onCreateProps,
  onEditProps,
} from "./EmployeeTable.types";

export const onDelete = async ({ id, users, setUsers }: onDeleteProps) => {
  try {
    await axios.delete(`/api/users/${id}`);
    setUsers(users.filter((user: User) => user.id !== id));
    message.success("Employee deleted successfully");
  } catch (error) {
    message.error("Failed to delete employee" + error);
  }
};

export const onCreateUser = async ({
  values,
  users,
  setUsers,
  addUser,
}: onCreateProps) => {
  const newUser = {
    ...values,
    password: "defaultPassword123",
  };
  const response = await addUser(newUser);

  setUsers([...users, response]);
  return message.success("Employee created successfully");
};

export const onEditUser = async ({
  editUser,
  selectedUser,
  values,
  setUsers,
  users,
}: onEditProps) => {
  await editUser({ ...selectedUser, ...values });
  setUsers(
    users.map((user) =>
      user.id === selectedUser.id ? { ...user, ...values } : user
    )
  );
  message.success("Employee updated successfully");
};
