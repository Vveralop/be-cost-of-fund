import React, { useState } from "react";
import PropTypes from "prop-types";
// ITAU CUSTOM SELECT
// import { OneSelect, OneSelectItem } from "@itau-one/react";
// Material-ui
import { useMediaQuery } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SvgIcon from "@mui/material/SvgIcon";

const CustomArrowUpIcon = (props) => {
  return (
    <SvgIcon
      {...props}
      sx={{
        transform: "rotate(0deg)  translate(5px)",
        transition: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms ",
      }}
    >
      <path
        d="M8 1.83594L1.01562 8.82031C0.90625 8.94531 0.765625 9.00781 0.59375 9.00781C0.4375 9.00781 0.296875 8.94531 0.171875 8.82031C0.0625 8.71094 0.0078125 8.57812 0.0078125 8.42188C0.0078125 8.25 0.0625 8.10938 0.171875 8L7.29688 0.875C7.5 0.671875 7.73438 0.570312 8 0.570312C8.28125 0.570312 8.52344 0.671875 8.72656 0.875L15.8281 7.97656C15.9375 8.08594 15.9922 8.22656 15.9922 8.39844C16.0078 8.55469 15.9609 8.69531 15.8516 8.82031C15.7266 8.94531 15.5781 9.00781 15.4062 9.00781C15.25 9.00781 15.1094 8.94531 14.9844 8.82031L8 1.83594Z"
        fill="#56504C"
      />
    </SvgIcon>
  );
};

const CustomFormSelect = (props) => {
  const {
    openLabel = "seleccione",
    closeLabel = "seleccione",
    value,
    handleChange,
    options,
    optionValue,
    optionName,
    minWidth = 320,
    height = "48px",
  } = props;
  const [selectIsFocused, setSelectIsFocused] = useState(false);
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const matchesMd = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  // CUSTOM FORM SELECT FUNCTIONS

  const selectHandleFocus = () => {
    setSelectIsFocused(true);
  };

  const selectHandleBlur = () => {
    setSelectIsFocused(false);
  };

  const getSelectLabel = () => {
    if (selectIsFocused) {
      return openLabel;
    } else {
      return closeLabel;
    }
  };

  // console.log("options", options);

  return (
    <FormControl sx={{ minWidth: matchesMd ? 250 : matchesXs ? 160 : "100%" }}>
      <InputLabel id="demo-simple-select-helper-label">
        {getSelectLabel()}
      </InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value}
        label={getSelectLabel()}
        onChange={handleChange}
        onFocus={selectHandleFocus}
        onBlur={selectHandleBlur}
        IconComponent={CustomArrowUpIcon}
        sx={{
          height,
          // minWidth: minWidth ? minWidth : "100%",
        }}
        {...props}
      >
        {options.map((option, idx) => (
          <MenuItem
            key={idx}
            value={optionValue ? option[optionValue] : option}
          >
            {optionName ? option[optionName] : option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

CustomFormSelect.propTypes = {
  openLabel: PropTypes.string,
  closeLabel: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array.isRequired, // Array mapped should have {_value,_name}
  optionValue: PropTypes.string.isRequired,
  optionName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  minWidth: PropTypes.number,
  height: PropTypes.string.isRequired,
};

export default CustomFormSelect;
