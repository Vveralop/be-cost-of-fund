// ==============================|| OVERRIDES - Dialog ||============================== //

export default function Paper(theme) {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.MuiPaper-root &.MuiPaper-elevation &.MuiPaper-rounded &.MuiPopover-paper": {
            zIndex: 1520,
          },
        },
      },
    },
  };
}
