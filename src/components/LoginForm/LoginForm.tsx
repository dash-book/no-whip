import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useLogin } from "../../api/login/useLogin";

import { type Props as loginProps } from "../../api/login/login.types";

export const LoginForm = () => {
  const [form] = Form.useForm();
  const { login } = useLogin();

  const handleSubmit = async (values: loginProps) => {
    return await login({
      username: values.username,
      password: values.password,
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "fit-content",
        margin: "0 auto",
      }}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please input the username" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="password"
        rules={[{ required: true, message: "Please input the password" }]}
      >
        <Input.Password
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
