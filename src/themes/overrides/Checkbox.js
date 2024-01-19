// ==============================|| OVERRIDES - CHECKBOX ||============================== //

export default function Checkbox(theme) {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary[300],
          "&.Mui-checkbox-indeterminate": {
            color: "#FF5500",
          },
          "&.Mui-checked": {
            color: "#FF5500",
          },
        },
      },
    },
  };
}
