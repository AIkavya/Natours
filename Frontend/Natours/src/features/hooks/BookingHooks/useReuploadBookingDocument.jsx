import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reuploadBookingDocument } from "../../../Services/bookingService/bookingService";
import toast from "react-hot-toast";

export default function useReuploadBookingDocument() {
  const queryClient = useQueryClient();

  const { mutate: reuploadDocument, isPending } = useMutation({
    mutationFn: reuploadBookingDocument,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["my-booking-details"],
      });
      toast.success("Document uploaded successfully.");
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to upload document.");
    },
  });

  return {
    reuploadDocument,
    isPending,
  };
}
