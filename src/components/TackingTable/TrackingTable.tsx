import React, { useEffect, useState, useMemo } from "react";
import { Table, Button, Modal, Form, Input, TimePicker, message } from "antd";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/AuthContext/useAuth";
import { getColumns, getTotalTime } from "./TrackingTable.utils";

import type { TrackingRecord } from "../../types/Tracking";
import { PlusOutlined } from "@ant-design/icons";

export const TrackingPageTable: React.FC = () => {
  const { id } = useAuth();
  const [selectedUserId] = useState<string | undefined>(id);
  const [trackingRecords, setTrackingRecords] = useState<TrackingRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<TrackingRecord | null>(
    null
  );

  const trackingRecordsWithTotal = useMemo(
    () =>
      trackingRecords.map((record) => ({
        ...record,
        total: getTotalTime(record.entryTime, record.exitTime),
      })),
    [trackingRecords]
  );
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedUserId) {
      const fetchTrackingRecords = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/tracking/${selectedUserId}`);
          setTrackingRecords(response.data);
        } catch (error) {
          message.error("Error fetching tracking records" + error);
        } finally {
          setLoading(false);
        }
      };
      fetchTrackingRecords();
    }
  }, [selectedUserId]);

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
      setTrackingRecords(trackingRecords.filter((record) => record.id !== id));
      message.success("Tracking record deleted successfully");
    } catch (error) {
      message.error("Failed to delete tracking record" + error);
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
        setTrackingRecords(
          trackingRecords.map((record) =>
            record.id === currentRecord.id ? updatedRecord : record
          )
        );
        message.success("Tracking record updated successfully");
      } else {
        const newRecord = {
          employeeId: selectedUserId,
          date: formattedDate.toISOString(),
          entryTime: formattedEntryTime.toISOString(),
          exitTime: formattedExitTime.toISOString(),
        };

        const response = await axios.post("/api/tracking", newRecord);
        setTrackingRecords([...trackingRecords, response.data]);
        message.success("New tracking record created successfully");
      }

      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save tracking record" + error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  const columns = getColumns({ handleEdit, handleDelete });
  return (
    <main className="w-full" style={{ padding: "16px 16px 0 16px" }}>
      {selectedUserId && (
        <div style={{ marginBottom: 20 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddNew}>
            Add New Tracking Record
          </Button>
        </div>
      )}

      {selectedUserId && (
        <Table
          columns={columns}
          dataSource={trackingRecordsWithTotal}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      )}

      <Modal
        title={isEditing ? "Edit Tracking Record" : "Add New Tracking Record"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="entryTime"
            label="Entry Time"
            rules={[{ required: true }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="exitTime"
            label="Exit Time"
            rules={[{ required: true }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
};
