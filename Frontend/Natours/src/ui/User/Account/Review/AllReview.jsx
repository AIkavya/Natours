import { Link } from "react-router-dom";
import { LuArrowLeft, LuCalendar, LuStar, LuBadgeCheck } from "react-icons/lu";
import { useAllReviews } from "../../../../features/hooks/reviewHooks/useAllReview";

import {
  AlertBox,
  BackButton,
  Badge,
  BookingChip,
  BottomContent,
  CardContent,
  CoverImage,
  CoverOverlay,
  CoverWrapper,
  CreatedAt,
  Divider,
  EmptyStateWrapper,
  FloatingRating,
  Footer,
  FooterLeft,
  FooterRight,
  MetaItem,
  MetaRow,
  ReviewCard,
  ReviewSummary,
  ReviewsGrid,
  ReviewTourTitle,
  SubRatingItem,
  SubRatingsGrid,
  TourInfo,
} from "./all.styles";
import FullSpinner from "../../../FullSpinner";
import { Container , Header , Subtitle , Title , EmptyState } from "../BookedTours/MyBooking.styles";

export default function AllReviews() {
  const { reviews = [], isLoading, isError, error } = useAllReviews();

  if (isLoading) {
    return (
      <BottomContent>
        <FullSpinner />
      </BottomContent>
    );
  }

  if (isError) {
    return (
      <BottomContent>
        <AlertBox $type="error">
          {error?.message || "Failed to load reviews."}
        </AlertBox>
      </BottomContent>
    );
  }

  

  return (
    <BottomContent>
      <Container>
        <Header>
          <Title>All Reviews</Title>
          <Subtitle>Manage and track all your reviews</Subtitle>
        </Header>
        <Link
          to="/user/reviews"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          <BackButton>
            <LuArrowLeft />
            Back to Reviews
          </BackButton>
        </Link>

        {
           reviews.length === 0 ? ( <EmptyState>
            <h2>No Reviews Found</h2>
            <p>Looks like you haven't left any reviews yet.</p>
          </EmptyState>) : (
               <ReviewsGrid>
          {reviews.map((review) => {
            const sub = review.subRatings || {};

            return (
              <ReviewCard key={review._id}>
                <CoverWrapper>
                  <CoverImage
                    src={review.tour?.imageCover?.secureUrl}
                    alt={review.tour?.name}
                  />

                  <CoverOverlay />

                  <FloatingRating>
                    <LuStar />
                    {review.rating}/5
                  </FloatingRating>

                  <TourInfo>
                    <ReviewTourTitle>{review.tour?.name}</ReviewTourTitle>

                    <ReviewSummary>{review.tour?.summary}</ReviewSummary>
                  </TourInfo>
                </CoverWrapper>

                <CardContent>
                  <MetaRow>
                    <MetaItem>
                      <LuCalendar />
                      {review.booking?.travelDate
                        ? new Date(
                            review.booking.travelDate,
                          ).toLocaleDateString()
                        : "N/A"}
                    </MetaItem>

                    <MetaItem>
                      Booking #{review.booking?.bookingNumber}
                    </MetaItem>
                  </MetaRow>

                  <Divider />
                  <SubRatingsGrid>
                    {[
                      ["Guide", sub.guide],
                      ["Hotel", sub.hotel],
                      ["Transport", sub.transport],
                      ["Value", sub.valueForMoney],
                      ["Itinerary", sub.itinerary],
                    ].map(([label, value]) => (
                      <SubRatingItem key={label}>
                        <span>{label}</span>

                        <strong>{value}/5</strong>
                      </SubRatingItem>
                    ))}
                  </SubRatingsGrid>

                  <Footer>
                    <FooterLeft>
                      {review.verified && (
                        <Badge type="verified">
                          <LuBadgeCheck />
                          Verified
                        </Badge>
                      )}

                      <Badge type={review.isApproved ? "approved" : "pending"}>
                        {review.isApproved ? "Approved" : "Pending"}
                      </Badge>
                    </FooterLeft>

                    <FooterRight>
                      <BookingChip>
                        #{review.booking?.bookingNumber}
                      </BookingChip>

                      <CreatedAt>
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </CreatedAt>
                    </FooterRight>
                  </Footer>
                </CardContent>
              </ReviewCard>
            );
          })}
            </ReviewsGrid>
          )
        }
      </Container>
    </BottomContent>
  );
}
