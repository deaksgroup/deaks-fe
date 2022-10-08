import { useCallback, useEffect, useState } from "react";
import { getHotels } from "../services/hotelServices";

export const useFetchHotels = () => {
  const [hotelList, setHotelList] = useState([]);
  const fetchHotelList = useCallback(async () => {
    try {
      const hotels = await getHotels();
      setHotelList(hotels?.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchHotelList();
  }, [fetchHotelList]);

  return hotelList;
};
