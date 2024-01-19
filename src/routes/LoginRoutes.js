import React, { lazy } from "react";

// Project import
import Loadable from "../components/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

// Render - login
const AuthLogin = Loadable(
  lazy(() => import("../pages/authentication/Login.js"))
);

const LoginRoutes = {
  path: "/login",
  element: <MinimalLayout />,
  children: [
    {
      path: "",
      element: <AuthLogin />,
    },
  ],
};

export default LoginRoutes;
