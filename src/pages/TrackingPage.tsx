import React, { useEffect, useState } from 'react';
import { Select, Table, Button, Modal, Form, Input, TimePicker, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

interface User {
  id: string;
  username: string;
  email: string;
}

interface TrackingRecord {
  id: string;
  employeeId: string;
  date: string;
  entryTime: string;
  exitTime: string;
}

const TrackingPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [trackingRecords, setTrackingRecords] = useState<TrackingRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<TrackingRecord | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        message.error('Error fetching users');
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      const fetchTrackingRecords = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/tracking/${selectedUserId}`);
          setTrackingRecords(response.data);
        } catch (error) {
          message.error('Error fetching tracking records');
        } finally {
          setLoading(false);
        }
      };
      fetchTrackingRecords();
    }
  }, [selectedUserId]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Entry Time',
      dataIndex: 'entryTime',
      key: 'entryTime',
      render: (time: string) => new Date(time).toLocaleTimeString(),
    },
    {
      title: 'Exit Time',
      dataIndex: 'exitTime',
      key: 'exitTime',
      render: (time: string) => new Date(time).toLocaleTimeString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: TrackingRecord) => (
        <span>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
        </span>
      ),
    },
  ];

  const handleUserChange = (value: string) => {
    setSelectedUserId(value);
  };

  const handleAddNew = () => {
    setIsEditing(false);
    form.resetFields();
    setCurrentRecord(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: TrackingRecord) => {
    setIsEditing(true);
    setCurrentRecord(record);
    form.setFieldsValue({
      date: moment(record.date),
      entryTime: moment(record.entryTime),
      exitTime: moment(record.exitTime),
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/tracking/${id}`);
      setTrackingRecords(trackingRecords.filter(record => record.id !== id));
      message.success('Tracking record deleted successfully');
    } catch (error) {
      message.error('Failed to delete tracking record');
    }
  };
  
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const { date, entryTime, exitTime } = values;
  
      const formattedDate = new Date(date);
      const formattedEntryTime = new Date(entryTime.toDate());
      const formattedExitTime = new Date(exitTime.toDate());
  
      if (isEditing && currentRecord) {
        const updatedRecord = {
          ...currentRecord,
          date: formattedDate.toISOString(),
          entryTime: formattedEntryTime.toISOString(),
          exitTime: formattedExitTime.toISOString(),
        };
  
        await axios.put(`/api/tracking/${currentRecord.id}`, updatedRecord);
        setTrackingRecords(trackingRecords.map(record => (record.id === currentRecord.id ? updatedRecord : record)));
        message.success('Tracking record updated successfully');
      } else {
        const newRecord = {
          employeeId: selectedUserId,
          date: formattedDate.toISOString(),
          entryTime: formattedEntryTime.toISOString(),
          exitTime: formattedExitTime.toISOString(),
        };
  
        const response = await axios.post('/api/tracking', newRecord);
        setTrackingRecords([...trackingRecords, response.data]);
        message.success('New tracking record created successfully');
      }
  
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save tracking record');
    }
  };
  

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h2>Select Employee to View Tracking</h2>
      
      <Select
        placeholder="Select an employee"
        style={{ width: 300, marginBottom: 20 }}
        onChange={handleUserChange}
      >
        {users.map(user => (
          <Option key={user.id} value={user.id}>
            {user.username}
          </Option>
        ))}
      </Select>

      {selectedUserId && (
        <div style={{ marginBottom: 20 }}>
          <Button type="primary" onClick={handleAddNew}>
            Add New Tracking Record
          </Button>
        </div>
      )}

      {selectedUserId && (
        <Table
          columns={columns}
          dataSource={trackingRecords}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      )}

      <Modal
        title={isEditing ? 'Edit Tracking Record' : 'Add New Tracking Record'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item name="entryTime" label="Entry Time" rules={[{ required: true }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item name="exitTime" label="Exit Time" rules={[{ required: true }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TrackingPage;
