import axios from "axios";

export const addNewColumnItem = (params) => {
  return axios.post("/addExtraColumn", params);
};

export const fetchExtraColumns = () => {
  return axios.get("/getAllInvoiceColumns");
};

export const deleteExtraColumns = (id) => {
  return axios.post("/deleteInvoiceColumns", { id });
};

export const updateExtraColumns = (params) => {
  return axios.patch("/updateInvoiceColumns", {
    params,
  });
};

export const saveNewOutlet = (params) => {
  return axios.post("/save/outlet", params);
};

export const getOutlets = (params) => {
  return axios.get("/outlets", { params });
};

export const getOutletById = (id) => {
  return axios.get("/outlet", {
    params: {
      id: id,
    },
  });
};
