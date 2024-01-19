import React, { useState, useEffect } from "react";
import PageContainer from "../../components/PageContainer";
import GridContainer from "../../components/GridContainer";
import { Grid } from "@mui/material";
import QuotesTable from "./Table";

const QuotesPage = () => {
  const [windowsSize, setWindowsSize] = useState({
    width:undefined,
    height: undefined
  });

  const handleResize = () => {
    setWindowsSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

  };

  useEffect(()=>{
    // Function to get the screen size
  
    // Setting to initial size
    handleResize();

    // Add change listener
    window.removeEventListener("resize", handleResize);

    // Clean the listener
    return ()=> window.removeEventListener("resize", handleResize);
  },[])

  console.log(windowsSize)




  const BCrumb = [
    {
      title: "PAT | Plataforma de análisis de tesorería",
      href: "/",
    },
    {
      title: "Costo de fondo",
      href: "/fundcost/quotes",
    },
    {
      title: "Mis cotizaciones",
      href: "/fundcost/quotes",
      active: true,
    },
  ];

  return (
    <PageContainer title="TesoPro - Cotizaciones">
      <GridContainer
        BCItems={BCrumb}
        title="Mis cotizaciones"
        to="/fundcost/quotes"
      >
        <Grid item xs={12} md={12} lg={12}>
          <QuotesTable />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default QuotesPage;
