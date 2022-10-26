import { useQuery } from "@tanstack/react-query";
import { fetchDaily } from "./requests";

export const useFetchDailyData = (fetchPayload) =>
  useQuery(["daily"], () => fetchDaily(fetchPayload), {
    refetchOnWindowFocus: true,
  });
