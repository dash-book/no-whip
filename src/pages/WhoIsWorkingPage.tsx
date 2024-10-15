import React, { useState } from "react";
import {
  Button,
  DatePicker,
  TimePicker,
  Form,
  Card,
  Row,
  Col,
  message,
  Avatar,
  Modal,
  Input,
  Tag,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const WhoIsWorkingPage: React.FC = () => {
  const [form] = Form.useForm();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null); // Usuario actualmente seleccionado para editar

  // Función para manejar el envío del formulario de búsqueda
  const handleSearch = async (values: any) => {
    const { date, time } = values;
    const dateTime = moment(date)
      .set({
        hour: time.hour(),
        minute: time.minute(),
        second: 0,
      })
      .toISOString();

    setLoading(true);

    try {
      const response = await axios.get("/api/working", {
        params: {
          dateTime,
        },
      });

      setEmployees(response.data);
      message.success("Employees retrieved successfully.");
    } catch (error) {
      message.error("No employees were working at the specified time.");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener la URL del avatar
  const getAvatarUrl = (username: string) => {
    return `https://robohash.org/${username}.png`;
  };

  // Función para editar un usuario (abrir modal)
  const handleEdit = (user: any) => {
    setCurrentUser(user);
    setIsEditModalVisible(true);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
    });
  };

  // Función para enviar el formulario de edición
  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`/api/users/${currentUser.id}`, values);
      message.success("User updated successfully");
      setIsEditModalVisible(false);

      // Actualizar el usuario en la lista
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === currentUser.id ? { ...emp, ...values } : emp
        )
      );
    } catch (error) {
      message.error("Failed to update user");
    }
  };

  // Función para cerrar el modal de edición
  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  // Función para eliminar un usuario con confirmación
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`);
      message.success("User deleted successfully");

      // Eliminar el usuario de la lista
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.id !== id)
      );
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Who is Working?</h2>

      {/* Formulario para seleccionar fecha y hora */}
      <Form form={form} onFinish={handleSearch} layout="horizontal">
        <Form.Item
          name="date"
          label="Select Date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="time"
          label="Select Time"
          rules={[{ required: true, message: "Please select a time" }]}
        >
          <TimePicker format="HH:mm" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Search
          </Button>
        </Form.Item>
      </Form>

      {/* Grid de empleados */}
      <Row gutter={[16, 16]}>
        {employees.map((employee: any) => (
          <Col key={employee.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={employee.username}
              bordered
              cover={
                <Avatar size={128} src={getAvatarUrl(employee.username)} />
              } // Avatar generado
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => handleEdit(employee)}
                />,
                <Popconfirm
                  title="Are you sure you want to delete this user?"
                  onConfirm={() => handleDelete(employee.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key="delete" />
                </Popconfirm>,
              ]}
            >
              <p>{employee.email}</p>
              {/* Mostrar roles como Tags */}
              <div>
                {employee.roles.map((role: string) => (
                  <Tag color="blue" key={role}>
                    {role}
                  </Tag>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para editar usuario */}
      <Modal
        title="Edit User"
        visible={isEditModalVisible}
        onOk={handleEditSubmit}
        onCancel={handleCancelEdit}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter the username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WhoIsWorkingPage;
