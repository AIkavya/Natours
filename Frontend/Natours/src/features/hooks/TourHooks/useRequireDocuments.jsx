import { useQuery } from "@tanstack/react-query";
import { getRequireDocuments } from "../../../Services/tourService/tourService";

export const useRequireDocuments = function (destination)
{
    const { data, isPending, isError } = useQuery({
      queryKey: ["documents", destination],
      queryFn: () => getRequireDocuments(destination),
      enabled: !!destination,
    });    

    return {data,isPending,isError}

}