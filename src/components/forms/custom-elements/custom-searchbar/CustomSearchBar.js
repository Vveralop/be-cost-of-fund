import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const CustomSearchBar = ({value, handleChange}) => {

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 367 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Busca una cotización"
        inputProps={{ "aria-label": "Busca una cotización"}}
        value={value}
        onChange={handleChange}
      
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default CustomSearchBar;
