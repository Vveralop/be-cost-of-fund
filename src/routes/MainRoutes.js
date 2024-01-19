import React, { lazy } from "react";

//Project import
import Loadable from "../components/Loadable"; // Suspense Wrapper
import MainLayout from "../layout/MainLayout";
import CostfundContextProvider from "../contexts/costfund.context";

// render - dashboard
const Home = Loadable(lazy(() => import("../pages/home")));
const CostOfFund = Loadable(lazy(() => import("../pages/cost-of-funds")));
const QuotesPage = Loadable(lazy(() => import("../pages/cost-of-funds-quotes")));
const QuotesApprovalPage = Loadable(lazy(() => import("../pages/cost-of-funds-approvals")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    // {
    //   path: "/",
    //   element: <Home />,
    // },
    {
      path: "/",
      element: (
        <CostfundContextProvider>
          <CostOfFund />
        </CostfundContextProvider>
      ),
    },
    {
      path: "/fundcost",
      element: (
        <CostfundContextProvider>
          <CostOfFund />
        </CostfundContextProvider>
      ),
    },
    {
      path: "/fundcost/quotes",
      element: <QuotesPage/>,
    },
    {
      path: "/fundcost/approvals",
      element: <QuotesApprovalPage/>,
    },
  ],
};

export default MainRoutes;
