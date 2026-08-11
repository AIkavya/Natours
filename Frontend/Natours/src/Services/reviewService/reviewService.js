import apiClient from "../apiClient";

export const createReview = async (reviewPayload) => {
  const res = await apiClient.post("/user/createReview", reviewPayload);
  return res.data?.data?.review || res.data;
};

export const getTourReviews = async () => {
  const res = await apiClient.get("/user/getAllReviews");

  return Array.isArray(res.data?.data?.reviews)
    ? res.data.data.reviews
    : res.data?.reviews || [];
};
