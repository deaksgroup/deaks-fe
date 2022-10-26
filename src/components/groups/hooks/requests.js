import axios from "axios";

// API Requests
export const fetchDaily = async (fetchPayload) => {
  console.log(fetchPayload);
  const { data } = await axios.post(`/getUsersOfDay`, fetchPayload);
  return data;
};
