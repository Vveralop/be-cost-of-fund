import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import CustomFormLabel from "../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../forms/custom-elements/CustomTextField";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1890FF",
    color: theme.palette.common.white,
    width: "40px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Pagos iguales", "Fija", "CLP", "Crédito con pagos iguales"),
  createData(
    "Perfil de capital irregular",
    "Fija",
    "CLP",
    "Crédito con perfil de pagos irregular"
  ),
  createData(
    "Bullet",
    "Flotante",
    "CLP",
    "Crédito con pago capital al final con pagos de intereses intermedios"
  ),
  createData(
    "Perfil de capital irregula",
    "Flotante",
    "CLP",
    "Crédito con perfil de pagos irregular"
  ),
];

export default function TableCustomized() {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12}>
          <Divider textAlign="left">
            <Typography variant="h4">Filtros</Typography>
          </Divider>
        </Grid>
        <Grid item lg={6} md={12} sm={12}>
          <CustomFormLabel>Tipo de crédito</CustomFormLabel>
          <CustomTextField
            id="credit_type"
            size="small"
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid
          item
          lg={6}
          md={12}
          sm={12}
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "flex-end",
          }}
        >
          <Button color="primary" variant="contained" sx={{ mr: 1 }}>
            Burcar
          </Button>
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          {/* <TableContainer component={Paper} sx={{mt:2}}> */}
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      width: 100,
                      backgroundColor: "#1890FF",
                      color: "#FFFFFF",
                      borderTopLeftRadius: 10,
                      fontSize: 12,
                    }}
                  >
                    Id
                  </TableCell>
                  <TableCell
                    style={{
                      width: 100,
                      backgroundColor: "#1890FF",
                      color: "#FFFFFF",
                      fontSize: 12,
                    }}
                  >
                    Tipo Tasa
                  </TableCell>
                  <TableCell
                    style={{
                      width: 100,
                      backgroundColor: "#1890FF",
                      color: "#FFFFFF",
                      fontSize: 12,
                    }}
                  >
                    Moneda
                  </TableCell>
                  <TableCell
                    style={{
                      width: 100,
                      backgroundColor: "#1890FF",
                      color: "#FFFFFF",
                      borderTopRightRadius: 10,
                      fontSize: 12,
                    }}
                  >
                    Descripción
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell style={{ width: 100, fontSize: 12 }}>
                      {row.name}
                    </TableCell>
                    <TableCell style={{ width: 100, fontSize: 12 }}>
                      {row.calories}
                    </TableCell>
                    <TableCell style={{ width: 100, fontSize: 12 }}>
                      {row.fat}
                    </TableCell>
                    <TableCell style={{ width: 100, fontSize: 12 }}>
                      {row.carbs}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
