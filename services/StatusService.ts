import { apiClient } from "@/lib/api";
import { Status } from "@/types/Types";

const StatusService = {
  getStatus: () => apiClient<Status>("/status"),
};

export default StatusService;
