import axios from "axios";

export const fetchExistingSlots = (params) => {
  return axios.post("/fetchExistingSlots", params);
};

export const addNewSlots = (params) => {
  return axios.post("/add/slots", params);
};
