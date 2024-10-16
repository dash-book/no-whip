import type { User } from "../../types/User";
import { Button, Space } from "antd";

import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { getColumnsProps } from "./EmployeeTable.types";

export const getColumns = ({
  handleView,
  handleDelete,
  handleEdit,
}: getColumnsProps) => {
  return [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles: string[]) => roles.join(", "),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: User) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleView(record)}
            icon={<UserOutlined />}
          >
            View
          </Button>
          <Button
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
            type="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            icon={<DeleteOutlined />}
            type="primary"
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
};
