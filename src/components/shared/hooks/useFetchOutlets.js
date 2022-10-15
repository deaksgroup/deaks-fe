import { useCallback, useEffect, useState } from "react";
import { getOutlets } from "../services/outletServices";

export const useFetchOutlets = (props) => {
  console.log(props);
  const [outletList, setOutletList] = useState([]);
  const searchParams = {
    hotel: props,
  };
  const fetchOutletList = useCallback(async () => {
    try {
      const outlets = await getOutlets(searchParams);
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
