import { useCallback, useEffect, useState } from "react";
import { getOutlets } from "../services/outletServices";

export const useFetchOutlets = () => {
  const [outletList, setOutletList] = useState([]);
  const fetchOutletList = useCallback(async () => {
    try {
      const outlets = await getOutlets();
      setOutletList(outlets?.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchOutletList();
  }, [fetchOutletList]);

  return outletList;
};
