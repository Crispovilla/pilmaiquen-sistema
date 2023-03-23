import { doc, collection, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { uploadImage } from "../firebase/firebase-config";
import { db } from "../firebase/firebase-config";

const EditarOferta = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState();
  const [imagen, setImagen] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  const getOffer = async (id) => {
    const offer = await getDoc(doc(db, "oferta", id));
    if (offer.exists()) {
      setTitulo(offer.data().titulo);
      setDescripcion(offer.data().descripcion);
      setPrecio(offer.data().precio);
      setStock(offer.data().stock);
      setImagen(offer.data().imagen);
    } else {
      console.log("id incorrecto");
    }
  };
  const updateOffer = async (e) => {
    e.preventDefault();
    const url = await uploadImage(imagen);
    const offer = doc(db, "oferta", id);
    const data = {
      titulo: titulo,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      imagen: url,
    };
    await updateDoc(offer, data);
    navigate("/");
  };

  useEffect(() => {
    getOffer(id);
  }, []);
  return (
    <>
      <div className="row listar">
        <div className="row">
          <div className="col">
            <form onSubmit={updateOffer}>
              <h3>Editar oferta</h3>
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
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
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
              <Link to="/" className="btn btn-warning">
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

export default EditarOferta;
