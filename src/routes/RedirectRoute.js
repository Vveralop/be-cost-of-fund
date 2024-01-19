import React, { lazy } from "react";

// Project import
import Loadable from "../components/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

// Render - Blank
const Blank = Loadable(lazy(() => import("../pages/blank")));

const RedirectRoute = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "",
      element: <Blank />,
    },
    {
      path: "/fundcost",
      element: <Blank />,
    },
    {
      path: "/fundcost/quotes",
      element: <Blank />,
    },
    {
      path: "/fundcost/approvals",
      element: <Blank />,
    },
  ],
};

export default RedirectRoute;
