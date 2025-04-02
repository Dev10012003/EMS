export const getToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

export const API_BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000/api" : "/api";

export const MEDIA_BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

export const holidayData = [
  { label: "New Year", date: "01-01-2025" },
  { label: "Republic Day", date: "26-01-2025" },
  { label: "Holi", date: "14-03-2025" },
  { label: "Good Friday", date: "18-04-2025" },
  { label: "Independence Day", date: "15-08-2025" },
  { label: "Diwali", date: "21-10-2025" },
  { label: "Christmas", date: "25-12-2025" },
];
