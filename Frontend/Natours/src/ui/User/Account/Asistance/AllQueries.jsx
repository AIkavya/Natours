import BookingCardQuery from "./BookingCardQuery";
import useMyBookingQueries from "../../../../features/hooks/AsistanceHooks/useMyBookingQueries";
import FullSpinner from "../../../FullSpinner";
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
      {queries.map((query) => (
        <BookingCardQuery key={query._id} query={query} />
      ))}
    </div>
  );
}

export default AllQueries;
