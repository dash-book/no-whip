import React, { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Form, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { User } from "../../types/User";
import { getColumns } from "../../components/EmployeesTable/EmployeeTable.utils";
import { useUsers } from "../../api/users/useUsers";
import { onDelete } from "../../components/EmployeesTable/EmployeeTablet.actions";
import { EmployeesTableModal } from "./EmployeesTableModal";

export const EmployeesTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const { getAllUsers, isLoading } = useUsers();

  useEffect(() => {
    (async () => {
      try {
        const response: User[] = await getAllUsers();
        setUsers(response || []);
      } catch (error) {
        message.error("Failed to fetch employees," + error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditing(true);
    setIsModalVisible(true);
    form.setFieldsValue(user);
  };

  const handleAddNew = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleView = (user: User) => {
    Modal.info({
      title: `Employee: ${user.username}`,
      content: (
        <div>
          <p>Email: {user.email}</p>
          <p>Roles: {user.roles.join(", ")}</p>
        </div>
      ),
      onOk() {},
    });
  };

  const handleDelete = (id: string) => onDelete({ id, users, setUsers });

  const columns = getColumns({ handleView, handleDelete, handleEdit });

  return (
    <main className="w-full" style={{ paddingTop: "16px" }}>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
          Add New Employee
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
      />
      <EmployeesTableModal
        {...{
          selectedUser,
          users,
          setUsers,
          isEditing,
          setIsModalVisible,
          isModalVisible,
          form,
        }}
      />
    </main>
  );
};
