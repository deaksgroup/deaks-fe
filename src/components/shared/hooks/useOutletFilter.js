import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getOutlets } from "../services/outletServices";

export const useOutletFilter = ({ searchParams }) => {
  const [selectedOutlet, setSelectedOutlet] = React.useState("");
  const [outlets, setOutlets] = React.useState("");

  const handleChange = (event) => {
    setSelectedOutlet(event.target.value);
  };

  const fetchOutlets = React.useCallback(async () => {
    try {
      const outlets = await getOutlets(searchParams);
      setOutlets(outlets.data);
    } catch (error) {
      console.log(error);
    }
  }, [searchParams]);

  React.useEffect(() => {
    fetchOutlets();
  }, [fetchOutlets]);

  const outletSelectList = React.useMemo(() => {
    return (
      <Box sx={{ minWidth: 220 }}>
        <FormControl fullWidth>
          <InputLabel size="small" id="outletselect">
            Select Outlet
          </InputLabel>
          <Select
            size="small"
            labelId="outletselect"
            id="demo-simple-select"
            value={selectedOutlet}
            label="Select Hotel"
            onChange={handleChange}
          >
            {outlets &&
              outlets?.map((item, index) => {
                return (
                  <MenuItem key={item._id} value={item._id}>
                    {item.outletName}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Box>
    );
  }, [outlets, selectedOutlet]);

  return {
    outletSelectList,
    selectedOutlet,
  };
};
