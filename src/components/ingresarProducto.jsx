import React, { useState } from "react";
import { db } from "../firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { uploadImage } from "../firebase/firebase-config";
import "./ingresar.css";
const IngresarProducto = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();
  const productsCollection = collection(db, "productos");

  const store = async (e) => {
    e.preventDefault();
    try {
      const url = await uploadImage(imagen);
      console.log(url);
      await addDoc(productsCollection, {
        titulo: titulo,
        descripcion: descripcion,
        precio: precio,
        cantidad: cantidad,
        imagen: url,
      });

      navigate("/listar-productos");
    } catch (error) {
      console.error(error);
      alert(
        "Fallo interno, compruebe su conexión a internet,ERROR #{'ver subida de imagen'}"
      );
    }
  };
  return (
    <>
      <div className="ingresar">
        <div className="formulario">
          <h3>Ingresar producto</h3>
          <hr />
          <form onSubmit={store}>
            <div className="mb-1 me-5 ms-5">
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Nombre"
              />
            </div>
            <div className="mb-1 me-5 ms-5">
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                type="text"
                className="form-control descripcion"
                placeholder="Descripcion"
              />
            </div>
            <div className="mb-1 me-5 ms-5">
              <input
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Precio"
              />
            </div>
            <div className="mb-1 me-5 ms-5">
              <input
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                type="number"
                className="form-control"
                placeholder="Cantidad"
              />
            </div>

            <div className="form-control imagen">
              <input
                className="form-control"
                type="file"
                name="imagen"
                onChange={(e) => setImagen(e.target.files[0])}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <Link to="/" className="btn btn-warning">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
      ;
    </>
  );
};

export default IngresarProducto;
