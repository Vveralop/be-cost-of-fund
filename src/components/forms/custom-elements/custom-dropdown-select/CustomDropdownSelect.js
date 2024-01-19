// Custom Dropdown Select
import React, { useState, useEffect } from "react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import arrowUpIcon from "../../../../assets/images/arrowUpIcon.svg";
import arrowDownIcon from "../../../../assets/images/arrowDownIcon.svg";
import "./CustomDropdownSelect.css";

const CustomDropdownSelect = ({
  customLabel,
  optionSelected,
  options,
  onSelect,
  small
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  useEffect(()=>{
    if(optionSelected == ""){
      setSelectedOption(null)
    }
  },[optionSelected])


  const handleOptionClick = (option) => {
    console.log(option);
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  let responsiveHeightSelect = matchDownXL ? "33px" : "43px"; 
  let responsiveIconSize = matchDownXL ? "24px" : "32px";

  return (
    <div className="custom-dropdown-select" >
      {isOpen && (
        <span className="select-label">
          {customLabel ? customLabel : "Seleccione una opción"}
        </span>
      )}
      <div
        className={`select-header ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        style={{height: small ? responsiveHeightSelect : "auto"}}
      >
        {selectedOption ? (
          <div>{selectedOption.label}</div>
        ) : (
          <div>{customLabel ? customLabel : "Seleccione una opción"}</div>
        )}
        {isOpen ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <img src={arrowUpIcon} alt="up-arrow" 
            // className="arrow-icon"
            style={{
              width:responsiveIconSize,
              height:responsiveIconSize
            }}
             />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <img src={arrowDownIcon} alt="down-arrow"
            //  className="arrow-icon"
            style={{
              width:responsiveIconSize,
              height:responsiveIconSize
            }}
            />
          </div>
        )}
      </div>
      {isOpen && (
        <ul className="options">
          {options.map((option,idx) => (
            <li key={idx} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdownSelect;
