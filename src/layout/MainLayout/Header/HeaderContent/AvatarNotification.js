import React, { useState, useEffect } from "react";

import { Avatar } from "@mui/material";
import NotificationIcon from "../../../../assets/images/notification-icon.svg";

const AvatarNotification = () => {
  const [avatarName, setAvatarName] = useState("--");

  const divStyles = {
    display: "flex",
    width: "226px",
    padding: "24px",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  return (
    <div style={divStyles}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "#000000" }}>{avatarName}</Avatar>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "11px",
          padding: "7px",
        }}
      >
        <img src={NotificationIcon} alt="exit-icon" width="19" heigth="20" />
      </div>
    </div>
  );
};

export default AvatarNotification;
