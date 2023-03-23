import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../dashboard/Dashboard";
import CrearNoticia from "../CrearNoticia";
import EditarOferta from "../EditarOferta";
import EditarProducto from "../EditarProducto";
import Home from "../Home";
import IngresarModerador from "../IngresarModerador";
import IngresarProducto from "../ingresarProducto";
import ListarModeradores from "../ListarModeradores";
import ListarProductos from "../ListarProductos";
const RoutesComponents = () => {
  return (
    <>
      <Dashboard />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/listar-productos" element={<ListarProductos />} />
          <Route path="/ingresar-producto" element={<IngresarProducto />} />
          <Route path="/crear-noticia/:id" element={<CrearNoticia />} />
          <Route path="/editar-producto/:id" element={<EditarProducto />} />
          <Route path="/editar-oferta/:id" element={<EditarOferta />} />
          <Route path="/listar-moderadores" element={<ListarModeradores />} />
          <Route path="/ingresar-moderador" element={<IngresarModerador />} />
        </Routes>
      </div>
    </>
  );
};

export default RoutesComponents;
