import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSlot = async (slotId) => {
  const { data } = await axios.get(`/getSlot/${slotId}`);
  return data;
};

export const useSlotsQuery = (slotId) =>
  useQuery(["monster"], () => fetchSlot(slotId), {
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
