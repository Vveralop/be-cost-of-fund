import React from "react";
import {styled} from "@mui/material/styles";
import { NativeSelect, OutlinedInput, TextField } from "@mui/material";

const CustomSelect = styled((props)=>(
    <NativeSelect
        SelectProps={{native:true}}
        select
        input={<OutlinedInput />}
        {...props}
    />
))(({theme})=>({
    "& .MuiSelect-select":{
        color:"#767e89",
    },
    "& .MuiOutlinedInput-notchedOutline":{
        borderColor:`${
            theme.palette.mode === "dark" ? "rgba(255,255,255,0.12)":"#dee3e9"
            // theme.palette.mode === "dark" ? "rgba(255,255,255,0.12)":"#dee3e9"
        }`,
        height:"48px"
       
    },
    "& .MuiSelect-select::-webkit-input-placeholder":{
        color:"767e89",
        opacity:"1",
    },
    
  
}));

export default CustomSelect;