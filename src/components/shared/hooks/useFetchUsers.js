import { useCallback, useEffect, useState } from "react";
import { getUsersList } from "../services/usersService";

export const useFetchUsers = () => {
  const [userList, setUserList] = useState([]);
  const fetchUserList = useCallback(async () => {
    try {
      const outlets = await getUsersList();
      setUserList(outlets?.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  return userList;
};
