import React from "react";
import PageContainer from "../../components/PageContainer";
import GridContainer from "../../components/GridContainer";
import { Grid } from "@mui/material";
import QuotesApprovalTable from "./Table";

const QuotesApprovalPage = () => {
  const BCrumb = [
    {
      title: "PAT | Plataforma de análisis de tesorería",
      href: "/",
    },
    {
      title: "Costo de fondo",
      href: "/fundcost/approvals",
    },
    {
      title: "Aprobaciones",
      href: "/fundcost/approvals",
      active: true,
    },
  ];

  return (
    <PageContainer title="TesoPro - Aprobar Cotizaciones">
      <GridContainer
        BCItems={BCrumb}
        title="Aprobaciones"
        to="/fundcost/approvals"
      >
        <Grid item xs={12} md={12} lg={12}>
          <QuotesApprovalTable />
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default QuotesApprovalPage;
