import BookingCardQuery from "./BookingCardQuery";
import useMyBookingQueries from "../../../../features/hooks/AsistanceHooks/useMyBookingQueries";
import FullSpinner from "../../../FullSpinner";

import {
Container,
Header,
Title,
Subtitle,
Grid,
EmptyState,

} from '../BookedTours/MyBooking.styles'

function AllQueries()
{
const {queries,isPending,isError,error} = useMyBookingQueries();

if(isPending){
    return <div><FullSpinner /></div>
}
if(isError){
    return <div>Error: {error.message}</div>
  }

 

  return (
    <div
      style={{
        width: "min(120rem,90%)",
        margin: "5rem auto",
        display: "grid",
        gap: "2rem",
      }}
    >
      <Container>
        <Header>
          <Title>My Queries</Title>
          <Subtitle>Manage all your Queries</Subtitle>
        </Header>
        {
          queries.length > 0 ? (
             queries.map((query) => (
        <BookingCardQuery key={query._id} query={query} />
      ))
          ) : (
             
          <EmptyState>
          <h2>No Queries Found</h2>
          <p>Looks like you haven't raised any Queries yet.</p>
        </EmptyState>
           )
        }
      </Container>
      
    </div>
  );
}

export default AllQueries;
