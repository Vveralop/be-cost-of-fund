import React from "react";
import { FormControl, OutlinedInput, InputAdornment } from "@mui/material";

// assets
import { SearchOutlined } from "@ant-design/icons";

const SearchField = () => {
  return (
    <FormControl variant="outlined">
      <OutlinedInput
        sx={{
          bgcolor: "white",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "& .MuiInputAdornment-root": {
            backgroundColor: "white",
          },
        }}
        startAdornment={
          <InputAdornment position="start" sx={{ bdcolor: "white" }}>
            <SearchOutlined />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default SearchField;
