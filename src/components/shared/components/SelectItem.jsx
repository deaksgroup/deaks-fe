import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useState } from "react";

export const SelectItem = (props) => {
  const [selectedItem, setSelectedItem] = useState("");
  const { options = [], key, setFunction, label } = props;
  const onchangeHandler = (e) => {
    setFunction(e.target.value);
    setSelectedItem(e.target.value);
  };
  return (
    <Box>
      <FormControl>
        <InputLabel sx={{ fontSize: "14px" }} id="accountStatus" size="small">
          {label}{" "}
        </InputLabel>
        <Select
          sx={{ minWidth: 170 }}
          size="small"
          labelId={key}
          id="demo-simple-select-helper"
          value={selectedItem}
          label={label}
          onChange={onchangeHandler}
        >
          {options.map((item) => {
            return (
              <MenuItem dense value={item.value}>
                {item.item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
