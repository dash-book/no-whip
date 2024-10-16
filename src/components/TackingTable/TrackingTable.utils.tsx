import { Button } from "antd";

import type { TrackingRecord } from "../../types/Tracking";
import type { getTrackingColumnsProps } from "./TrackingTable.types";

export const getColumns = ({
  handleEdit,
  handleDelete,
}: getTrackingColumnsProps) => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Entry Time",
      dataIndex: "entryTime",
      key: "entryTime",
      render: (time: string) => new Date(time).toLocaleTimeString(),
    },
    {
      title: "Exit Time",
      dataIndex: "exitTime",
      key: "exitTime",
      render: (time: string) => new Date(time).toLocaleTimeString(),
    },
    {
      title: "Total Time",
      dataIndex: "total",
      key: "total",
      render: (time: string) => time,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: TrackingRecord) => (
        <span>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button type="primary" onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </span>
      ),
    },
  ];
};

export const getTotalTime = (entryTime: string, exitTime: string) => {
  const entry = new Date(entryTime);
  const exit = new Date(exitTime);
  const diff = exit.getTime() - entry.getTime();
  const hours = diff / (1000 * 60 * 60);
  const minutes = (hours - Math.floor(hours)) * 60;
  return `${Math.floor(hours)} h ${Math.floor(minutes)} m`;
};
