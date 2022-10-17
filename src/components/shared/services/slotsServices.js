import axios from "axios";

export const fetchExistingSlots = (params) => {
  return axios.get(
    `/getAllSlots/${params?.outlet}/${params.hotel}/${params.date}`
  );
};

export const addNewSlots = (params) => {
  return axios.post("/addSlots", params);
};
