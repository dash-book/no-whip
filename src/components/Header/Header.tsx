import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import logo from "../../assets/logo.svg";
import "./Header.scss";
import { useAuth } from "../../context/AuthContext/useAuth";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const { isLogged, handleUserLogout } = useAuth();
  return (
    <AntHeader className="l__Header">
      <div>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ width: "200px" }} />
        </Link>
      </div>

      <Menu className="l__Menu" mode="horizontal" theme="dark">
        <Menu.Item key="employees">
          <Link to="/employees">Employees</Link>
        </Menu.Item>
        <Menu.Item key="audits">
          <Link to="/audit">Audits</Link>
        </Menu.Item>
        <Menu.Item key="tracking">
          <Link to="/tracking">Tracking</Link>
        </Menu.Item>
        <Menu.Item key="who-is-working">
          <Link to="/who-is-working">Who is working?</Link>
        </Menu.Item>
        {isLogged ? (
          <Menu.Item key="log-out">
            <span onClick={handleUserLogout}>Logout</span>
          </Menu.Item>
        ) : (
          <Menu.Item key="log-in">
            <Link to="/login">Log in</Link>
          </Menu.Item>
        )}
      </Menu>
    </AntHeader>
  );
};

export default Header;
