import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Input, Select, Form, message } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

const EmployeesPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      message.success('Employee deleted successfully');
    } catch (error) {
      message.error('Failed to delete employee');
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditing(true);
    setIsModalVisible(true);
    form.setFieldsValue(user);
  };

  const handleView = (user: User) => {
    Modal.info({
      title: `Employee: ${user.username}`,
      content: (
        <div>
          <p>Email: {user.email}</p>
          <p>Roles: {user.roles.join(', ')}</p>
        </div>
      ),
      onOk() {},
    });
  };

  const handleAddNew = () => {
    setSelectedUser(null);
    setIsEditing(false);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (isEditing && selectedUser) {
        await axios.put(`/api/users/${selectedUser.id}`, values);
        setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...values } : user)));
        message.success('Employee updated successfully');
      } else {
        const newUser = {
          ...values,
          password: 'defaultPassword123',
          roles: ['EMPLOYEE']
        };
  
        const response = await axios.post('/api/users', newUser);
        setUsers([...users, response.data]);
        message.success('Employee created successfully');
      }
  
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save employee');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: string[]) => roles.join(', '),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button onClick={() => handleView(record)} icon={<UserOutlined />}>
            View
          </Button>
          <Button onClick={() => handleEdit(record)} icon={<EditOutlined />} type="primary">
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id)} icon={<DeleteOutlined />} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
          Add New Employee
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title={isEditing ? 'Edit Employee' : 'Add New Employee'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input the username' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input the email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="roles"
            label="Roles"
            rules={[{ required: true, message: 'Please input the roles' }]}
          >
            <Select placeholder="Select a role" defaultValue="EMPLOYEE" mode="multiple">
              <Option value="EMPLOYEE">EMPLOYEE</Option>
              <Option value="MANAGER">MANAGER</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeesPage;
