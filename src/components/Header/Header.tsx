import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext/useAuth";
import logo from "../../assets/logo.svg";
import apiRoutes from "../../api/apiRoutes";
import "./Header.scss";

const { Header: AntHeader } = Layout;

export const Header: React.FC = () => {
  const { isLogged, handleUserLogout } = useAuth();

  const menuItems = [
    {
      key: "employees",
      label: <Link to={apiRoutes.employee.page}>Employees</Link>,
    },
    {
      key: "audits",
      label: <Link to={apiRoutes.audit.page}>Audits</Link>,
    },
    {
      key: "tracking",
      label: <Link to={apiRoutes.tracking.page}>Tracking</Link>,
    },
    {
      key: "who-is-working",
      label: <Link to={apiRoutes.whoIsWorking.page}>Who is working?</Link>,
    },
    isLogged
      ? {
          key: "log-out",
          label: (
            <span data-testid="log-out-header" onClick={handleUserLogout}>
              <UsergroupDeleteOutlined style={{ paddingRight: "6px" }} />
              Logout
            </span>
          ),
        }
      : {
          key: "log-in",
          label: (
            <Link to={apiRoutes.login.page}>
              <UsergroupAddOutlined style={{ paddingRight: "6px" }} />
              Log in
            </Link>
          ),
        },
  ];

  return (
    <AntHeader className="l__Header">
      <Link to="/">
        <img src={logo} alt="Logo" style={{ width: "150px" }} />
      </Link>

      <Menu
        className="l__Menu"
        mode="horizontal"
        theme="dark"
        items={menuItems}
      />
    </AntHeader>
  );
};

export default Header;
