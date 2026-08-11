import apiClient from "../apiClient";

export async function createMyBooking({ slug, formData }) {
  const { data } = await apiClient.post(
    `/booking/create-my-booking/${slug}`,
    formData,
  );

  return data;
}

export async function getMyAllBookings() {
  const { data } = await apiClient.get("/booking/my-bookings");

  return data.data.bookings;
}

export async function getMyBookingDetails(bookingNumber) {
  const { data } = await apiClient.get(
    `/booking/detail-booking/${bookingNumber}`,
  );

  return data.data.booking;
}

export const reuploadBookingDocument = async ({
  bookingId,
  travelerIndex,
  docType,
  rejectDocId,
  file,
}) => {
  const formData = new FormData();

  formData.append("bookingId", bookingId);
  formData.append("travelerIndex", travelerIndex);
  formData.append("docType", docType);
  formData.append("rejectDocId", rejectDocId);
  formData.append("file", file);

  const { data } = await apiClient.patch(
    "/booking/reupload-document",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data.data;
};
