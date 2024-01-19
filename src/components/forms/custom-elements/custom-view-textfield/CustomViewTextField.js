// Custom Dropdown Select
import React, { useState, useEffect } from "react";
import "./customViewTextField.css";

const CustomViewTextField = ({
  customLabel,
  value,
  small
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    if(value == ""){
        setIsOpen(false)
    }else{
        setIsOpen(true)
    }
  },[value])




  return (
    <div className="custom-view-textfield" >
      {isOpen && (
        <span className="select-label">
          {customLabel ? customLabel : "Texto"}
        </span>
      )}
      <div
        className={`select-header ${isOpen ? "open" : ""}`}
        style={{height: small ? "43px" : "auto"}}
      >
        {value ? (
          <div>{value}</div>
        ) : (
          <div>{customLabel ? customLabel : "Texto"}</div>
        )}
      </div>
    </div>
  );
};

export default CustomViewTextField;
