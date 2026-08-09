import axios from "axios";

export async function createMyBooking({ slug, formData }) {
  const { data } = await axios.post(
    `http://localhost:3001/api/v1/booking/create-my-booking/${slug}`,
    formData,
    {
      withCredentials: true,
    },
  );

  return data;
}

export async function getMyAllBookings() {
  const { data } = await axios.get(
    "http://localhost:3001/api/v1/booking/my-bookings",
    {
      withCredentials: true,
    },
  );

  return data.data.bookings;
}

export async function getMyBookingDetails(bookingNumber) {
  const { data } = await axios.get(
    `http://localhost:3001/api/v1/booking/detail-booking/${bookingNumber}`,
    {
      withCredentials: true,
    }
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

  const { data } = await axios.patch(
    `http://localhost:3001/api/v1/booking/reupload-document`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data.data;
};
