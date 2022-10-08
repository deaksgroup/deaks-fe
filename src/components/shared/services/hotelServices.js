import axios from "axios";

export const addHotel = (values) => {
  return axios.post("/addHotel", values);
};

export const getHotels = (params) => {
  return axios.get("/getHotels", {
    params,
  });
};

export const deleteHotelApi = (hotelId) => {
  return axios.post("/deleteHotel", { hotelId });
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
