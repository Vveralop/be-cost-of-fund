import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CostfundContext } from "../../contexts/costfund.context";
import { useTheme } from "@mui/material/styles";

import {
  CircularProgress,
  CardContent,
  Typography,
  TableHead,
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  IconButton,
  CardHeader,
  Button,
} from "@mui/material";

import FeatherIcon from "feather-icons-react";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import TablePaginationActions from "../../components/table/TablePaginationActions";

const CostFundTable = (props, ref) => {
  const { loading } = useContext(CostfundContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = [
    {
      id: 1,
      csharp: 1,
      paymentDate: "11/08/2023",
      redemption: "0.00",
      interest: "2.59",
      total: "2.59",
    },
    {
      id: 2,
      csharp: 2,
      paymentDate: "11/11/2023",
      redemption: "0.00",
      interest: "2.59",
      total: "2.59",
    },
    {
      id: 3,
      csharp: 3,
      paymentDate: "11/02/2023",
      redemption: "0.00",
      interest: "2.51",
      total: "2.51",
    },
    {
      id: 4,
      csharp: 4,
      paymentDate: "11/05/2024",
      redemption: "100.00",
      interest: "2.46",
      total: "102.46",
    },
    {
      id: 5,
      csharp: 5,
      paymentDate: "11/02/2023",
      redemption: "0.00",
      interest: "2.51",
      total: "2.51",
    },
    {
      id: 6,
      csharp: 6,
      paymentDate: "11/05/2024",
      redemption: "100.00",
      interest: "2.46",
      total: "102.46",
    },
  ];

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.legth) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <CardHeader
        action={
          <IconButton aria-label="settings" sx={{ mr: 3 }}>
            {
              <Button
                variant="outlined"
                size="small"

                // onclick={()=>{}}
              >
                Copiar
              </Button>
            }
          </IconButton>
        }
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Table
              aria-label="custom pagination table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 100 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography varian="h5">C#</Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ width: 100 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography varian="h5">Payment Date</Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ width: 100 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography varian="h5">Redemption</Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ width: 100 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography varian="h5">Interest</Typography>
                    </Box>
                  </TableCell>
                  <TableCell style={{ width: 100 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography varian="h5">Total</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {row.csharp}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {row.paymentDate}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {row.redemption}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {row.interest}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {row.total}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={6}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputprops: {
                        "aria-label": "Registros por página",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          )}
        </Box>
      </CardContent>
    </>
  );
};

export default CostFundTable;
