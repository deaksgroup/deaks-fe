import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getHotels } from "../services/hotelServices";

export const useHotelFilter = () => {
  const [selectedHotel, setSelectedHotel] = React.useState("");
  const [hotels, setHotels] = React.useState("");

  const handleChange = (event) => {
    setSelectedHotel(event.target.value);
  };

  const fetchHotels = React.useCallback(async () => {
    try {
      const hotels = await getHotels();
      setHotels(hotels.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const HotelSelectList = React.useMemo(() => {
    return (
      <Box sx={{ minWidth: 220 }}>
        <FormControl fullWidth>
          <InputLabel size="small" id="hotelSelect">
            Select Hotel
          </InputLabel>
          <Select
            size="small"
            labelId="hotelSelect"
            id="demo-simple-select"
            value={selectedHotel}
            label="Select Hotel"
            onChange={handleChange}
          >
            {hotels &&
              hotels?.map((item, index) => {
                return (
                  <MenuItem key={item._id} value={item._id}>
                    {item.hotelName}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Box>
    );
  }, [hotels, selectedHotel]);

  return {
    HotelSelectList,
    selectedHotel,
  };
};
