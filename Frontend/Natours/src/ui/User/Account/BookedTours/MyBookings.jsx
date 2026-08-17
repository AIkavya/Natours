import BookingCard from "./BookingCard";
import useAllMyBookings from "../../../../features/hooks/BookingHooks/useAllMyBookings";

import {
  Container,
  Header,
  Title,
  Subtitle,
  Grid,
  EmptyState,

} from "./MyBooking.styles";
import FullSpinner from "../../../FullSpinner";

function MyBookings() {
  const { bookings, isLoading, isError, error } = useAllMyBookings();

  if (isLoading) {
    return (
      <Container>
         <FullSpinner />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <EmptyState>
          <h2>Something went wrong</h2>
          <p>{error.message}</p>
        </EmptyState>
      </Container>
    );
  }

  if (!bookings.length) {
    return (
      <Container>
        <Header>
          <Title>My Bookings</Title>
          <Subtitle>Manage all your upcoming and previous trips.</Subtitle>
        </Header>

        <EmptyState>
          <h2>No Bookings Found</h2>
          <p>Looks like you haven't booked any tours yet.</p>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>My Bookings</Title>

        <Subtitle>
          {bookings.length} Booking{bookings.length > 1 ? "s" : ""}
        </Subtitle>
      </Header>

      <Grid>
        {bookings.map((booking) => {
           return booking.bookingStatus === "cancelled" ? '' : (
            <BookingCard key={booking._id} booking={booking} />
           );
        })}
      </Grid>
    </Container>
  );
}

export default MyBookings;
