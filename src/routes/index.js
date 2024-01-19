import { useRoutes } from "react-router-dom";

// Project import
import OuterRoutes from "./LoginRoutes.js";
// import RedirectRoute from "./RedirectRoute.js";
import MainRoutes from "./MainRoutes.js";
import HealthRoutes from "./healthRoute.js";
import SignedRoutes from "./signedRoutes.js";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([OuterRoutes, MainRoutes, HealthRoutes, SignedRoutes]);
}
