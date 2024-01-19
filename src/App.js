import { useRoutes } from "react-router-dom";
// Project Import
import ScrollTop from "./components/ScrollTop";
import ThemeCustomization from "./themes";

// MSAL imports

import {
  MsalProvider,
  AuthenticatedTemplate,
  useMsal,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import LoginRoutes from "./routes/LoginRoutes";
import MainRoutes from "./routes/MainRoutes";
import RedirectRoute from "./routes/RedirectRoute";

const MainContent = () => {
  /**
   * useMsal is a hook that returns the PublicClientApplication instance.
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  // console.log("ACTIVE_ACCOUNT", activeAccount);

  function UnauthRoutes() {
    return useRoutes([LoginRoutes, RedirectRoute]);
  }

  function AuthRoutes() {
    return useRoutes([MainRoutes]);
  }

  /**
   * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
   * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
   * only render their children if a user is authenticated or unauthenticated, respectively. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
   */
  return (
    <div className="App">
      <ThemeCustomization>
        <AuthenticatedTemplate>
          {activeAccount ? (
            <ScrollTop>
              <AuthRoutes />
            </ScrollTop>
          ) : null}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <ScrollTop>
            <UnauthRoutes />
          </ScrollTop>
        </UnauthenticatedTemplate>
      </ThemeCustomization>
    </div>
  );
};

function App({ instance }) {
  return (
    <MsalProvider instance={instance}>
      <MainContent />
    </MsalProvider>
  );
}

export default App;
