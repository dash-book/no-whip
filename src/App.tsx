import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext/AuthContext";
import { Routes } from "./Routes";
import { ConfigProvider, Layout } from "antd";
import Header from "./components/Header/Header";
import "antd/dist/reset.css";
import theme from "./styles/antdThemeConfig";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <ConfigProvider theme={theme}>
        <Router>
          <Layout className="min-h-100vh">
            <Header />
            <Content
              style={{ padding: "20px", width: "100vw", display: "flex" }}
            >
              <Routes />
            </Content>
          </Layout>
        </Router>
      </ConfigProvider>
    </AuthContextProvider>
  );
};

export default App;
