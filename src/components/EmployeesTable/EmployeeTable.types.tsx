import { FormInstance } from "antd";
import { User } from "../../types/User";

export interface getColumnsProps {
  handleView: (record: User) => void;
  handleEdit: (record: User) => void;
  handleDelete: (record: string) => void;
}

export interface onDeleteProps {
  id: string;
  users: User[];
  setUsers: (users: User[]) => void;
}

export interface onCreateProps {
  values: User;
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => Promise<User>;
}

export interface onEditProps {
  editUser: (user: User) => Promise<User>;
  selectedUser: User;
  values: User;
  setUsers: (users: User[]) => void;
  users: User[];
}

export interface EmployeeTableModalProps {
  selectedUser: User | null;
  users: User[];
  setUsers: (users: User[]) => void;
  isEditing: boolean;
  setIsModalVisible: (isVisible: boolean) => void;
  form: FormInstance<User>;
  isModalVisible: boolean;
}
