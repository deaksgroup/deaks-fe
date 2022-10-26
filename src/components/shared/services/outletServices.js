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

const config = {
  headers: { "content-type": "multipart/form-data" },
};
export const saveNewOutlet = (formData) => {
  return axios.post("/save/outlet", formData, config);
};

export const updateOutlet = (formData) => {
  return axios.patch("/updateOutlet", formData, config);
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
export const deleteOutletById = (id) => {
  return axios.patch("/deleteOutlet", { id });
};
