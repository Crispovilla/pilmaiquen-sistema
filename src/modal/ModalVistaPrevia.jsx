import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import "./modal.css";
const ModalVistaPrevia = ({ children, open, setOpen }) => {
  return (
    <>
      {open && (
        <div className="overlay">
          <div className="container-modal">
            <div className="encabezado-modal">Detalle producto</div>
            <div className="cerrar-modal" onClick={() => setOpen(false)}>
              <IoCloseCircle />
            </div>
            <h1>{children}</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalVistaPrevia;
