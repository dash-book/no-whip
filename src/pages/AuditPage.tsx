import React, { useState, useEffect } from "react";
import { Button, DatePicker, Form, message } from "antd";
import axios from "axios";
import moment from "moment";
import { CsvBuilder } from "filefy";

const { RangePicker } = DatePicker;

// Definir la interfaz para los registros CSV
interface CsvRecord {
  employeeId: string;
  date: string;
  entryTime: string;
  exitTime: string;
}

interface User {
  id: string;
  username: string;
}

const AuditPage: React.FC = () => {
  const [isAuditStarted, setIsAuditStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]); // Lista de usuarios
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        message.error("Error fetching users.");
      }
    };
    fetchUsers();
  }, []);

  const handleStartAudit = () => {
    setIsAuditStarted(true);
    message.warning(
      "The audit has started. Employees will be notified that their data is being requested."
    );
  };

  const getEmployeeNameById = (employeeId: string) => {
    const user = users.find((user) => user.id === employeeId);
    return user ? user.username : "Unknown";
  };

  const handleDownloadAudit = async (values: any) => {
    const { range } = values;
    const [startDate, endDate] = range;

    setLoading(true);
    try {
      const response = await axios.get(`/api/audit`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });

      const trackingData = response.data;

      const csvData: CsvRecord[] = trackingData.map((record: any) => ({
        employeeId: getEmployeeNameById(record.employeeId),
        date: moment(record.date).format("YYYY-MM-DD"),
        entryTime: moment(record.entryTime).format("HH:mm"),
        exitTime: moment(record.exitTime).format("HH:mm"),
      }));

      const fileName = `audit_report_${moment().format(
        "YYYY-MM-DD_HH-mm-ss"
      )}.csv`;

      new CsvBuilder(fileName)
        .setColumns(["Employee Name", "Date", "Entry Time", "Exit Time"])
        .addRows(
          csvData.map((item: CsvRecord) => [
            item.employeeId,
            item.date,
            item.entryTime,
            item.exitTime,
          ])
        )
        .exportFile();

      message.success("Audit data has been successfully extracted!");
    } catch (error) {
      message.error("Failed to download audit data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Audit Employee Tracking Data</h2>
      <p>
        By starting the audit, you will be able to access employee tracking
        data, but employees will be notified that their working hours are being
        reviewed.
      </p>

      {!isAuditStarted && (
        <Button className="primary-btn" onClick={handleStartAudit}>
          Start Audit
        </Button>
      )}

      {isAuditStarted && (
        <Form
          form={form}
          onFinish={handleDownloadAudit}
          layout="vertical"
          style={{ marginTop: "20px" }}
        >
          <Form.Item
            name="range"
            label="Select date range"
            rules={[{ required: true, message: "Please select a date range" }]}
          >
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Download CSV
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default AuditPage;
