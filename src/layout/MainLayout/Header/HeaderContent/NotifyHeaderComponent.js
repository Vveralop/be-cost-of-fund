import React from "react";
import NotificationIcon from "../../../../assets/images/notification-icon.svg";

const NotifyHeaderComponent = () => {
  const divStyles = {
    display: "flex",
    width: "32px",
    margin: "24px",
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
        <img src={NotificationIcon} alt="exit-icon" width="19" heigth="20" />
      </div>
    </div>
  );
};

export default NotifyHeaderComponent;
