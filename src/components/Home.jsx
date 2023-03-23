import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext, useAuth } from "../context/authContext";
import { db } from "../firebase/firebase-config";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

import "./home.css";

const Home = () => {
  const [ofertas, setOfertas] = useState([]);
  const [search, setSearch] = useState("");
  const offertCollection = collection(db, "oferta");

  const getOffers = async () => {
    try {
      const data = await getDocs(offertCollection);
      setOfertas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error);
      console.log("Critical error!!!! This device was been hacked!");
    }
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };
  const results = !search
    ? ofertas
    : ofertas.filter((val) =>
        val.titulo.toLowerCase().includes(search.toLowerCase())
      );

  const deleteOffer = async (id) => {
    try {
      const offerDoc = doc(db, "oferta", id);
      deleteDoc(offerDoc);
      await getOffers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  const navigate = useNavigate();
  const { user, logout } = useContext(authContext);

  const onLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };
  return (
    <div className="home-container">
      <div className="user-logout">
        <h6>Hola {user?.email}</h6>
        <button onClick={onLogout} className="button-cuatro" type="submit">
          <span className="button-cuatro-content">Salir</span>
        </button>
      </div>

      <div className="row listar">
        <div className="col-12">
          <h3>Ofertas</h3>
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
                <th>Descripción</th>
                <th>Valor</th>
                <th>Stock</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {results.map((oferta) => (
                <tr key={oferta.id}>
                  <td>{oferta.titulo}</td>
                  <td>{oferta.descripcion}</td>
                  <td>{oferta.precio}</td>
                  <td>{oferta.stock}</td>
                  <td>
                    <div className="container-img">
                      <img src={oferta.imagen} alt="" />
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/editar-oferta/${oferta.id}`}
                      className="btn btn-warning me-2"
                    >
                      <i className="action-buttons">
                        <AiOutlineEdit />
                      </i>
                    </Link>

                    <button
                      onClick={() => deleteOffer(oferta.id)}
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
    </div>
  );
};

export default Home;
