import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import HomePage from './pages/HomePage';
import EmployeesPage from './pages/EmployeesPage';
import Header from './components/Header/Header';
import 'antd/dist/reset.css';
import TrackingPage from './pages/TrackingPage';
import AuditPage from './pages/AuditPage';
import WhoIsWorkingPage from './pages/WhoIsWorkingPage';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout className="min-h-100vh">
        <Header />

        <Content style={{ padding: '20px', width: '100vw' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/who-is-working" element={<WhoIsWorkingPage />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
