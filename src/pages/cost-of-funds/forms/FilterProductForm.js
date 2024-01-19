import React, { useState, useContext } from "react";
import { CostfundContext } from "../../../contexts/costfund.context";
import { Box, Button, Typography } from "@mui/material";
import CustomDropdownSelect from "../../../components/forms/custom-elements/custom-dropdown-select/CustomDropdownSelect";

const FilterProductForm = (props) => {
  const { handleClose } = props;
  const { setFilterRate, setFilterCurrency } = useContext(CostfundContext);
  const [selectedBox, setSelectedBox] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const selectOptions = [
    { value: "CLF", label: "UF" },
    { value: "CLP", label: "CLP" },
    { value: "USD", label: "USD" },
  ];

  const handleBoxClick = (value) => {
    setSelectedBox(value);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
    console.log("selectedBox", selectedBox);
    console.log("selectedOption", selectedOption.value);

    setFilterRate(selectedBox);
    setFilterCurrency(selectedOption.value ? selectedOption.value : "");
    handleClose(e);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        p: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div>
          <Typography variant="normalBold14" color="#56504C">
            Tasa
          </Typography>
        </div>
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: "8px",
            }}
          >
            {/* Custom buttoms */}
            <div
              style={{
                display: "flex",
                padding: "10px",
                height: "40px",
                justifyContent: "center",
                alignItems: "center",
                flex: "1 0 0",
                border: "1px solid #D9D3CF",
                borderRadius: "4px",
                cursor: "pointer",
                ...(selectedBox == "" && {
                  backgroundColor: "#003399",
                }),
              }}
              onClick={() => handleBoxClick("")}
            >
              <Typography
                variant="normal14"
                color={selectedBox == "" ? "#FFFFFF" : "#56504C"}
              >
                Todas
              </Typography>
            </div>
            &nbsp;
            {/* Custom buttoms */}
            <div
              style={{
                display: "flex",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                flex: "1 0 0",
                border: "1px solid #D9D3CF",
                borderRadius: "4px",
                cursor: "pointer",
                ...(selectedBox == "Fixed" && {
                  backgroundColor: "#003399",
                }),
              }}
              onClick={() => handleBoxClick("Fixed")}
            >
              <Typography
                variant="normal14"
                color={selectedBox == "Fixed" ? "#FFFFFF" : "#56504C"}
              >
                Fija
              </Typography>
            </div>
            &nbsp;
            {/* Custom buttoms */}
            <div
              style={{
                display: "flex",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                flex: "1 0 0",
                border: "1px solid #D9D3CF",
                borderRadius: "4px",
                cursor: "pointer",
                ...(selectedBox == "Floating" && {
                  backgroundColor: "#003399",
                }),
              }}
              onClick={() => handleBoxClick("Floating")}
            >
              <Typography
                variant="normal14"
                color={selectedBox == "Floating" ? "#FFFFFF" : "#56504C"}
              >
                Flotante
              </Typography>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "16px",
            paddingTop: "8px",
          }}
        >
          {/* CustomDropdownSelect */}
          <CustomDropdownSelect
            customLabel={"Moneda"}
            options={selectOptions}
            onSelect={handleSelect}
          />
        </div>
      </div>
      <div>
        <Box
          display="flex"
          sx={{
            mt: 2,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              mr: 1,
              width: "100%",
            }}
            onClick={handleClose}
          >
            <Typography variant="textButton" color="#EC7000">
              Cancelar
            </Typography>
          </Button>
        </Box>

        <Box
          display="flex"
          sx={{
            mt: 2,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              mr: 1,
              width: "100%",
              backgroundColor: "#003767",
            }}
            onClick={handleSubmit}
          >
            <Typography variant="textButton">Aplicar</Typography>
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default FilterProductForm;
