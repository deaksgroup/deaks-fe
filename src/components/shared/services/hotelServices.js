import axios from "axios";

const config = {
  headers: { "content-type": "multipart/form-data" },
};
export const addHotel = (formData) => {
  return axios.post("/addHotel", formData, config);
};

export const getHotels = (params) => {
  return axios.get("/getHotels", {
    params,
  });
};

export const deleteHotelApi = (hotelId) => {
  return axios.patch("/deleteHotel", { hotelId });
};

export const getHotelInfo = (id) => {
  return axios.get("/getHotelInfo", {
    params: {
      hotelId: id,
    },
  });
};

export const getUpdateHotelInfo = (params) => {
  return axios.patch("/updateHotel", {
    params,
  });
};
