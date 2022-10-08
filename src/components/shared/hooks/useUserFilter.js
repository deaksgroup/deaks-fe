import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFetchUsers } from "./useFetchUsers";

export const useHotelFilter = () => {
  const users = useFetchUsers();
  const [selectedUsers, setSelectedUsers] = React.useState("");

  const handleChange = (event) => {
    setSelectedUsers(event.target.value);
  };

  const UserSelectList = React.useMemo(() => {
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
            value={selectedUsers}
            label="Select Hotel"
            onChange={handleChange}
          >
            {users &&
              users?.map((item, index) => {
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
  }, [users, selectedUsers]);

  return {
    UserSelectList,
    selectedUsers,
  };
};
