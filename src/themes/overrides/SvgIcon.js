// ==============================|| OVERRIDES - SVG SELECT ICON ||============================== //

export default function SvgIcon() {
    return {
        MuiSvgIcon: {
        styleOverrides: {
          root: {
            "&.MuiSelect-icon": {
                top:"18px",
                "&.MuiSelect-iconOpen":{
                    top:"11px",
                    right:"9px"
                }
            },
          },
        },
      },
    };
  }