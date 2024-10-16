import { Modal, Input, Select, Form, message } from "antd";
import { useUsers } from "../../api/users/useUsers";
import {
  onCreateUser,
  onEditUser,
} from "../../components/EmployeesTable/EmployeeTablet.actions";

import type { EmployeeTableModalProps } from "./EmployeeTable.types";

export const EmployeesTableModal = ({
  selectedUser,
  users,
  setUsers,
  isEditing,
  setIsModalVisible,
  isModalVisible,
  form,
}: EmployeeTableModalProps) => {
  console.log("selectedUser", selectedUser);

  const { Option } = Select;
  const { addUser, editUser } = useUsers();

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (isEditing && selectedUser) {
        onEditUser({ editUser, selectedUser, values, users, setUsers });
      } else {
        onCreateUser({ values, users, setUsers, addUser });
      }

      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save employee" + error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={isEditing ? "Edit Employee" : "Add New Employee"}
      visible={isModalVisible}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input the username" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input the email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="roles"
          label="Roles"
          rules={[{ required: true, message: "Please input the roles" }]}
        >
          <Select placeholder="Select a role" mode="multiple">
            <Option value="EMPLOYEE">EMPLOYEE</Option>
            <Option value="MANAGER">MANAGER</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
