import { doc, collection, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { uploadImage } from "../firebase/firebase-config";
import { db } from "../firebase/firebase-config";

const EditarProducto = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState();
  const [imagen, setImagen] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "productos", id));
    if (product.exists()) {
      setTitulo(product.data().titulo);
      setDescripcion(product.data().descripcion);
      setPrecio(product.data().precio);
      setCantidad(product.data().cantidad);
      setImagen(product.data().imagen);
    } else {
      console.log("id incorrecto");
    }
  };
  const updateProduct = async (e) => {
    e.preventDefault();
    const url = await uploadImage(imagen);
    const product = doc(db, "productos", id);
    const data = {
      titulo: titulo,
      descripcion: descripcion,
      precio: precio,
      cantidad: cantidad,
      imagen: url,
    };
    await updateDoc(product, data);
    navigate("/listar-productos");
  };

  useEffect(() => {
    getProductById(id);
  }, []);
  return (
    <>
      <div className="row listar">
        <div className="row">
          <div className="col">
            <form onSubmit={updateProduct}>
              <h3>Editar producto</h3>
              <hr />
              <div className="col-6 label">
                <div className="mb-1 me-5 ms-5">
                  <label htmlFor="">Nombre:</label>
                  <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-1 me-5 ms-5">
                  <label htmlFor="">Descripción:</label>
                  <input
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-1 me-5 ms-5">
                  <label htmlFor="">Precio:</label>
                  <input
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    type="number"
                    className="form-control"
                  />
                </div>
                <div className="mb-1 me-5 ms-5">
                  <label>Cantidad:</label>
                  <input
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    type="number"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="box-dos">
                <div className="col-4 container-img">
                  <img src={imagen} alt="imagen-editar" />

                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImagen(e.target.files[0])}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
              <Link to="/listar-productos" className="btn btn-warning">
                Cancelar
              </Link>
            </form>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default EditarProducto;
