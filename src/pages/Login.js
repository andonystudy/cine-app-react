import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { validateUser } from "../services/UserService";

export default function Login() {
  const history = useHistory();

  let user = {};
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validate = (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") return;
    user = { username, password };

    validateUser({user}).then(resp => {
      if (resp.isValid) {
        localStorage.setItem('user', JSON.stringify(resp.user));
        history.push("/dashboard");
      } else {
        console.log(resp.msg);
      }
    });
  };

  return (
    <div className="c-login">
      <div className="card">
        <div className="card-header">
          <h4 className="m-0">Iniciar Sesión</h4>
        </div>
        <div className="card-body">
          <form onSubmit={validate}>
            <label>Usuario:</label>
            <input
              type="text"
              className="field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Escriba su Nombre"
            />
            <label>Contraseña:</label>
            <input
              type="password"
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Escriba su Apellido"
            />
            <button type="submit" className="btn btn-block bg-custom mt-2">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
