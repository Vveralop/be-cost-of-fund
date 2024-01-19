import React from "react";
import "./customitauLoader.css";

const CustomItauLoader = () => {
  return (
    <div className="contenedor-animacion">
      <div id="animacion-carga">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="sombra-carga"></div>
    </div>
  );
};

export default CustomItauLoader;
