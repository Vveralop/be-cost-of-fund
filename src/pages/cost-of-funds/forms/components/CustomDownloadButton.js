import React from "react";
// Itau One
import { OneButtonHub } from "@itau-one/react";
import { DocumentoExcelOutline } from "@itau-one/icons";
import { object } from "prop-types";

const CustomDownloadButton = ({ handlePaste
   }) => {
  let options = {
    label: "Descargar Excel",
    href: "#",
    icon: <DocumentoExcelOutline />,
  };

  const hubOptions = [
    options
  ];

  return (
    <div onClick={handlePaste}>
      <OneButtonHub enableClose={true} items={hubOptions} />
    </div>
  );
};

export default CustomDownloadButton;
