import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";

export const SignOutButton = ({ children }) => {
  const { instance } = useMsal();

  const handleLogOut = () => {
    instance.logoutRedirect();
  };

  return (
    <Button color="inherit" variant="outlined" onClick={handleLogOut}>
      {children}
    </Button>
  );
};
