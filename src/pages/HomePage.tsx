import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import {
  UsergroupAddOutlined,
  ClockCircleOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const HomePage: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center w-full wrap"
      style={{ gap: "16px" }}
    >
      <Link to="/employees">
        <Button
          type="primary"
          size="large"
          className="flex flex-col"
          style={{ width: "200px", aspectRatio: "1/1", height: "auto" }}
        >
          <UsergroupAddOutlined style={{ fontSize: "34px" }} />
          Employees
        </Button>
      </Link>
      <Link to="/audit">
        <Button
          className="flex flex-col"
          style={{ width: "200px", aspectRatio: "1/1", height: "auto" }}
          type="primary"
        >
          <ProfileOutlined style={{ fontSize: "34px" }} />
          Audits
        </Button>
      </Link>
      <Link to="/tracking">
        <Button
          type="primary"
          size="large"
          className="flex flex-col"
          style={{ width: "200px", aspectRatio: "1/1", height: "auto" }}
        >
          <ClockCircleOutlined style={{ fontSize: "34px" }} />
          Tracking
        </Button>
      </Link>
      <Link to="/who-is-working">
        <Button
          type="primary"
          size="large"
          className="flex flex-col"
          style={{ width: "200px", aspectRatio: "1/1", height: "auto" }}
        >
          <QuestionCircleOutlined style={{ fontSize: "34px" }} />
          Who is Working?
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
