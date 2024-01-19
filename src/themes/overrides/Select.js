// material-ui
import { alpha } from "@mui/material/styles";
import SelectArrowUp from "../../assets/images/select-arrow-up-icon.svg";

// ==============================|| OVERRIDES - SELECT ||============================== //

export default function Select(theme) {
  return {
    MuiSelect: {
      styleOverrides: {
        select: {
         '&.custom-itau-select':{
            '&:after':{
                backgroundImage:`url(${SelectArrowUp})`,
                backgroundPosition:"right 12px center",
                backgroundRepeat: "no-repeat",
                backgroundSize:"16px 16px",
                content:'""',
                display:"inline-block",
                height:"16px",
                pointerEvents:"none",
                position:"absolute",
                right:"8px",
                top:"calc(50%-8px)",
                transform:"rotate(0deg)",
                transition:"transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                width:"16px",

            },
            '&[aria-expanded="true"]:after':{
                transform:"rotate(180deg)",
            }
         }
        }
       
      },
    },
  };
}
