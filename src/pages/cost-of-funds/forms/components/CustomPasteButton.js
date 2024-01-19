import React from "react";
// Itau One
import { OneButtonHub } from "@itau-one/react";
import { Sumar } from "@itau-one/icons";

const CustomPasteButton = ({ handleClick }) => {
  const hubOptions = [
    {
      label: "Pegar",
      href: "#",
      icon: <Sumar />,
    },
  ];

  return (
    <div onClick={()=>handleClick()}>
      <OneButtonHub enableClose={true} items={hubOptions} />
    </div>
  );
};

export default CustomPasteButton;
