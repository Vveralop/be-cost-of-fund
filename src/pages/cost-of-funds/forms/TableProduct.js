import React, { useState, useEffect, useContext } from "react";
import {
  useMsal,
} from "@azure/msal-react";
import { CostfundContext } from "../../../contexts/costfund.context";
import SimpleBar from "simplebar-react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Box, Grid,useMediaQuery } from "@mui/material";
import { fetchGetProducts } from "../../../store/reducers/thunks/costfund";
import ProductVoid from "../components/ProductVoid";
import CustomTableLeftCellHead from "../components/table/CutomTableLeftCellHead";
import CustomTableCenterCellHead from "../components/table/CustomTableCenterCellHead";
import CustomTableRightCellHead from "../components/table/CustomTableRightCellHead";
import CustomTableRow from "../components/table/CustomTableRow";
import ServerError from "../exceptions/ServerError";
import TemporaryDrawer from "../../../components/modal/drawer";
import FilterProductForm from "./FilterProductForm";
import { loginRequest } from "../../../authConfig";

// Redux states...
const selectProducts = (state) => state.costfund;

const TableProduct = () => {
  const dispatch = useDispatch();
  const { instance } = useMsal();
  const { _products, status } = useSelector(selectProducts);
  const {
    productIndex,
    setCostfundParameters,
    rateIndex,
    structureIndex,
    currencyIndex,
    productOptionsArray,
  } = useContext(CostfundContext);
  // const [productId, setProductId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  useEffect(() => {
    gettingProducts();
  }, []);

  const handleRowClick = (rowData) => {
    setSelectedRowId(rowData.id);
    setSelectedRow(rowData);
    // Adding idCategory == productId to context object
    const productData = { idCategory: productIndex };
    Object.assign(productData, rowData);
    console.log(productData);
    setCostfundParameters(productData);
  };

  const handleSelect = (option) => {
    // setProductId(option.value);
    if (option == null) setCostfundParameters(null);
  };

  const gettingProducts = async () => {
    try {
      await dispatch(fetchGetProducts());
   
    } catch (error) {
      console.log("ERROR_GET_COSTFUND_PRODUCTS", error);
    }
  };

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (productOptionsArray.length > 0) {
      setOpenDrawer(!openDrawer);
    }
  };

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  // Advanced product list
  const filteredProducts = productOptionsArray.filter((product) => {
    if (currencyIndex !== "" && rateIndex !== "" && structureIndex !== "") {
      // Return by filters
      return (
        product.structure.includes(structureIndex) &&
        product.currency.includes(currencyIndex) &&
        product.rateType.includes(rateIndex)
      );
    }
    if (currencyIndex !== "" && rateIndex !== "") {
      // Return by filters
      return (
        product.currency.includes(currencyIndex) &&
        product.rateType.includes(rateIndex)
      );
    }
    if (currencyIndex !== "" && structureIndex !== "") {
      // Return by filters
      return (
        product.structure.includes(structureIndex) &&
        product.currency.includes(currencyIndex)
      );
    }
    if (rateIndex !== "" && structureIndex !== "") {
      // Return by filters
      return (
        product.structure.includes(structureIndex) &&
        product.rateType.includes(rateIndex)
      );
    }

    if (currencyIndex !== "") {
      // Return by filters
      return product.currency.includes(currencyIndex);
    }

    if (rateIndex !== "") {
      // Return by filters
      return product.rateType.includes(rateIndex);
    }

    if (structureIndex !== "") {
      // Return by filters
      return product.structure.includes(structureIndex);
    }

    return (
      product.currency.includes(currencyIndex) ||
      product.rateType.includes(rateIndex) ||
      product.structure.includes(structureIndex)
    );
  });

  // console.log("filteredProducts", filteredProducts);
  // console.log(currencyIndex);
  // console.log(rateIndex);
  // console.log(structureIndex);
  // console.log(
  //   filteredProducts &&
  //     (currencyIndex !== "" || rateIndex !== "" || structureIndex !== "")
  // );

  const productTableState = filteredProducts &&
  (currencyIndex !== "" || rateIndex !== "" || structureIndex !== "");

  if(status === "JWT-EXPIRED"){
    console.log(status)
    handleLoginRedirect()
  }
  console.log(status);
 

  // console.log(productTableState)

  return (
    // <Box sx={{ p: "24px", height: "747px" }}>
    <Box sx={{ p: matchDownXL ? "12px" : "24px", height: "90vh" }}>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12} sx={{ m: 1 }}>
          <div
            style={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            {status == "Error" && <ServerError />}
            {
              !productTableState
                && <ProductVoid />
               }
            {productTableState && (
            // {productOptionsArray.length > 0 && (
              <div aria-label="customized table">
                <div>
                  <div
                    style={{
                      marginBottom: matchDownXL ? "12px" : "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >   
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <CustomTableLeftCellHead
                      width={"60%"}
                      fontWeight={700}
                      title={"Estructura"}
                    />
                    <CustomTableCenterCellHead
                      width={"20%"}
                      fontWeight={700}
                      title={"Tasa"}
                    />

                    <CustomTableRightCellHead
                      width={"20%"}
                      fontWeight={700}
                      title={"Moneda"}
                    />
                  </div>
                </div>

                <SimpleBar style={{ height: "75vh" }}>
                  {filteredProducts &&
                  // {filteredProducts &&
                  //   (currencyIndex !== "" ||
                  //     rateIndex !== "" ||
                  //     structureIndex !== "") &&
                    filteredProducts.map((row, _idx) => (
                      <CustomTableRow
                        key={_idx}
                        row={row}
                        handleRowClick={handleRowClick}
                        selectedRowId={selectedRowId}
                      />
                    ))}
                </SimpleBar>
              </div>
            )}
          </div>
        </Grid>
      </Grid>

      <TemporaryDrawer
        anchor={"right"}
        toggleDrawer={toggleDrawer}
        open={openDrawer}
        isFilter={true}
        dialogTitle={"Filtrar"}
        dialogSubTitle={
          "Complementa un tipo de crédito con otros datos que quieras visualizar."
        }
      >
        <FilterProductForm handleClose={toggleDrawer} />
      </TemporaryDrawer>
    </Box>
  );
};

export default TableProduct;
