import React, { useState, useEffect } from "react";
// MSAL imports
import { useMsal } from "@azure/msal-react";
// Material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Typography, useMediaQuery } from "@mui/material";
// Itau One
import { OneAvatar } from "@itau-one/react";
// Assets
import ArrowHeaderIcon from "../../../../assets/images/arrow-down-header.svg";

const NameHeaderComponent = () => {
  const [fullName, setFullName] = useState("");
  const [avatarName, setAvatarName] = useState("--");
  const theme = useTheme();
  const matchDownXS = useMediaQuery(theme.breakpoints.down("md"));
  const matchDownXL = useMediaQuery(theme.breakpoints.down("xl"));
  /**
   * useMsal is a hook that returns the PublicClientApplication instance.
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  useEffect(() => {
    setFullName(activeAccount.name);

    let name = activeAccount.name ? activeAccount.name : "--";
    const avName = abbreviationName(name);
    setAvatarName(avName);
  }, []);

  const abbreviationName = (str) => {
    const name = str.split(" ");
    let firstChart = "-";
    let secondChart = "-";

    if (name.length > 1) {
      firstChart = name[0].charAt(0).toUpperCase();
      secondChart = name[1].charAt(0).toUpperCase();
      return firstChart + secondChart;
    }

    if (name.length < 2) {
      firstChart = name[0].charAt(0).toUpperCase();
      secondChart = name[0].charAt(1).toUpperCase();
      return firstChart + secondChart;
    }

    return firstChart + secondChart;
  };

  const divStyles = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: matchDownXL ? "36px" : "40px",
    width: "auto",
    padding: "4px",
    paddingRight: "8px",
    border: "1px solid #EFE9E5",
    borderRadius: "20px",
    cursor: "pointer",
  };

  return (
    <div style={divStyles}>
      <div>
        <OneAvatar alt={avatarName} />
      </div>
      {!matchDownXS && (
        <div style={{ marginLeft: 8, marginRight: 8 }}>
          <Typography variant={matchDownXL ? "normalBold12": "normalBold14"} color="#000512">
            {`Hola ${fullName}`}
          </Typography>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...(matchDownXS && { paddingLeft: "10px" }),
        }}
      >
        {/* <img
          src={ArrowHeaderIcon}
          height={16}
          width={16}
          alt="arrow-icon-down"
        /> */}
      </div>
    </div>
  );
};

export default NameHeaderComponent;
