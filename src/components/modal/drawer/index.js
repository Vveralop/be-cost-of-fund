import * as React from "react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import { Box, IconButton, Typography ,useMediaQuery} from "@mui/material";
// assets
import CloseIcon from "../../../assets/images/close-icon.svg";
import FilterIcon from "../../../assets/images/filter-icon.svg";

export default function TemporaryDrawer(props) {
  const {
    children,
    dialogTitle,
    dialogSubTitle,
    anchor,
    toggleDrawer,
    open,
    isFilter,
  } = props;

  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <div>
      <React.Fragment key={anchor}>
        <Drawer
          anchor={anchor}
          open={open}
          onClose={toggleDrawer}
          sx={{ zIndex: 1510 }}
        >
          <Box
            sx={{
              width: anchor === "top" || anchor === "bottom" ? "auto" : 440,
            }}
            role="presentation"
            // onClick={toggleDrawer}
            // onKeyDown={toggleDrawer}
          >
            <div id="customized-dialog-title">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "24px",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "8px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {isFilter === true && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight:"10px"
                      }}
                    >
                      <img
                        src={FilterIcon}
                        alt="exit-icon"
                        width="32"
                        heigth="32"
                      />
                    </div>
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant={matchDownXL ? "displayBold20" : "displayBold28"} color="#231D19">
                        {dialogTitle}
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <Typography variant={matchDownXL ? "display14" : "display20"} color="#56504C">
                      {dialogSubTitle}
                    </Typography>
                  </div>
                </div>
                <div>
                  {toggleDrawer ? (
                    <IconButton
                      aria-label="close"
                      onClick={toggleDrawer}
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        p: 4,
                        // color: (theme) => theme.palette.grey[500],
                      }}
                    >
                      <img
                        src={CloseIcon}
                        alt="close-icon"
                        width= {"32"}
                        heigth={"32"}
                      />
                    </IconButton>
                  ) : null}
                </div>
              </div>
            </div>
            <div sx={{ pr: 4, pl: 4 }}>{children}</div>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
