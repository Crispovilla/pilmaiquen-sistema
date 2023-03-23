import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./moderadores.css";
const IngresarModerador = () => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();

  const onSaveUser = (e) => {
    e.preventDefault();
    console.log("first");

    console.log(user, email, password, confirm);
  };
  return (
    <div className="container-moderadores">
      <h3>Ingresar moderador</h3>

      <div className="container-form-moderadores">
        <form onSubmit={onSaveUser}>
          <label>Nombre de usuario</label>
          <input
            onChange={(e) => setUser(e.target.value)}
            className="form-control"
            type="text"
            name="name"
          />
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            type="email"
            name="email"
          />
          <label>Contraseña</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            type="password"
            name="password"
          />
          <label>Repita contraseña</label>
          <input
            onChange={(e) => setConfirm(e.target.value)}
            className="form-control"
            type="password"
            name="repassword"
          />

          <button className="btn btn-button btn-primary" type="submit">
            Agregar
          </button>
          <button className="btn btn-button btn-warning" type="submit">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default IngresarModerador;
