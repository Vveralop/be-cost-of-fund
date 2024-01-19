import React from "react";
// Project import
import Navigation from "./Navigation";
import SimpleBar from "../../../../components/third-party/SimpleBar";
import CollapsableButton from "./CollapsableButton";

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = ({open,handleDrawerToggle}) => (
  <SimpleBar
    sx={{
      "& .simplebar-content": {
        display: "flex",
        flexDirection: "column",
      },
      backgroundColor: "#001E4F", // BACKGROUND COLOR DRAWER HEADER
      height: "100%",
    }}
  >
    {/* Drawer open/close button*/}
    <CollapsableButton open={open} handleDrawerToggle={handleDrawerToggle}/>
    {/* Drawer navigation section */}
    <Navigation open={open} />
  </SimpleBar>
);

export default DrawerContent;
