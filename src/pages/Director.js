import React, { useState, useEffect } from "react";
import {
  getDirectores,
  getDirector,
  createDirector,
  updateDirector,
  changeStatus,
} from "../services/DirectorService";

export default function Director() {
  let director = {};
  const [directores, setDirectores] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const listar = () => {
    getDirectores().then((directores) => {
      setDirectores(directores);
    });
  };

  const cambiarEstado = (id) => {
    changeStatus({ id }).then((resp) => {
      listar();
    });
    console.log(id);
  };

  const obtenerDirector = (id) => {
    getDirector({ id }).then((director) => {
      setId(director.id);
      setName(director.name);
      setLastname(director.lastname);
    });
  };

  const create = (director) =>
    createDirector({ director }).then((resp) => {
      console.log(resp);
      listar();
      limpiar();
    });

  const update = (director) =>
    updateDirector({ director }).then((resp) => {
      console.log(resp);
      listar();
      limpiar();
    });

  const limpiar = () => {
    setId("");
    setName("");
    setLastname("");
  };

  const save = (e) => {
    e.preventDefault();
    if (name.trim() === "" || lastname.trim() === "") return;
    director = { id, name, lastname };
    if (id === "") create(director);
    else update(director);
  };

  useEffect(() => {
    listar();
  }, []);

  return (
    <div>
      <h3>Director</h3>
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
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {directores.map((director, idx) => (
                <tr key={director.id} className="text-center">
                  <td>{idx + 1}</td>
                  <td>
                    {director.name} {director.lastname}
                  </td>
                  <td>
                    {director.status ? (
                      <span className="badge badge-success">ACTIVO</span>
                    ) : (
                      <span className="badge badge-danger">INACTIVO</span>
                    )}
                  </td>
                  <td>
                    {director.status ? (
                      <button
                        onClick={() => obtenerDirector(director.id)}
                        className="btn bg-custom-outline btn-sm"
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      onClick={() => cambiarEstado(director.id)}
                      className="btn bg-custom-outline btn-sm ml-2"
                    >
                      {director.status ? (
                        <i className="fas fa-eye-slash" title="DESACTIVAR"></i>
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
