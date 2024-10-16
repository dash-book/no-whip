import { TrackingRecord } from "../../types/Tracking";

export interface getTrackingColumnsProps {
  handleEdit: (tracking: TrackingRecord) => void;
  handleDelete: (id: string) => void;
}
