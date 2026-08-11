import apiClient from "../apiClient";

export async function createBookingQuery(data) {
  const response = await apiClient.post("/user/bookingQuery", data);

  return response.data;
}

export async function getMyBookingQueries() {
  const response = await apiClient.get("/user/getAllMyBookingQuery");

  return response.data.data.queries;
}

export async function getMyBookingQuery(id) {
  const response = await apiClient.get(`/user/getDetailedBookingQuery/${id}`);

  return response.data.data.query;
}
