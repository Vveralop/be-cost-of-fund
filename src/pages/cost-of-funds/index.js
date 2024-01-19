import React, { useContext } from "react";
import PageContainer from "../../components/PageContainer";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, Card,useMediaQuery } from "@mui/material";
import CalculatorForm from "./forms/CalculatorForm";
import TableProduct from "./forms/TableProduct";
import FilterComponent from "./forms/FilterComponent";
import Breadcrumb from "../../layout/breadcrumb/Breadcrumb";
import { CostfundContext } from "../../contexts/costfund.context";

const CostOfFund = () => {
  const { productIndex, rateIndex, structureIndex, currencyIndex,costfundParameters } =
    useContext(CostfundContext);
    const theme = useTheme();
    const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

    const disabledLayerState =
    productIndex &&
    (currencyIndex !== "" || structureIndex !== "" || rateIndex !== "");
    // console.log(disabledLayerState)

  const BCrumb = [
    {
      title: "PAT | Plataforma de análisis de tesorería",
      href: "/",
    },
    {
      title: "Costo de fondo",
      href: "/fundcost",
    },
    {
      title: "Cotizar",
      href: "/fundcost",
      active: true,
    },
  ];



  return (
    <PageContainer title="TesoPro - Costo de fondo">
      <Breadcrumb
        title={"Simulación de costo de fondo"}
        subtitle={"Selecciona el tipo de crédito o producto a simular."}
        items={BCrumb}
      />
      <Grid container spacing={ matchDownXL ? 2 : 3} sx={{ mt:  matchDownXL ? 1 : 2, px: 0 }}>
        <Grid item lg={12} md={12} sm={12}>
          <div
            style={{
              padding: matchDownXL ? "16px" : "24px",
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
            }}
          >
            <FilterComponent />
          </div>
        </Grid>
        <Grid item lg={6} md={12} sm={12}>
          <Card>
            <TableProduct />
          </Card>
        </Grid>
        <Grid item lg={6} md={12} sm={12}>
          <div
            style={{
              position: "relative",
            }}
          >
           
            {(!costfundParameters || !disabledLayerState)  && (
                <div
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                  }}
                />
              )}
            <Card>
              <CalculatorForm />
            </Card>
          </div>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CostOfFund;
