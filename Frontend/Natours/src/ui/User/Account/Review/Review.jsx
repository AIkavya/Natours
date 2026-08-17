import { useState } from "react";
import { useForm } from "react-hook-form";
import useAllMyBookings from "../../../../features/hooks/BookingHooks/useAllMyBookings";
import { useReview } from "../../../../features/hooks/reviewHooks/useReview";
import FullSpinner from "../../../FullSpinner";

import styled, { css } from "styled-components";

const AlertBox = styled.div`
  padding: 1.4rem 1.8rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  font-size: 1.4rem;
  line-height: 1.5;

  ${({ $type }) => {
    switch ($type) {
      case "success":
        return css`
          color: black;
          background: transparent;
          border: 1px solid rgba(0, 0, 0, 0.94);
        `;

      case "error":
        return css`
          color: #ffffff;
          background: red;
          border: 3px solid rgba(255, 255, 255, 0.93);
        `;

      default:
        return css`
          background: rgba(59, 130, 246, 0.12);
          color: #93c5fd;
          border: 1px solid rgba(59, 130, 246, 0.3);
        `;
    }
  }}
`;

const Label = styled.label`
  display: block;
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const ErrorMessage = styled.span`
  color: #fb1c1c;
  font-size: 1.25rem;
  margin-top: 0.5rem;
  display: block;
  font-weight: 500;
`;

const ComparisonCard = styled.div`
  width: 100%;
  padding: 2rem;
  border-radius: 1.6rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const CardHeader = styled.div`
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${({ $black }) => ($black ? "#111" : "#fff")};
  font-size: 2rem;
  font-weight: 700;
`;

const CardSubtitle = styled.p`
  margin: 0;
  color: ${({ $black }) =>
    $black ? "rgba(17,17,17,.7)" : "rgba(255,255,255,.75)"};
  line-height: 1.7;
  font-size: 1.45rem;
`;

const RatingStarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
  }
`;

const StarSpan = styled.span`
  display: inline-block;
  font-size: ${({ $size }) => $size || "1rem"};
  color: ${({ $active }) => ($active ? "#ffffff" : "#03102430")};
  transition: 0.2s;
  user-select: none;

  &:hover {
    transform: scale(1.15);
  }
`;

const StatusBadge = styled.span`
  margin-left: 1rem;
  padding: 0.55rem 1.2rem;
  border-radius: 999px;
  font-size: 1.25rem;
  font-weight: 600;

  ${({ $type }) => {
    switch ($type) {
      case "success":
        return css`
         border: 3px solid rgba(255, 255, 255, 0.93);
          color: #ffffff;
        `;

      case "warning":
        return css`
          background: rgba(251, 191, 36, 0.15);
          color: #facc15;
        `;

      default:
        return css`
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        `;
    }
  }}
`;

import {
  ConsultationCard,
  ConsultationContent,
  ConsultationHeading,
  ConsultationDescription,
  Form,
  InputGroup,
  Input,
  Select,
  TextArea,
  SubmitButton,
} from "../../../Trust/Trust.styles";

import { Link } from "react-router-dom";

export default function Review({ onReviewSuccess }) {
  const { bookings, isLoading, isError, error } = useAllMyBookings();
  const { addReview, isLoading: addReviewLoading } = useReview();

  const [hoverRating, setHoverRating] = useState(0);
  const [formAlert, setFormAlert] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bookingId: "",
      rating: 5,
      title: "",
      subRatings: {
        guide: 5,
        hotel: 5,
        transport: 5,
        valueForMoney: 5,
        itinerary: 5,
      },
      review: "",
    },
  });

  const rating = watch("rating") || 5;

  // Filter completed & fullPaid tours eligible for review
  const eligibleBookings = bookings.filter((b) => {
    const isCompleted =
      b.bookingStatus === "complete" || b.bookingStatus === "completed";
    const isFullPaid =
      b.paymentStatus === "fullPaid" ||
      b.payment?.status === "fullPaid" ||
      b.paymentStatus === "paid" ||
      (b.totalAmount && b.amountPaid && b.amountPaid >= b.totalAmount);
    return isCompleted && isFullPaid;
  });

  const onSubmit = async (data) => {
    setFormAlert(null);

    const bookingObj = eligibleBookings.find((b) => b._id === data.bookingId);
    const tourId = bookingObj?.tour?._id || bookingObj?.tour;

    const payload = {
      bookingId: data.bookingId,
      tourId,
      rating: Number(data.rating),
      subRatings: {
        guide: Number(data.subRatings?.guide || 5),
        hotel: Number(data.subRatings?.hotel || 5),
        transport: Number(data.subRatings?.transport || 5),
        valueForMoney: Number(data.subRatings?.valueForMoney || 5),
        itinerary: Number(data.subRatings?.itinerary || 5),
      },
      title: data.title,
      review: data.review,
    };

    try {
      await addReview(payload);

      setFormAlert({
        type: "success",
        message:
          "Thank you! Your verified tour review has been submitted successfully.",
      });

      reset({
        bookingId: "",
        rating: 5,
        title: "",
        subRatings: {
          guide: 5,
          hotel: 5,
          transport: 5,
          valueForMoney: 5,
          itinerary: 5,
        },
        review: "",
      });
      setHoverRating(0);

      onReviewSuccess?.();
    } catch (err) {
      setFormAlert({
        type: "error",
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to submit review. Please try again.",
      });
    }
  };

  return (
    <ConsultationCard style={{ width: "100%" }}>
      <p>
        <Link to="/user/all-review" style={{ color: "#ffffff" }}>
          View All Reviews
        </Link>
      </p>
      <ConsultationContent>
        <ConsultationHeading>
          Leave Your Verified Tour Experience
        </ConsultationHeading>
        <ConsultationDescription>
          Reviews are strictly enabled for verified bookings with{" "}
          <strong>Completed Trip</strong> status and <strong>Full Paid</strong>{" "}
          payment verification.
        </ConsultationDescription>

        {isLoading && <FullSpinner />}

        {isError && (
          <AlertBox $type="error">
            Unable to fetch bookings:{" "}
            {error?.message || "Server connection issue."}
          </AlertBox>
        )}

        {formAlert && (
          <AlertBox $type={formAlert.type}>{formAlert.message}</AlertBox>
        )}

        {!isLoading && eligibleBookings.length === 0 ? (
          <ComparisonCard $primary={false}>
            <CardHeader>
              <CardTitle $black={false}>
                No Completed & Full Paid Tours Found
              </CardTitle>
            </CardHeader>
            <CardSubtitle $black={false}>
              Review submission requires a booking with{" "}
              <strong>bookingStatus: 'complete'</strong> and{" "}
              <strong>paymentStatus: 'fullPaid'</strong>. You currently have no
              completed expeditions matching these criteria.
            </CardSubtitle>
          </ComparisonCard>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup>
              <div>
                <Label htmlFor="bookingSelect">
                  Select Completed & Full Paid Tour *
                </Label>
                <Select
                  id="bookingSelect"
                  {...register("bookingId", {
                    required:
                      "Please select an eligible completed tour to review.",
                  })}
                >
                  <option value="">-- Choose Eligible Tour Booking --</option>
                  {eligibleBookings.map((b) => {
                    const tourName =
                      b.tour?.name ||
                      b.packageName ||
                      `Booking #${b.bookingNumber}`;
                    return (
                      <option key={b._id} value={b._id}>
                        {tourName} (Booking: {b.bookingNumber}) - Verified
                        Complete
                      </option>
                    );
                  })}
                </Select>
                {errors.bookingId && (
                  <ErrorMessage>{errors.bookingId.message}</ErrorMessage>
                )}
              </div>

              <div>
                <Label>Overall Tour Rating (1 to 5 Stars) *</Label>
                <RatingStarGroup>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setValue("rating", star, { shouldValidate: true })
                      }
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`Rate ${star} star`}
                    >
                      <StarSpan
                        $active={star <= (hoverRating || rating)}
                        $size="2.6rem"
                      >
                        ★
                      </StarSpan>
                    </button>
                  ))}
                  <StatusBadge $type="success">{rating} / 5 Stars</StatusBadge>
                </RatingStarGroup>
                {errors.rating && (
                  <ErrorMessage>{errors.rating.message}</ErrorMessage>
                )}
              </div>
            </InputGroup>

            <InputGroup>
              <div>
                <Label htmlFor="reviewTitle">Review Title *</Label>
                <Input
                  id="reviewTitle"
                  type="text"
                  placeholder="e.g. Unforgettable Alpine Treks & Professional Guide"
                  maxLength={120}
                  {...register("title", {
                    required: "Please enter a title for your review.",
                    minLength: {
                      value: 3,
                      message: "Title must be at least 3 characters long.",
                    },
                  })}
                />
                {errors.title && (
                  <ErrorMessage>{errors.title.message}</ErrorMessage>
                )}
              </div>

              <div>
                <InputGroup>
                  <div>
                    <Label htmlFor="subRatingGuide">Guide Rating</Label>
                    <Select
                      id="subRatingGuide"
                      {...register("subRatings.guide")}
                    >
                      <option value={5}>Guide: 5 Stars</option>
                      <option value={4}>Guide: 4 Stars</option>
                      <option value={3}>Guide: 3 Stars</option>
                      <option value={2}>Guide: 2 Stars</option>
                      <option value={1}>Guide: 1 Star</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subRatingHotel">Hotel Rating</Label>
                    <Select
                      id="subRatingHotel"
                      {...register("subRatings.hotel")}
                    >
                      <option value={5}>Hotel: 5 Stars</option>
                      <option value={4}>Hotel: 4 Stars</option>
                      <option value={3}>Hotel: 3 Stars</option>
                      <option value={2}>Hotel: 2 Stars</option>
                      <option value={1}>Hotel: 1 Star</option>
                    </Select>
                  </div>
                </InputGroup>
              </div>
            </InputGroup>

            <div>
              <Label htmlFor="reviewBody">Detailed Review *</Label>
              <TextArea
                id="reviewBody"
                placeholder="Share details of your tour experience, accommodation comfort, itinerary pace, and guide assistance..."
                {...register("review", {
                  required: "Please enter your review feedback.",
                  minLength: {
                    value: 10,
                    message:
                      "Review feedback must be at least 10 characters long.",
                  },
                })}
              />
              {errors.review && (
                <ErrorMessage>{errors.review.message}</ErrorMessage>
              )}
            </div>

            <SubmitButton type="submit" disabled={addReviewLoading}>
              {addReviewLoading
                ? "Submitting Review..."
                : "Submit Verified Review"}
            </SubmitButton>
          </Form>
        )}
      </ConsultationContent>
    </ConsultationCard>
  );
}
