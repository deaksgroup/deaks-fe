import { TextField } from "@mui/material";
import React, { useState } from "react";
import { debounceSearch } from "../services/services";

export const useSearch = (labelName) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchChangeHandler = debounceSearch((e) => {
    setSearchKeyword(e.target.value);
  }, 500);

  const SearchInput = (
    <TextField
      size="small"
      label={labelName}
      onChange={searchChangeHandler}
      InputLabelProps={{
        style: { fontSize: "14px" },
      }}
    />
  );

  return { SearchInput, searchKeyword };
};
