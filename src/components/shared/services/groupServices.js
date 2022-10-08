import axios from "axios";

export const addGroup = (params) => {
  return axios.post("/addGroups", {
    params,
  });
};

export const fetchGroups = (params) => {
  return axios.get("/get/allUserGroups", {
    params,
  });
};
