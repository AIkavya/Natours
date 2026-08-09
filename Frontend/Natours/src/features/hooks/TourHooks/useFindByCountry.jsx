import { useQuery } from "@tanstack/react-query";
import { getUniqueCountries } from "../../../Services/tourService/tourService";
export const useFindByCountry = () => {
  return useQuery({
    queryKey: ["unique-countries"],
    queryFn: getUniqueCountries,
  });
};
