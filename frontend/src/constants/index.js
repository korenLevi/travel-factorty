export const STATUS_OPTIONS = ["All", "Pending", "Approved", "Rejected"];

export const TABLE_HEADERS = {
  requester: ["id", "user", "startDate", "endDate", "reason", "status"],
  validator: ["id", "user", "startDate", "endDate", "reason", "status"],
};

export const STATUS_COLORS = {
  Pending: "orange",
  Approved: "green",
  Rejected: "red",
};