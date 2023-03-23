import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/firebase-config";
import { doc, collection, getDoc, updateDoc, addDoc } from "firebase/firestore";
import { uploadImage } from "../firebase/firebase-config";

import "./noticia.css";

const CrearNoticia = () => {
  const [tituloOferta, setTitulo] = useState("");
  const [valorOferta, setValorOferta] = useState(0);
  const [descripcionOferta, setDescripcionOferta] = useState("");
  const [imagenOferta, setImagen] = useState(null);
  const [stockOferta, setStock] = useState(0);
  const offertCollection = collection(db, "oferta");

  const navigate = useNavigate();
  const { id } = useParams();

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "productos", id));
    if (product.exists()) {
      setTitulo(product.data().titulo);
      setValorOferta(product.data().precio);
      setDescripcionOferta(product.data().descripcion);
      setImagen(product.data().imagen);
      setStock(product.data().cantidad);
    } else {
      console.log("id incorrecto");
    }
  };

  const onSubmitOferta = async (e) => {
    e.preventDefault();
    console.log("hola");
    const url = await uploadImage(imagenOferta);

    try {
      await addDoc(offertCollection, {
        titulo: tituloOferta,
        descripcion: descripcionOferta,
        valor: valorOferta,
        stock: stockOferta,
        imagen: url,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Fallo interno, compruebe su conexión a internet,ERR #404");
    }
  };
  useEffect(() => {
    getProductById(id);
  }, []);

  return (
    <>
      <div className="container-noticia">
        <form onSubmit={onSubmitOferta}>
          <div className="bloque-noticia">
            <h3>Crea tu publicación</h3>

            <label>Título:</label>
            <input
              value={tituloOferta}
              className="form-control"
              type="text"
              onChange={(e) => setTitulo(e.target.value)}
            />
            <label>Valor con oferta:</label>
            <input
              value={valorOferta}
              className="form-control"
              type="number"
              onChange={(e) => setValorOferta(e.target.value)}
            />
            <div className="box-dos">
              <div className="col-4 container-img">
                <img src={imagenOferta} alt="imagen-noticia" />

                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImagen(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <div className="bloque-text-area">
            <label> Descripción de la oferta:</label>
            <textarea
              value={descripcionOferta}
              className="form-control"
              id=""
              cols="20"
              rows="10"
              onChange={(e) => setValorOferta(e.target.value)}
            ></textarea>
            <div>
              <label>Stock:</label>
              <input
                className="form-control"
                onChange={(e) => setStock(e.target.value)}
                value={stockOferta}
                type="number"
              />
            </div>

            <button className="btn btn-button btn-success" type="submit">
              Guardar en inicio
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CrearNoticia;
