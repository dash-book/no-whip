import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import logo from "../../assets/logo.svg";
import "./Header.scss";
import { useAuth } from "../../context/AuthContext/useAuth";
import apiRoutes from "../../api/apiRoutes";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const { isLogged, handleUserLogout } = useAuth();
  return (
    <AntHeader className="l__Header">
      <Link to="/">
        <img src={logo} alt="Logo" style={{ width: "150px" }} />
      </Link>

      <Menu className="l__Menu" mode="horizontal" theme="dark">
        <Menu.Item key="employees">
          <Link to={apiRoutes.employee.page}>Employees</Link>
        </Menu.Item>
        <Menu.Item key="audits">
          <Link to={apiRoutes.audit.page}>Audits</Link>
        </Menu.Item>
        <Menu.Item key="tracking">
          <Link to={apiRoutes.tracking.page}>Tracking</Link>
        </Menu.Item>
        <Menu.Item key="who-is-working">
          <Link to={apiRoutes.whoIsWorking.page}>Who is working?</Link>
        </Menu.Item>
        {isLogged ? (
          <Menu.Item key="log-out">
            <span onClick={handleUserLogout}>Logout</span>
          </Menu.Item>
        ) : (
          <Menu.Item key="log-in">
            <Link to={apiRoutes.login.page}>Log in</Link>
          </Menu.Item>
        )}
      </Menu>
    </AntHeader>
  );
};

export default Header;
