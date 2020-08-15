import React, { useState, useEffect } from "react";
import {
  getActor,
  getActores,
  createActor,
  updateActor,
  changeStatus,
} from "../services/ActorService";

export default function Actor() {
  let actor = {};
  const [actores, setActores] = useState([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [sex, setSex] = useState("m");

  const listar = () =>
    getActores().then((actores) => {
      setActores(actores);
    });

  const cambiarEstado = (id) => {
    changeStatus({ id }).then((resp) => {
      listar();
    });
    console.log(id);
  };

  const obtenerActor = (id) =>
    getActor({ id }).then((actor) => {
      setId(actor.id);
      setName(actor.name);
      setLastname(actor.lastname);
      setSex(actor.sex);
    });

  const create = (actor) =>
    createActor({ actor }).then((resp) => {
      console.log(resp);
      listar();
      limpiar();
    });

  const update = (actor) =>
    updateActor({ actor }).then((resp) => {
      console.log(resp);
      listar();
      limpiar();
    });

  const limpiar = () => {
    setId("");
    setName("");
    setLastname("");
    setSex("m");
  };

  const save = (e) => {
    e.preventDefault();
    if (name.trim() === "" || lastname.trim() === "") return;
    actor = { id, name, lastname, sex };
    if (id === "") create(actor);
    else update(actor);
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <div>
      <h3>Actor</h3>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={save}>
            <label>Nombre:</label>
            <input
              type="text"
              className="field"
              placeholder="Escriba su Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Apellido:</label>
            <input
              type="text"
              className="field"
              placeholder="Escriba su Apellido"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <label>Género:</label>
            <select
              className="field"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              required
            >
              <option value="m">Masculino</option>
              <option value="f">Femenino</option>
            </select>
            <button type="submit" className="btn btn-block bg-custom mt-2">
              Guardar
            </button>
            <button
              type="button"
              onClick={limpiar}
              className="btn btn-block bg-custom-outline mt-2"
            >
              Cancelar
            </button>
          </form>
        </div>
        <div className="col-md-8">
            <table className="table table-hover table-striped">
              <thead className="thead-dark text-center">
                <tr>
                  <th>#</th>
                  <th>Nombre y Apellido</th>
                  <th>Género</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {actores.map((actor, idx) => (
                  <tr className="text-center" key={actor.id}>
                    <td>{idx + 1}</td>
                    <td>
                      {actor.name} {actor.lastname}
                    </td>
                    <td>{actor.sex === "m" ? "Masculino" : "Femenino"}</td>
                    <td>
                      {actor.status ? (
                        <span className="badge badge-success">ACTIVO</span>
                      ) : (
                        <span className="badge badge-danger">INACTIVO</span>
                      )}
                    </td>
                    <td>
                      {actor.status ? (
                        <button
                          onClick={() => obtenerActor(actor.id)}
                          className="btn bg-custom-outline btn-sm"
                        >
                          <i className="fas fa-pen"></i>
                        </button>
                      ) : (
                        ""
                      )}
                      <button
                        onClick={() => cambiarEstado(actor.id)}
                        className="btn bg-custom-outline btn-sm ml-2"
                      >
                        {actor.status ? (
                          <i
                            className="fas fa-eye-slash"
                            title="DESACTIVAR"
                          ></i>
                        ) : (
                          <i className="fas fa-eye" title="ACTIVAR"></i>
                        )}
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
}
