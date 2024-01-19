import React from "react";

const MiniDrawerIconContainer = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <div>{children}</div>
    </div>
  );
};

export default MiniDrawerIconContainer;
