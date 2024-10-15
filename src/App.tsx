import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./Routes";
import { Layout } from "antd";
import Header from "./components/Header/Header";
import "antd/dist/reset.css";
import { AuthContextProvider } from "./context/AuthContext/AuthContext";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Layout className="min-h-100vh">
          <Header />
          <Content style={{ padding: "20px", width: "100vw", display: "flex" }}>
            <Routes />
          </Content>
        </Layout>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
