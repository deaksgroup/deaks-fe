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

export const fetchFilteredPublic = (params) => {
  return axios.post("/get/publicFilter", params);
};

export const fetchFilteredPrivet = (params) => {
  return axios.post("/get/privetFilter", params);
};

export const getGroupById = (id) => {
  return axios.get("/get/userGroupById", { params: id });
};

export const updateGroup = (params) => {
  return axios.patch("/updateGroup", { params });
};

export const deleteGroup = (params) => {
  return axios.patch("/deleteGroup", { params });
};
