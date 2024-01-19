// Material-ui
import { useMediaQuery } from "@mui/material";

// Project import
import DateHeaderComponent from "./DateHeaderComponent";
import NameHeaderComponent from "./NameHeaderComponent";
import DividerHeaderComponent from "./DividerHeaderComponent";
import ExitButton from "./ExitButton";

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      {!matchesXs && <DateHeaderComponent />}
      {!matchesXs && <NameHeaderComponent />}
      {!matchesXs && <DividerHeaderComponent />}
      {!matchesXs && (
        <ExitButton textButton={"Cerrar sesión"} goTo={"/login"} />
      )}
      {matchesXs && <NameHeaderComponent />}
      {matchesXs && <DividerHeaderComponent />}
      {matchesXs && <ExitButton textButton={"Cerrar sesión"} goTo={"/login"} />}
    </div>
  );
};

export default HeaderContent;
