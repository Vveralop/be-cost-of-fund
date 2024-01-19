// Material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";

// assets
import { SearchOutlined } from "@ant-design/icons";

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => (
  <Box sx={{ width: "100%", ml: { xs: 0, md: 1 } }}>
    <FormControl sx={{ width: { xs: "100%", md: 224 }, display: "none" }}>
      <OutlinedInput
        size="small"
        id="header-search"
        sx={{
          "& input": {
            backgroundColor: "#FFFFFF",
          },
          "& .MuiInputAdornment-root": {
            backgroundColor: "#FFFFFF",
          },
        }}
        startAdornment={
          <InputAdornment
            position="start"
            sx={{
              bgcolor: "#FFFFFF",
              mr: -0.5,
            }}
          >
            <SearchOutlined />
          </InputAdornment>
        }
        aria-describedby="header-search-text"
        inputProps={{
          "aria-label": "weight",
        }}
        placeholder="Buscar..."
      />
    </FormControl>
  </Box>
);

export default Search;
