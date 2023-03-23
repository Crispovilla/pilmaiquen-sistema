import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./listar.css";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { MdPreview, MdOutlineHistoryEdu } from "react-icons/md";
import ModalVistaPrevia from "../modal/ModalVistaPrevia";

const ListarProductos = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const productCollection = collection(db, "productos");
  const getProducts = async () => {
    try {
      const data = await getDocs(productCollection);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error);
      console.log("Critical error!!!! This device was been hacked!");
    }
  };
  const searcher = (e) => {
    setSearch(e.target.value);
  };
  const results = !search
    ? products
    : products.filter((val) =>
        val.titulo.toLowerCase().includes(search.toLowerCase())
      );

  const deleteProduct = async (id) => {
    try {
      const productDoc = doc(db, "productos", id);
      deleteDoc(productDoc);
      await getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="row listar">
        <div className="col-12">
          <h3>Listar productos</h3>
          <hr />
          <div className="label">
            <input
              type="text"
              value={search}
              onChange={searcher}
              placeholder="Buscar..."
              activeClassName="active"
              className="form-control buscador py-2 px-2 w-50"
            />
          </div>

          <table className="table table-bordered table-dark table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Decripción</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {results.map((product) => (
                <tr key={product.id}>
                  <td>{product.titulo}</td>
                  <td>{product.descripcion}</td>
                  <td>{product.precio}</td>
                  <td>{product.cantidad}</td>
                  <td>
                    <div className="container-img">
                      <img src={product.imagen} alt="" />
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn  btn-primary me-2"
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <MdPreview />
                    </button>
                    <ModalVistaPrevia
                      identificador={product.id}
                      open={isOpen}
                      setOpen={setIsOpen}
                    >
                      <h1>{product.titulo}</h1>
                      <h4>Stock: {product.cantidad}</h4>
                      <img src={product.imagen} alt="" />
                      <h5>Descripción: {product.descripcion}</h5>
                      <h1>${product.precio}</h1>
                    </ModalVistaPrevia>
                    <Link
                      to={`/editar-producto/${product.id}`}
                      className="btn btn-warning me-2"
                    >
                      <i className="action-buttons">
                        <AiOutlineEdit />
                      </i>
                    </Link>
                    <Link
                      to={`/crear-noticia/${product.id}`}
                      className="btn btn-success me-2"
                    >
                      <i className="action-buttons">
                        <MdOutlineHistoryEdu />
                      </i>
                    </Link>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="btn btn-danger"
                    >
                      <i className="action-buttons">
                        <AiOutlineDelete />
                      </i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListarProductos;
