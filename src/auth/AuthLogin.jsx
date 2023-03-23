import React, { useContext, useState } from "react";
import Logo from "../assets/logo-borde.png";
import "./loginStyles.css";
import { authContext, useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const AuthLogin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(authContext);

  //login normal
  const onLogin = async (e, name = "") => {
    e.preventDefault();
    //console.log({ email, password });
    setError("");
    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="container">
        {/*   {error && <p>{error}</p>} */}
        <div className="row">
          <div className="col">
            <img src={Logo} alt="" />
          </div>
        </div>
        <div className="col form-control login-form">
          <form onSubmit={onLogin}>
            <h2>Login</h2>
            <hr />
            {error && <p>{error}</p>}

            <div className="mb-3">
              <input
                name="name"
                type="name"
                className="form-control"
                placeholder="Nombre usuario"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Contraseña"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                /* onClick={onLogin} */ className="button-cuatro"
                type="submit"
              >
                <span className="button-cuatro-content">Ingresar</span>
              </button>
            </div>
            {/*             <span className="span-login">O</span>
            <div className="mb-3 google-sign">
              <GoogleButton
                className="btn-google"
                onClick={handleLoginGoogle}
              />
            </div> */}
          </form>
        </div>

        <footer className="footer-login">
          <div className="container-footer">
            <h6>Powered by Kryspo, copyright 2022</h6>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AuthLogin;
