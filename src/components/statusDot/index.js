const StatusDot = ({ status }) => {
    // console.log("status",status)
  let dotColor =
    status === "Approved"
      ? "#008859"
      : status === "Pending"
      ? "#F1AE2F"
      : "#B71C1C";

  return (
    <span
      style={{
        backgroundColor: `${dotColor}`,
        borderRadius: "50%",
        width: "8px",
        height: "8px",
        display: "block",
      }}
    ></span>
  );
};

export default StatusDot;
